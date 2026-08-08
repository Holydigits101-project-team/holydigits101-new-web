import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Building, 
  PlusCircle, 
  LogOut,
  Mail,
  ShieldCheck,
  User,
  ClipboardList,
  Clock,
  Award,
  Lock,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  XCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { countryRegions, countries } from '@/data/countryRegions';
import { api } from '../utils/api';
import { useToast } from '../components/Toast';

type PortalState = 'EMAIL_ENTRY' | 'OTP_VERIFY' | 'PROFILE_REGISTER' | 'DASHBOARD';

// Global flag to survive React StrictMode unmount/remount dev cycles
let globalVerificationInitiated = false;

export default function Scout() {
  const { toast } = useToast();
  
  // Navigation & Page State
  const [portalState, setPortalState] = useState<PortalState>('EMAIL_ENTRY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);

  // Authentications states
  const [email, setEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');

  // Profile data of verified scout
  const [scoutProfile, setScoutProfile] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [metricsData, setMetricsData] = useState({
    total_recommended: 0,
    approved: 0,
    total_pending: 0,
    rejected: 0,
  });

  // Search, Filter & Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  // Debounce: wait 400ms after user stops typing before firing the fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  // Metrics come from server-side statusCounts facet — accurate across all pages
  const dashboardMetrics = metricsData;

  // totalPages is driven by the server-returned total count
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // All filtering is server-side — recommendations is already filtered
  const paginatedRecommendations = recommendations;

  // Profile Form state (New Scouts)
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    countryCode: '+234',
    country: 'Nigeria',
    state: '',
    address: '',
    consent: false
  });
  const [profileErrors, setProfileErrors] = useState<any>({});

  // School Recommendation Form state (Dashboard Modal)
  const [recommendForm, setRecommendForm] = useState({
    schoolName: '',
    schoolType: '',
    contactRole: '',
    schoolAddress: '',
    estimatedStudents: '',
    schoolKnowledge: '',
    contactPersonName: '',
    contactPhone: '',
    contactEmail: '',
    notes: ''
  });
  const [recommendErrors, setRecommendErrors] = useState<any>({});

  // Floating particles
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; duration: string; delay: string; opacity: number }[]>([]);

  // Check for URL query params (magic link) or stored token auto-login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlEmail = params.get('email');
    const urlToken = params.get('token');

    if (urlEmail && urlToken) {
      if (globalVerificationInitiated) return;
      globalVerificationInitiated = true;
      handleVerifyMagicLink(urlEmail, urlToken);
    } else {
      const token = localStorage.getItem('scout_token');
      if (token) {
        loadProfileAndDashboard();
      }
    }
  }, []);

  // Generate background particles
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 3}px`,
      duration: `${8 + Math.random() * 15}s`,
      delay: `${-Math.random() * 20}s`,
      opacity: 0.3 + Math.random() * 0.7
    }));
    setParticles(newParticles);
  }, []);

  // Sync profile form countryCode automatically when country changes
  useEffect(() => {
    const matchedCountry = countries.find(c => c.name === profileForm.country);
    if (matchedCountry) {
      setProfileForm(prev => ({
        ...prev,
        countryCode: matchedCountry.code,
        state: '' // Reset region/state when country changes
      }));
    }
  }, [profileForm.country]);

  // Helper for recommendations fetching
  const fetchRecommendations = async () => {
    try {
      const skip = (currentPage - 1) * pageSize;
      const recommendationsRes = await api.getScoutRecommendations({
        search: debouncedSearchTerm.trim() || undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        page: currentPage,
        limit: pageSize,
        skip,
      });

      if (recommendationsRes.success && recommendationsRes.data) {
        const rawData = recommendationsRes.data;
        // $facet returns: [{ data, filteredCount, globalMetrics }]
        const facet = Array.isArray(rawData) && rawData.length > 0 ? rawData[0] : rawData;

        // Paginated records for the current page
        const list: any[] = Array.isArray(facet?.data) ? facet.data : [];

        // Total count after search+status filter (drives pagination)
        const filteredTotal: number = facet?.filteredCount?.[0]?.count ?? list.length;

        // Global metrics — run before any search/status filter, always reflects all scout records
        const globalMetricsArr: { _id: string; count: number }[] =
          Array.isArray(facet?.globalMetrics) ? facet.globalMetrics : [];

        const globalTotal = globalMetricsArr.reduce((sum, s) => sum + s.count, 0);

        const getGlobal = (...labels: string[]) =>
          globalMetricsArr
            .filter((s) => labels.map((l) => l.toLowerCase()).includes(s._id?.toLowerCase()))
            .reduce((sum, s) => sum + s.count, 0);

        setMetricsData({
          total_recommended: globalTotal,
          approved: getGlobal('approved'),
          total_pending: getGlobal('pending'),
          rejected: getGlobal('rejected'),
        });

        setRecommendations(list);
        setTotalCount(filteredTotal);

      }
    } catch (recErr) {
      console.warn('Failed to load recommendations from server:', recErr);
    }
  };

  // Reset to page 1 when status filter changes
  useEffect(() => {
    if (portalState === 'DASHBOARD') {
      setCurrentPage(1);
    }
  }, [statusFilter]);

  // Refetch when portalState, page, search or status changes
  useEffect(() => {
    if (portalState === 'DASHBOARD') {
      fetchRecommendations();
    }
  }, [portalState, currentPage, debouncedSearchTerm, statusFilter]);

  // API Call Helpers
  const loadProfileAndDashboard = async () => {
    try {
      setIsSubmitting(true);
      const profileRes = await api.getScoutProfile();
      if (profileRes.success && Array.isArray(profileRes.data) && profileRes.data.length > 0) {
        const profile = profileRes.data[0];
        setScoutProfile(profile);
        setPortalState('DASHBOARD');
        await fetchRecommendations();
      } else {
        // Token is valid but no scout profile registered in scouts collection
        setProfileForm(prev => ({ ...prev, email: email.trim() }));
        setPortalState('PROFILE_REGISTER');
      }
    } catch (err: any) {
      console.error('Session validation failed:', err);
      handleSignOut();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyMagicLink = async (urlEmail: string, urlToken: string) => {
    try {
      setIsSubmitting(true);
      // Clean up query parameters from browser URL address bar immediately
      window.history.replaceState({}, document.title, window.location.pathname);

      const res = await api.verifyScoutOtp(urlEmail, urlToken);
      if (res.success && res.data && res.data.session_token) {
        localStorage.setItem('scout_token', res.data.session_token);
        setEmail(urlEmail.trim());
        await loadProfileAndDashboard();
        toast.success('Email verified successfully!');
      }
    } catch (err: any) {
      toast.error('Magic link is invalid or has expired. Please request a new one.');
      setPortalState('EMAIL_ENTRY');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    try {
      setIsSubmitting(true);

      const res = await api.sendScoutOtp(email.trim());
      if (res.success) {
        toast.success('Verification code sent to your email!');
        setPortalState('OTP_VERIFY');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to request code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpToken.trim()) {
      toast.error('Please enter the verification code.');
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await api.verifyScoutOtp(email.trim(), otpToken.trim());
      if (res.success && res.data && res.data.session_token) {
        localStorage.setItem('scout_token', res.data.session_token);
        await loadProfileAndDashboard();
        toast.success('Email verified successfully!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid or expired verification code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrors({});
    if (!profileForm.consent) {
      toast.error('Please accept data processing consent to proceed.');
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await api.registerScout({
        ...profileForm,
        email: email.trim()
      });
      if (res.success && res.data) {
        setScoutProfile(res.data);
        setRecommendations([]);
        toast.success('Welcome! Your scout profile is registered.');
        setPortalState('DASHBOARD');
      }
    } catch (err: any) {
      if (err.name === 'ZodError') {
        const errorsMap: any = {};
        err.issues.forEach((issue: any) => {
          if (issue.path[0]) {
            errorsMap[issue.path[0]] = true;
          }
        });
        setProfileErrors(errorsMap);
        toast.error('Profile form contains validation errors. Please check fields.');
      } else {
        toast.error(err.message || 'Failed to submit profile.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecommendSchoolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendErrors({});
    try {
      setIsSubmitting(true);
      const res = await api.submitScoutRecommendation(recommendForm);
      if (res.success) {
        toast.success('Recommendation submitted successfully.');
        const recsRes = await api.getScoutRecommendations();
        if (recsRes.success && recsRes.data) {
          const rawData = recsRes.data;
          const list = Array.isArray(rawData)
            ? (rawData[0]?.recommendations || [])
            : ((rawData as any)?.recommendations || []);
          setRecommendations(list);
        }
        // Reset school recommendation form states
        setRecommendForm({
          schoolName: '',
          schoolType: '',
          contactRole: '',
          schoolAddress: '',
          estimatedStudents: '',
          schoolKnowledge: '',
          contactPersonName: '',
          contactPhone: '',
          contactEmail: '',
          notes: ''
        });
        setShowRecommendModal(false);
      }
    } catch (err: any) {
      if (err.name === 'ZodError') {
        const errorsMap: any = {};
        err.issues.forEach((issue: any) => {
          if (issue.path[0]) {
            errorsMap[issue.path[0]] = true;
          }
        });
        setRecommendErrors(errorsMap);
        toast.error('Form contains validation errors. Please resolve.');
      } else {
        toast.error(err.message || 'Failed to submit recommendation.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('scout_token');
    setScoutProfile(null);
    setRecommendations([]);
    setEmail('');
    setOtpToken('');
    setPortalState('EMAIL_ENTRY');
    toast.success('Signed out successfully.');
  };

  return (
    <div className="bg-[#0a0f0d] text-white min-h-screen overflow-x-hidden font-sans relative">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10" />
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/27769510/pexels-photo-27769510.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(21,128,61,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(21,128,61,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Animated gradients */}
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-radial from-green-800/30 to-transparent blur-[85px] animate-pulse duration-[14s]" />
        <div className="absolute top-[30%] right-[-100px] w-[400px] h-[400px] rounded-full bg-radial from-yellow-500/15 to-transparent blur-[85px] animate-pulse duration-[9s]" />
        
        {/* Dynamic floating sparkles */}
        <div className="absolute inset-0">
          {particles.map(p => (
            <span
              key={p.id}
              className="absolute bg-yellow-500/50 rounded-full"
              style={{
                left: p.left,
                bottom: '0px',
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                transform: `translateY(-${Math.random() * 100}vh)`
              }}
            />
          ))}
        </div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-28 min-h-screen flex flex-col justify-start">
        
        <AnimatePresence mode="wait">
          {/* STATE 1: EMAIL ENTRY CARD */}
          {portalState === 'EMAIL_ENTRY' && (
            <motion.div
              key="email_entry"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md w-full mx-auto bg-[#0a0f0d]/75 backdrop-blur-2xl border border-green-800/20 rounded-3xl p-8 shadow-2xl mt-12"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl mb-4 border border-green-500/30 shadow-[0_0_15px_rgba(22,163,74,0.2)]">
                  <ShieldCheck className="text-yellow-400" size={32} />
                </div>
                <h1 className="text-2xl font-bold font-sora tracking-tight text-white mb-2">
                  Volunteer Scout Portal
                </h1>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Join our mission to identify and empower schools across Africa with next-gen Web3 and digital computing labs.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">Scout Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 focus:bg-green-950/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Get Magic Verification Code</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-white/20 text-[9px] mt-4 uppercase tracking-wider flex items-center justify-center gap-1">
                <Lock size={9} /> Secure Encryption Assured
              </p>
            </motion.div>
          )}

          {/* STATE 2: VERIFICATION OTP CARD */}
          {portalState === 'OTP_VERIFY' && (
            <motion.div
              key="otp_verify"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md w-full mx-auto bg-[#0a0f0d]/75 backdrop-blur-2xl border border-green-800/20 rounded-3xl p-8 shadow-2xl mt-12"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-2xl mb-4 border border-yellow-500/25">
                  <Mail className="text-yellow-400" size={28} />
                </div>
                <h1 className="text-2xl font-bold font-sora tracking-tight text-white mb-2">
                  Verify Your Identity
                </h1>
                <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                  We've sent a magic verification code to your email <span className="text-white font-medium">{email}</span>.
                </p>
              </div>


              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">Magic Verification Token</label>
                  <input 
                    type="text"
                    required
                    placeholder="Paste code here"
                    value={otpToken}
                    onChange={e => setOtpToken(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-center text-sm font-mono text-emerald-55 outline-none focus:border-green-600 focus:bg-green-950/10 transition-all duration-200"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPortalState('EMAIL_ENTRY')}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl py-3.5 text-sm transition"
                  >
                    Change Email
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 cursor-pointer bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-1 transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Verify Code</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STATE 3: PROFILE REGISTRATION (NEW SCOUTS) */}
          {portalState === 'PROFILE_REGISTER' && (
            <motion.div
              key="profile_register"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-xl w-full mx-auto bg-[#0a0f0d]/75 backdrop-blur-2xl border border-green-800/20 rounded-3xl p-6 md:p-8 shadow-2xl mt-6"
            >
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/5">
                <User className="text-yellow-500" size={22} />
                <div>
                  <h2 className="text-xl font-bold font-sora text-white">Create Scout Profile</h2>
                  <p className="text-gray-400 text-xs">Verify details to join the volunteer program</p>
                </div>
              </div>

              <form onSubmit={handleRegisterProfile} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Amara Okafor"
                    value={profileForm.name}
                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                    disabled={isSubmitting}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 focus:bg-green-950/10 transition-all ${profileErrors.name ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {profileErrors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Valid full name required (first and last)</p>
                  )}
                </div>

                {/* Email Address (Pre-filled and Locked) */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2">Email Address (Verified)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input 
                      type="email" 
                      readOnly
                      value={email}
                      className="w-full bg-white/5 opacity-50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white/60 outline-none select-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Country and State Row Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Country *</label>
                    <select
                      value={profileForm.country}
                      onChange={e => setProfileForm({...profileForm, country: e.target.value})}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 transition-all"
                    >
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Region / State *</label>
                    <select
                      value={profileForm.state}
                      onChange={e => setProfileForm({...profileForm, state: e.target.value})}
                      disabled={isSubmitting || !profileForm.country}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 disabled:opacity-40 transition-all ${profileErrors.state ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="">Select state...</option>
                      {profileForm.country && countryRegions[profileForm.country] && countryRegions[profileForm.country].map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Phone Number *</label>
                  <div className="flex gap-2">
                    <span className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white/60 flex items-center justify-center font-semibold">
                      {profileForm.countryCode}
                    </span>
                    <input 
                      type="tel" 
                      placeholder="8012345678"
                      value={profileForm.phone}
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                      disabled={isSubmitting}
                      className={`flex-1 bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 focus:bg-green-950/10 transition-all ${profileErrors.phone ? 'border-red-500' : 'border-white/10'}`}
                    />
                  </div>
                  {profileErrors.phone && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Valid phone number required</p>
                  )}
                </div>

                {/* Residential Address */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Address *</label>
                  <input 
                    type="text" 
                    placeholder="Street name, City, State"
                    value={profileForm.address}
                    onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                    disabled={isSubmitting}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 focus:bg-green-950/10 transition-all ${profileErrors.address ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {profileErrors.address && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Complete residential address required</p>
                  )}
                </div>

                {/* Consent checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 select-none cursor-pointer group">
                    <input 
                      type="checkbox"
                      id="scout-consent"
                      checked={profileForm.consent}
                      onChange={e => setProfileForm(prev => ({ ...prev, consent: e.target.checked }))}
                      disabled={isSubmitting}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 shrink-0 rounded-md border border-white/20 bg-white/5 flex items-center justify-center mt-0.5 transition-all peer-checked:bg-gradient-to-br peer-checked:from-green-600 peer-checked:to-green-500 peer-checked:border-green-500 peer-checked:text-white peer-disabled:opacity-50 group-hover:border-white/40 shadow-sm">
                      {profileForm.consent && <Check size={12} strokeWidth={4} />}
                    </div>
                    <span className="text-[11px] text-gray-400 leading-relaxed">
                      I consent to HolyDigits101 collecting and processing my data in accordance with the 
                      <a 
                        href="/privacy-policy" 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()} 
                        className="text-green-500 hover:underline mx-1"
                      >
                        Privacy Policy
                      </a>. 
                      My profile details will only be used to organize and credit my volunteer scout activities.
                    </span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl px-6 py-3.5 text-sm transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 cursor-pointer bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-1 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Complete Registration</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STATE 4: THE SCOUT DASHBOARD PORTAL */}
          {portalState === 'DASHBOARD' && scoutProfile && (
            <motion.div
              key="scout_dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 w-full mt-6"
            >
              {/* Dashboard Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0f0d]/75 backdrop-blur-2xl border border-green-800/20 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl flex items-center justify-center border border-green-500/20">
                    <User className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-sora text-white flex items-center gap-2">
                      {scoutProfile.name}
                      <span className="text-[10px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full font-bold uppercase tracking-wider font-mono">
                        Active Scout
                      </span>
                    </h2>
                    <p className="text-gray-400 text-xs flex items-center gap-2">
                      <span>{scoutProfile.email}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[10px] font-mono tracking-widest text-white/50">ID: HD-SCOUT-{scoutProfile.id?.slice(-6).toUpperCase()}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowRecommendModal(true)}
                    className="cursor-pointer bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl px-5 py-3 text-xs md:text-sm flex items-center gap-2 transition transform hover:-translate-y-0.5"
                  >
                    <Plus size={16} />
                    <span>Recommend School</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-3 bg-white/5 hover:bg-red-950/20 border border-white/10 hover:border-red-900/40 rounded-xl text-gray-400 hover:text-red-400 transition"
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>

              {/* Statistics Row Card Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Recommended */}
                <div className="bg-[#0a0f0d]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex items-center gap-4 relative overflow-hidden group">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-center text-emerald-400">
                    <ClipboardList size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Recommended</p>
                    <h3 className="text-2xl font-bold font-sora text-white">{dashboardMetrics.total_recommended}</h3>
                  </div>
                  <div className="absolute right-[-10px] bottom-[-10px] text-white/5 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                    <ClipboardList size={80} />
                  </div>
                </div>

                {/* Approved Schools */}
                <div className="bg-[#0a0f0d]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex items-center gap-4 relative overflow-hidden group">
                  <div className="w-12 h-12 bg-green-500/10 border border-green-500/25 rounded-2xl flex items-center justify-center text-green-400">
                    <Award size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Approved</p>
                    <h3 className="text-2xl font-bold font-sora text-white">
                      {dashboardMetrics.approved}
                    </h3>
                  </div>
                  <div className="absolute right-[-10px] bottom-[-10px] text-white/5 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                    <Award size={80} />
                  </div>
                </div>

                {/* Total Pending */}
                <div className="bg-[#0a0f0d]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex items-center gap-4 relative overflow-hidden group">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex items-center justify-center text-amber-400">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Total Pending</p>
                    <h3 className="text-2xl font-bold font-sora text-white">
                      {dashboardMetrics.total_pending}
                    </h3>
                  </div>
                  <div className="absolute right-[-10px] bottom-[-10px] text-white/5 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                    <Clock size={80} />
                  </div>
                </div>

                {/* Rejected */}
                <div className="bg-[#0a0f0d]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex items-center gap-4 relative overflow-hidden group">
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-center justify-center text-red-400">
                    <XCircle size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Rejected</p>
                    <h3 className="text-2xl font-bold font-sora text-white">
                      {dashboardMetrics.rejected}
                    </h3>
                  </div>
                  <div className="absolute right-[-10px] bottom-[-10px] text-white/5 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                    <XCircle size={80} />
                  </div>
                </div>
              </div>

              {/* Recommendations Table Layout */}
              <div className="bg-[#0a0f0d]/75 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-2xl space-y-6">
                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Building className="text-yellow-500" size={18} />
                    <h3 className="font-bold text-white text-base font-sora">Your Recommendations History</h3>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex items-center gap-3">
                    {/* Live Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                      <input 
                        type="text"
                        placeholder="Search school or contact..."
                        value={searchTerm}
                        onChange={e => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 transition w-48 sm:w-60"
                      />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={e => {
                          setStatusFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-[#0a0f0d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white/70 focus:outline-none focus:border-green-500/50 transition cursor-pointer appearance-none pr-8"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                      <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={12} />
                    </div>
                  </div>
                </div>

                {recommendations.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
                    <ClipboardList className="mx-auto text-white/10 mb-4" size={48} />
                    <h4 className="text-white/60 font-semibold mb-1">No recommendations submitted yet</h4>
                    <p className="text-white/30 text-xs max-w-xs mx-auto mb-6">
                      You haven't recommended any school for digital infrastructure lab deployment yet. Let's get started!
                    </p>
                    <button 
                      onClick={() => setShowRecommendModal(true)}
                      className="cursor-pointer bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl px-5 py-3 text-xs flex items-center gap-2 mx-auto transition"
                    >
                      <Plus size={14} />
                      <span>Submit Your First Recommendation</span>
                    </button>
                  </div>
                ) : paginatedRecommendations.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                    <Search className="mx-auto text-white/20 mb-3" size={32} />
                    <p className="text-white/50 text-xs">No matching recommendations found for "{searchTerm}"</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); setCurrentPage(1); }}
                      className="mt-3 text-xs text-green-400 hover:underline font-semibold"
                    >
                      Clear search & filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-white/40">
                            <th className="py-3 pr-4">School Official Name</th>
                            <th className="py-3 px-4">Level</th>
                            <th className="py-3 px-4">Contact Person</th>
                            <th className="py-3 px-4">Submitted Date</th>
                            <th className="py-3 pl-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedRecommendations.map((rec) => (
                            <tr key={rec.id || rec._id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition">
                              <td className="py-4 pr-4 font-semibold text-emerald-50">
                                <div>{rec.schoolName}</div>
                                <div className="text-[10px] text-white/30 font-normal mt-0.5">{rec.schoolAddress}</div>
                              </td>
                              <td className="py-4 px-4 text-white/60">{rec.schoolType}</td>
                              <td className="py-4 px-4">
                                <div>{rec.contactPersonName}</div>
                                <div className="text-[10px] text-white/40 font-mono mt-0.5">{rec.contactEmail}</div>
                              </td>
                              <td className="py-4 px-4 text-white/50 text-xs">
                                {rec.created_at ? new Date(rec.created_at).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }) : 'N/A'}
                              </td>
                              <td className="py-4 pl-4 text-right">
                                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  rec.status === 'Approved' || rec.status === 'APPROVED'
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                    : rec.status === 'Rejected' || rec.status === 'REJECTED'
                                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                  {rec.status || 'Pending'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5 text-xs text-white/40">
                      <div>
                        Showing <span className="text-white/80 font-medium">{totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> to{' '}
                        <span className="text-white/80 font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
                        <span className="text-white/80 font-medium">{totalCount}</span> recommendations
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs flex items-center gap-1 transition cursor-pointer"
                        >
                          <ChevronLeft size={14} />
                          <span>Previous</span>
                        </button>
                        <span className="px-2 text-white/60 text-xs">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs flex items-center gap-1 transition cursor-pointer"
                        >
                          <span>Next</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* RECOMMEND A SCHOOL MODAL FORM OVERLAY */}
      <AnimatePresence>
        {showRecommendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0f0d] border border-green-800/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <PlusCircle className="text-yellow-500" size={22} />
                  <div>
                    <h3 className="font-bold text-lg font-sora text-white">Recommend School</h3>
                    <p className="text-white/40 text-xs">Provide details for the digital computing lab eligibility review</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRecommendModal(false)}
                  className="text-gray-400 hover:text-white transition text-xs font-semibold px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg"
                >
                  Close
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleRecommendSchoolSubmit} className="p-6 space-y-6 flex-1">
                <div className="space-y-4">
                  {/* School Official Name */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">School Official Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Greenfield Model College"
                      value={recommendForm.schoolName}
                      onChange={e => setRecommendForm({...recommendForm, schoolName: e.target.value})}
                      disabled={isSubmitting}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 transition-all ${recommendErrors.schoolName ? 'border-red-500' : 'border-white/10'}`}
                    />
                    {recommendErrors.schoolName && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Valid school name required (at least 3 characters)</p>
                    )}
                  </div>

                  {/* School Type & Relationship Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">School Type *</label>
                      <select
                        required
                        value={recommendForm.schoolType}
                        onChange={e => setRecommendForm({...recommendForm, schoolType: e.target.value})}
                        disabled={isSubmitting}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-600 transition-all ${recommendErrors.schoolType ? 'border-red-500' : 'border-white/10'}`}
                      >
                        <option value="">Select type...</option>
                        <option value="Primary">Primary Education</option>
                        <option value="Secondary">Secondary / High School</option>
                        <option value="Both">Combined (Primary & Secondary)</option>
                        <option value="Tertiary">Tertiary / Vocational</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Your Relationship *</label>
                      <select
                        required
                        value={recommendForm.contactRole}
                        onChange={e => setRecommendForm({...recommendForm, contactRole: e.target.value})}
                        disabled={isSubmitting}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-600 transition-all ${recommendErrors.contactRole ? 'border-red-500' : 'border-white/10'}`}
                      >
                        <option value="">Select relationship...</option>
                        <option value="Proprietor">Proprietor / Owner</option>
                        <option value="Principal">Principal / Headmaster</option>
                        <option value="Teacher">Academic Teacher</option>
                        <option value="Parent">Parent / Guardian</option>
                        <option value="Alumni">Alumni Member</option>
                        <option value="Other">External Supporter</option>
                      </select>
                    </div>
                  </div>

                  {/* School Size Category & Knowledge Depth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Estimated Student Count *</label>
                      <select
                        required
                        value={recommendForm.estimatedStudents}
                        onChange={e => setRecommendForm({...recommendForm, estimatedStudents: e.target.value})}
                        disabled={isSubmitting}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-600 transition-all ${recommendErrors.estimatedStudents ? 'border-red-500' : 'border-white/10'}`}
                      >
                        <option value="">Select population range...</option>
                        <option value="Under 100">Fewer than 100 students</option>
                        <option value="100 - 300">100 – 300 students</option>
                        <option value="300 - 800">300 – 800 students</option>
                        <option value="Above 800">More than 800 students</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">How do you know this school? *</label>
                      <select
                        required
                        value={recommendForm.schoolKnowledge}
                        onChange={e => setRecommendForm({...recommendForm, schoolKnowledge: e.target.value})}
                        disabled={isSubmitting}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-600 transition-all ${recommendErrors.schoolKnowledge ? 'border-red-500' : 'border-white/10'}`}
                      >
                        <option value="">Select option...</option>
                        <option value="Alumni">I'm an alumni</option>
                        <option value="Parent">My child attends</option>
                        <option value="Staff">I work there</option>
                        <option value="Neighbor">I live nearby</option>
                        <option value="Community">Community member</option>
                        <option value="Research">Found via research</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-white/20 text-[9px] uppercase font-bold tracking-widest">School Contact Person</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* School Contact Person Name */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Person Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dr. John Doe"
                      value={recommendForm.contactPersonName}
                      onChange={e => setRecommendForm({...recommendForm, contactPersonName: e.target.value})}
                      disabled={isSubmitting}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-600 transition-all ${recommendErrors.contactPersonName ? 'border-red-500' : 'border-white/10'}`}
                    />
                    {recommendErrors.contactPersonName && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Valid contact person name required</p>
                    )}
                  </div>

                  {/* School Contact email & phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. principal@school.com"
                        value={recommendForm.contactEmail}
                        onChange={e => setRecommendForm({...recommendForm, contactEmail: e.target.value})}
                        disabled={isSubmitting}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 transition-all ${recommendErrors.contactEmail ? 'border-red-500' : 'border-white/10'}`}
                      />
                      {recommendErrors.contactEmail && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Valid email address required</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +234 801 234 5678"
                        value={recommendForm.contactPhone}
                        onChange={e => setRecommendForm({...recommendForm, contactPhone: e.target.value})}
                        disabled={isSubmitting}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-600 transition-all ${recommendErrors.contactPhone ? 'border-red-500' : 'border-white/10'}`}
                      />
                      {recommendErrors.contactPhone && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Contact phone number required</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-white/20 text-[9px] uppercase font-bold tracking-widest">School Location</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* School Address */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-white/70 uppercase mb-2">School Physical Address *</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="e.g. 15 Education Street, Off Airport Road, Ikeja, Lagos, Nigeria"
                      value={recommendForm.schoolAddress}
                      onChange={e => setRecommendForm({...recommendForm, schoolAddress: e.target.value})}
                      disabled={isSubmitting}
                      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 transition-all ${recommendErrors.schoolAddress ? 'border-red-500' : 'border-white/10'}`}
                    />
                    {recommendErrors.schoolAddress && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> Valid physical address is required (at least 8 characters)</p>
                    )}
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2">Additional Notes (Optional)</label>
                    <textarea 
                      rows={3}
                      placeholder="Provide info on current infrastructure status, power conditions, internet access, specific challenges, etc."
                      value={recommendForm.notes}
                      onChange={e => setRecommendForm({...recommendForm, notes: e.target.value})}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-emerald-55 outline-none focus:border-green-600 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowRecommendModal(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl px-6 py-3.5 text-sm transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 cursor-pointer bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-1 transition"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Submit Recommendation</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
