import { z } from 'zod';

// ============================================================================
// 1. Zod Validation Schemas
// ============================================================================

export const allowedRoles = [
  'Website Development',
  'NFT Development',
  'UX/UI Design',
  'Backend Engineering',
  'Cybersecurity',
  'Blockchain Infrastructure',
  'DevOps & Cloud',
  'AI & Data Science',
  'Education & Curriculum Design',
  'Online Blockchain Bootcamps',
  'Teacher Training & Mentorship',
  'STEAM Lab Deployment',
  'Brand Strategy',
  'Content Creation',
  'Social Media Management',
  'Event Curation',
  'Partnerships & PR'
] as const;

export type AllowedRole = typeof allowedRoles[number];

export const waitlistSchema = z.object({
  fullName: z.string()
    .min(2, 'Full Name must be at least 2 characters long')
    .max(255, 'Full Name must be under 255 characters'),
  email: z.email('Invalid email address')
    .max(255, 'Email must be under 255 characters'),
  country: z.string().min(1, 'Country is required'),
  region: z.string().min(1, 'Region/State is required'),
  phone: z.string().min(5, 'Phone number is too short'),
  postalCode: z.string().optional().or(z.literal('')),
  motivation: z.string()
    .min(1, 'Motivation statement is required')
    .max(200, 'Motivation must be under 200 characters'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time slot is required'),
  selectedRoles: z.array(z.enum(allowedRoles)).min(1, 'Please select at least one role'),
});

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(255, 'Name must be under 255 characters'),
  email: z.email('Invalid email address')
    .max(255, 'Email must be under 255 characters'),
  message: z.string()
    .min(5, 'Message must be at least 5 characters long')
    .max(5000, 'Message is too long (max 5000 characters)'),
});

export const newsletterSchema = z.object({
  email: z.email('Invalid email address')
    .max(255, 'Email must be under 255 characters'),
});

export const partnershipSchema = z.object({
  fullName: z.string()
    .min(2, 'Full Name must be at least 2 characters long')
    .max(255, 'Full Name must be under 255 characters'),
  organization: z.string()
    .min(2, 'Organization Name must be at least 2 characters long')
    .max(255, 'Organization Name must be under 255 characters'),
  email: z.email('Invalid email address')
    .max(255, 'Email must be under 255 characters'),
  phone: z.string().min(5, 'Phone number is too short'),
  country: z.string().min(1, 'Country is required'),
  partnershipType: z.string().min(1, 'Partnership type is required'),
  proposal: z.string()
    .min(5, 'Proposal must be at least 5 characters long')
    .max(10000, 'Proposal description is too long (max 10000 characters)'),
  documents: z.array(
    z.object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
    })
  ).optional().default([]),
});

export const scoutRegisterSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(255, 'Name must be under 255 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is too short'),
  countryCode: z.string().min(1, 'Country code is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Region is required'),
  address: z.string().min(5, 'Address is too short'),
});

export const scoutRecommendSchema = z.object({
  schoolName: z.string()
    .min(3, 'School official name must be at least 3 characters')
    .max(255, 'School official name must be under 255 characters'),
  schoolType: z.string().min(1, 'School type selection is required'),
  contactRole: z.string().min(1, 'Contact relationship role is required'),
  schoolAddress: z.string().min(8, 'School physical address must be at least 8 characters'),
  estimatedStudents: z.string().min(1, 'Estimated student population range is required'),
  schoolKnowledge: z.string().min(1, 'Selection is required'),
  contactPersonName: z.string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(255, 'Contact person name must be under 255 characters'),
  contactPhone: z.string().min(5, 'Contact phone number is too short'),
  contactEmail: z.email('Invalid contact email address')
    .max(255, 'Contact email must be under 255 characters'),
  status: z.string().default('Pending'),
  notes: z.string().max(5000).optional().or(z.literal('')),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type NewsletterInput = z.input<typeof newsletterSchema>;
export type PartnershipInput = z.input<typeof partnershipSchema>;
export type ScoutRegisterInput = z.input<typeof scoutRegisterSchema>;
export type ScoutRecommendInput = z.input<typeof scoutRecommendSchema>;

// ============================================================================
// 2. Centralized Fetch Client
// ============================================================================
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
// Map to track active in-flight requests and prevent duplicate concurrent network calls
const inFlightRequests = new Map<string, Promise<any>>();

async function request<TResponse>(path: string, options: RequestInit): Promise<TResponse> {
  const method = (options.method || 'GET').toUpperCase();
  const bodyKey = typeof options.body === 'string' ? options.body : '';
  const requestKey = `${method}:${path}:${bodyKey}`;

  // If the exact same request is currently pending, return the existing in-flight promise
  if (inFlightRequests.has(requestKey)) {
    console.warn(`[API Deduplication] Reusing active in-flight request for: ${requestKey}`);
    return inFlightRequests.get(requestKey) as Promise<TResponse>;
  }

  const promise = (async () => {
    try {
      const url = `${API_BASE_URL}${path}`;
      
      // Use native Headers constructor to merge headers case-insensitively and safely
      const headers = new Headers(options.headers);
      if (!(options.body instanceof FormData)) {
        if (!headers.has('content-type')) {
          headers.set('content-type', 'application/json');
        }
      }
      if (!headers.has('accept')) {
        headers.set('accept', 'application/json');
      }

      // Inject Authorization JWT token automatically if stored in localStorage
      const scoutToken = localStorage.getItem('scout_token');
      console.log(`[API Request] Path: ${path} | Has scoutToken:`, !!scoutToken);
      if (scoutToken) {
        headers.set('Authorization', `Bearer ${scoutToken}`);
        headers.set('session_token', scoutToken);
        headers.set('x-session-token', scoutToken);
      }

      // Convert Headers instance to a plain object to ensure clean serialization in all fetch environments
      const plainHeaders: Record<string, string> = {};
      headers.forEach((value, key) => {
        plainHeaders[key] = value;
      });

      const response = await fetch(url, {
        ...options,
        headers: plainHeaders,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Request failed. Please try again later.');
      }

      return result;
    } finally {
      // Remove from map as soon as the request resolves or rejects
      inFlightRequests.delete(requestKey);
    }
  })();

  inFlightRequests.set(requestKey, promise);
  return promise;
}

// ============================================================================
// 3. API Services
// ============================================================================

export const api = {
  submitWaitlist: async (data: WaitlistInput) => {
    // Client-side schema validation before dispatching
    const payload = waitlistSchema.parse(data);
    return request<{ success: boolean; message: string; data?: any }>('/waitlist', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  submitContact: async (data: ContactInput) => {
    // Client-side schema validation before dispatching
    const payload = contactSchema.parse(data);
    return request<{ success: boolean; message: string; data?: any }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  subscribeNewsletter: async (data: NewsletterInput) => {
    // Client-side schema validation before dispatching
    const payload = newsletterSchema.parse(data);
    return request<{ success: boolean; message: string; data?: any }>('/newsletter', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  submitPartnership: async (data: PartnershipInput) => {
    // Client-side schema validation before dispatching
    const payload = partnershipSchema.parse(data);
    return request<{ success: boolean; message: string; data?: any }>('/partnership', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  uploadPartnershipDocs: async (formData: FormData) => {
    return request<{ success: boolean; message: string; data?: any }>('/partnership-uploads', {
      method: 'POST',
      body: formData,
    });
  },

  savePartnershipDocs: async (partnershippid: string, documents: any[]) => {
    return request<{ success: boolean; message: string; data?: any }>('/partnership-document-save', {
      method: 'POST',
      body: JSON.stringify({ partnershippid, documents }),
    });
  },

  // Scout Authentications
  sendScoutOtp: async (email: string) => {
    return request<{ success: boolean; message: string; data?: { id?: string; email: string } }>('/scout-send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  verifyScoutOtp: async (email: string, otp: string) => {
    return request<{ success: boolean; message: string; data?: any; session_token?: string }>('/scout-verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  getScoutProfile: async () => {
    return request<{ success: boolean; message: string; data?: any }>('/scout-profile', {
      method: 'GET',
    });
  },

  registerScout: async (data: ScoutRegisterInput) => {
    const payload = scoutRegisterSchema.parse(data);
    return request<{ success: boolean; message: string; data?: any }>('/scout-register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Scout Recommendations
  getScoutRecommendations: async (params?: { search?: string; status?: string; page?: number; limit?: number; skip?: number }) => {
    return request<{ success: boolean; message: string; data?: any[] }>('/scout-recommendations', {
      method: 'POST',
      body: JSON.stringify(params || {}),
    });
  },

  submitScoutRecommendation: async (data: ScoutRecommendInput) => {
    const payload = scoutRecommendSchema.parse(data);
    return request<{ success: boolean; message: string; data?: any }>('/scout-recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
