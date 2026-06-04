import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  AlertCircle, 
  Building, 
  MapPin, 
  FileText, 
  PlusCircle, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// State-by-country mapping from the original configuration
const STATE_DATA: Record<string, string[]> = {
  NG: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara"
  ],
  GH: ["Greater Accra", "Ashanti", "Western", "Eastern", "Central", "Northern", "Volta", "Upper East", "Upper West", "Bono"],
  KE: ["Nairobi", "Mombasa", "Kiambu", "Nakuru", "Kisumu", "Uasin Gishu", "Machakos", "Nyeri", "Kajiado", "Kilifi"],
  ZA: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape"],
  RW: ["Kigali", "Eastern Province", "Northern Province", "Western Province", "Southern Province"],
  UG: ["Central Region", "Western Region", "Eastern Region", "Northern Region"],
  OTHER: ["State / Region 1", "State / Region 2", "Other Region"]
};

// Error interface for validation
interface FormErrors {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  country?: boolean;
  state?: boolean;
  address?: boolean;
  consent?: boolean;
  schoolName?: boolean;
  schoolType?: boolean;
  contactRole?: boolean;
  schoolAddress?: boolean;
  estimatedStudents?: boolean;
  schoolKnowledge?: boolean;
  contactPersonName?: boolean;
  contactPhone?: boolean;
  contactEmail?: boolean;
}

export default function Scout() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<FormErrors>({});

  // Form Field States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+234',
    phone: '',
    country: '',
    state: '',
    address: '',
    consent: false,
    schoolName: '',
    contactPersonName: '',
    contactPhone: '',
    contactEmail: '',
    schoolType: '',
    contactRole: '',
    schoolAddress: '',
    estimatedStudents: '',
    schoolKnowledge: '',
    notes: ''
  });

  // Background items array
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; duration: string; delay: string; opacity: number }[]>([]);

  useEffect(() => {
    // Generate background floating particles dynamically
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

  // Update State list options whenever country choice shifts
  useEffect(() => {
    setFormData(prev => ({ ...prev, state: '' }));
  }, [formData.country]);

  // Validation Rules
  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().split(' ').filter(w => w).length < 2) newErrors.name = true;
    if (!emailRx.test(formData.email.trim())) newErrors.email = true;
    if (formData.phone.replace(/\D/g, '').length < 7) newErrors.phone = true;
    if (!formData.country) newErrors.country = true;
    if (!formData.state) newErrors.state = true;
    if (formData.address.trim().length < 5) newErrors.address = true;
    if (!formData.consent) newErrors.consent = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (formData.schoolName.trim().length < 3) newErrors.schoolName = true;
    if (!formData.schoolType) newErrors.schoolType = true;
    if (!formData.contactRole) newErrors.contactRole = true;
    if (formData.schoolAddress.trim().length < 8) newErrors.schoolAddress = true;
    if (!formData.estimatedStudents) newErrors.estimatedStudents = true;
    if (!formData.schoolKnowledge) newErrors.schoolKnowledge = true;
    if (!formData.contactPersonName) newErrors.contactPersonName = true;
    if (!formData.contactEmail) newErrors.contactEmail = true;
    if (!formData.contactPhone) newErrors.contactPhone = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '+234',
      phone: '',
      country: '',
      state: '',
      address: '',
      consent: false,
      schoolName: '',
      contactPersonName: '',
      contactPhone: '',
      contactEmail: '',
      schoolType: '',
      contactRole: '',
      schoolAddress: '',
      estimatedStudents: '',
      schoolKnowledge: '',
      notes: ''
    });
    setErrors({});
    setStep(1);
  };

  // Get current applicable state values array
  const availableStates = STATE_DATA[formData.country] || STATE_DATA[formData.country === 'NG_OTHER' ? 'OTHER' : 'OTHER'] || [];

  return (
    <div className="bg-[#0a0f0d] text-white min-h-screen overflow-x-hidden font-sans relative">
      
      {/* ─── BACKGROUND LAYERS ─── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10" />
        {/* Low opacity image background match */}
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/27769510/pexels-photo-27769510.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200')" }} />
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(21,128,61,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(21,128,61,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-radial from-green-800/35 to-transparent blur-[80px] animate-pulse duration-[12s]" />
        <div className="absolute top-[30%] right-[-100px] w-[400px] h-[400px] rounded-full bg-radial from-yellow-500/20 to-transparent blur-[80px] animate-pulse duration-[8s]" />
        
        {/* Dynamic Particles */}
        <div className="absolute inset-0">
          {particles.map(p => (
            <span
              key={p.id}
              className="absolute bg-yellow-500/60 rounded-full animate-bounce"
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

      {/* ─── MAIN APP CONTAINER ─── */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-24 min-h-screen flex flex-col justify-center">
        
        {/* Header Branding */}
        {step !== 3 && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <span className="text-black font-extrabold font-['Orbitron'] text-xl">H</span>
              </div>
              <span className="font-['Orbitron'] tracking-wider text-sm font-semibold uppercase text-yellow-500">
                HolyDigits101
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-['Sora'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-emerald-500">
              Volunteer Scout Portal
            </h1>
            <p className="text-gray-400 text-sm max-w-md mx-auto mt-2">
              Help us identify and empower schools across Africa with next-gen Web3 and digital computing infrastructure.
            </p>

            {/* PROGRESS CONTROLLER DISPLAY */}
            <div className="mt-8 flex items-center justify-between relative max-w-sm mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-white/10 rounded-full z-0">
                <div 
                  className="h-full bg-gradient-to-r from-green-700 to-yellow-500 transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>

              {/* Step 1 Node */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  step > 1 ? 'bg-yellow-400 border-yellow-500 text-black' : 'bg-green-700 border-green-600 text-white shadow-[0_0_15px_rgba(21,128,61,0.5)]'
                }`}>
                  {step > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                </div>
                <span className="text-[11px] font-semibold tracking-wide uppercase text-gray-400">Scout Info</span>
              </div>

              {/* Step 2 Node */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  step === 2 
                    ? 'bg-green-700 border-green-600 text-white shadow-[0_0_15px_rgba(21,128,61,0.5)]' 
                    : step > 2 ? 'bg-yellow-400 border-yellow-500 text-black' : 'bg-white/5 border-white/10 text-white/40'
                }`}>
                  '2'
                </div>
                <span className="text-[11px] font-semibold tracking-wide uppercase text-gray-400">School Details</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── SCENARIO SLIDES CONTAINER ─── */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SCOUT INFORMATION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-[#0a0f0d]/75 backdrop-blur-2xl border border-green-800/30 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/5">
                <Building className="text-yellow-500" size={20} />
                <h2 className="text-xl font-bold font-['Sora'] text-white">Scout Personal Profile</h2>
              </div>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Amara Okafor"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.name && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Please enter your full name (at least 2 words)</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="e.g. amara@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Please enter a valid email address</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Phone Number *</label>
                  <div className="flex gap-2">
                    <select 
                      value={formData.countryCode} 
                      onChange={e => setFormData({...formData, countryCode: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-3 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700"
                    >
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+250">🇷🇼 +250</option>
                      <option value="+256">🇺🇬 +256</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="8012345678"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={`flex-1 bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Valid phone number required</p>
                  )}
                </div>

                {/* Country and State Row Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Your Country *</label>
                    <select
                      value={formData.country}
                      onChange={e => setFormData({...formData, country: e.target.value})}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 ${errors.country ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="" className="text-gray-400">Select country...</option>
                      <option value="NG">🇳🇬 Nigeria</option>
                      <option value="GH">🇬🇭 Ghana</option>
                      <option value="KE">🇰🇪 Kenya</option>
                      <option value="ZA">🇿🇦 South Africa</option>
                      <option value="RW">🇷🇼 Rwanda</option>
                      <option value="UG">🇺🇬 Uganda</option>
                      <option value="NG_OTHER">🌍 Other African Country</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Selection required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">State / Region *</label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      disabled={!formData.country}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 disabled:opacity-40 ${errors.state ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="">Select state/region...</option>
                      {availableStates.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Selection required</p>
                    )}
                  </div>
                </div>

                {/* Permanent Contact Address */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Your Residential Address *</label>
                  <input 
                    type="text" 
                    placeholder="Street name, City, State"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.address && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Full contact details required</p>
                  )}
                </div>

                {/* Checkbox Consent Element */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 select-none cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.consent}
                      onChange={e => setFormData({...formData, consent: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-[52px!important] h-[20px!important] rounded border flex items-center justify-center mt-0.5 transition-all ${
                      formData.consent ? 'bg-gradient-to-br from-green-700 to-green-600 border-green-600 text-white' : 'border-white/20 bg-white/5 group-hover:border-white/40'
                    }`}>
                      {formData.consent && <Check size={12} strokeWidth={4} className="w-[20px!important] h-[20px!important]"/>}
                    </div>
                    <span className="text-xs text-gray-400 leading-relaxed">
                        I consent to HolyDigits101 collecting and processing my personal data in accordance with the 
                        <a href="/privacy-policy">Privacy Policy</a>. 
                        My data will be used solely for the volunteer scout programme and will not be shared with third parties without my explicit consent.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-red-300 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> You must check data consent to proceed</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={validateStep1}
                  className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-green-900/40 transform transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Continue to School Information</span>
                  <ArrowRight size={18} />
                </button>
                <p className="text-center text-white/20 text-[10px] mt-3 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Lock size={10} /> Encrypted Secure Transmission
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SCHOOL DETAILS FORM */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0a0f0d]/75 backdrop-blur-2xl border border-green-800/30 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Building className="text-yellow-500" size={20} />
                  <div>
                    <h2 className="text-xl font-bold font-['Sora'] text-white">School Recommendation Data</h2>
                    <p class="text-white/40 text-xs">Tell us about the school you're recommending</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="text-gray-400 hover:text-white flex items-center gap-1 text-xs transition"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              </div>

              <div className="space-y-5">
                {/* School Name */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">School Official Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Greenfield Model Academy"
                    value={formData.schoolName}
                    onChange={e => setFormData({...formData, schoolName: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.schoolName ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.schoolName ? (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Please supply specific legal school title</p>
                  ) : (
                    <p className="text-white/30 text-[11px] mt-1">Please double-check proper spellings explicitly.</p>
                  )}
                </div>

                {/* School Type & Contact Role Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">School Type *</label>
                    <select
                      value={formData.schoolType}
                      onChange={e => setFormData({...formData, schoolType: e.target.value})}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700 ${errors.schoolType ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="">Select type...</option>
                      <option value="Primary">Primary Education</option>
                      <option value="Secondary">Secondary / High School</option>
                      <option value="Both">Combined (Primary & Secondary)</option>
                      <option value="Tertiary">Tertiary / Vocational</option>
                    </select>
                    {errors.schoolType && (
                      <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Selection required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Your Contact Relationship *</label>
                    <select
                      value={formData.contactRole}
                      onChange={e => setFormData({...formData, contactRole: e.target.value})}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700 ${errors.contactRole ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="">Select role...</option>
                      <option value="Proprietor">Proprietor / Owner</option>
                      <option value="Headmaster">Headmaster / Principal</option>
                      <option value="Teacher">Academic Teacher</option>
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Alumni">Alumni Member</option>
                      <option value="Other">External Supporter</option>
                    </select>
                    {errors.contactRole && (
                      <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Selection required</p>
                    )}
                  </div>
                </div>

                {/* School Size Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Estimated Student Count *</label>
                        <select
                            value={formData.estimatedStudents}
                            onChange={e => setFormData({...formData, estimatedStudents: e.target.value})}
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700 ${errors.estimatedStudents ? 'border-red-500' : 'border-white/10'}`}
                        >
                            <option value="">Select population range...</option>
                            <option value="under_100">Fewer than 100 students</option>
                            <option value="100_300">100 – 300 students</option>
                            <option value="300_800">300 – 800 students</option>
                            <option value="above_800">More than 800 students</option>
                        </select>
                        {errors.estimatedStudents && (
                            <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Range assignment required</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">How Do You Know This School? *</label>
                        <select
                            value={formData.schoolKnowledge}
                            onChange={e => setFormData({...formData, schoolKnowledge: e.target.value})}
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700 ${errors.schoolKnowledge ? 'border-red-500' : 'border-white/10'}`}
                        >
                            <option value="">Select relationship...</option>
                            <option value="Alumni">I'm an alumni</option>
                            <option value="Parent">My child attends</option>
                            <option value="Staff">I work there</option>
                            <option value="Neighbor">I live nearby</option>
                            <option value="Friend">Friend/Family attends</option>
                            <option value="Community">Community member</option>
                            <option value="Research">Found via research</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.schoolKnowledge && (
                            <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Range assignment required</p>
                        )}
                    </div>
                </div>

                {/* Separation Bar Label Graphic */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-white/25 text-[10px] uppercase font-bold tracking-widest">School Contact Person</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* Contact Person Full Name */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Amara Okafor"
                    value={formData.contactPersonName}
                    onChange={e => setFormData({...formData, contactPersonName: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.contactPersonName ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.contactPersonName && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Please enter the contact person full name (at least 2 words)</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Email *</label>
                  <input 
                    type="email" 
                    placeholder="e.g. amara@example.com"
                    value={formData.contactEmail}
                    onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.contactEmail ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.contactEmail && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Please enter a valid email address</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">Contact Phone *</label>
                  <div className="flex gap-2">
                    <select 
                      value={formData.countryCode} 
                      onChange={e => setFormData({...formData, countryCode: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-3 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700"
                    >
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+250">🇷🇼 +250</option>
                      <option value="+256">🇺🇬 +256</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="8012345678"
                      value={formData.contactPhone}
                      onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                      className={`flex-1 bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.contactPhone ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                    />
                  </div>
                  {errors.contactPhone && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Valid phone number required</p>
                  )}
                </div>



                {/* Separation Bar Label Graphic */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-white/25 text-[10px] uppercase font-bold tracking-widest">Location Details</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* School Address */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/70 uppercase mb-2">School Full Physical Address *</label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. 7 Education Close, Victoria Island, Lagos, Nigeria"
                    value={formData.schoolAddress}
                    onChange={e => setFormData({...formData, schoolAddress: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none transition-all focus:border-green-700 focus:bg-green-950/10 ${errors.schoolAddress ? 'border-red-500 focus:border-red-500' : 'border-white/10'}`}
                  />
                  {errors.schoolAddress && (
                    <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> Accurate geometric address required</p>
                  )}
                </div>

                {/* Map Mock Graphic Placeholder Box */}
                <div className="border border-dashed border-green-700/30 bg-green-900/5 rounded-2xl h-40 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="text-green-500/40 animate-bounce mb-2" size={32} />
                  <span className="text-xs text-white/50 font-medium">Automatic GPS Location Tagging Active</span>
                  <span className="text-[10px] text-white/20 mt-0.5">Latitude / Longitude coordinates logs will verify upon submission</span>
                </div>

                {/* Additional Optional Notes Input */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-white/40 uppercase mb-2">
                    Additional Notes <span className="text-white/20 font-normal italic">(Optional)</span>
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details on current power conditions, computer lab setup availability, specific challenges, etc."
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-emerald-50 outline-none focus:border-green-700"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={validateStep2}
                  className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-green-900/40 transform transition hover:-translate-y-0.5"
                >
                  <span>Submit Scout Registration</span>
                  <CheckCircle2 size={18} />
                </button>
                <p className="text-center text-white/25 text-[11px] mt-3">
                  By submitting, you confirm all provided details are correct to your best knowledge.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS APPLICATION RECEIVED */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0a0f0d]/90 border border-yellow-500/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden max-w-lg mx-auto"
            >
              {/* Pulsing Success Ring Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center relative shadow-[0_0_30px_rgba(21,128,61,0.3)] bg-green-950/20">
                  <Check size={44} className="text-green-400" strokeWidth={3} />
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-500/40 scale-110 animate-spin duration-[10s]" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold font-['Sora'] tracking-tight text-white mb-2">
                Scout Submission Complete!
              </h2>
              <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold font-['Orbitron'] mb-6">
                Thank you for powering African schools
              </p>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Your recommendation for <span className="text-white font-semibold">"{formData.schoolName}"</span> has been registered into HolyDigits101 core database.
              </p>

              {/* Steps Progress Checklist Summary Info */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 text-left space-y-4 mb-8">
                <h4 className="text-xs uppercase font-bold tracking-wider text-white/50 mb-1">What Happens Next?</h4>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-yellow-500/20">
                    1
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">
                    Our compliance managers will audit the school’s details and location logs.
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-yellow-500/20">
                    2
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">
                    You will receive an automated confirmation email accompanied by your distinctive Scout ID badge.
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-yellow-500/20">
                    3
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">
                    HolyDigits101 field operators will reach out to the school board to initiate structural parameters setup.
                  </p>
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <button
                type="button"
                onClick={handleResetForm}
                className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-yellow-500 text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 text-sm"
              >
                <PlusCircle size={16} />
                <span>Recommend Another School</span>
              </button>

              {/* Watermark Branding Icon */}
              <div className="mt-8 flex items-center justify-center gap-2 opacity-25">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-black text-black font-['Orbitron']">H</span>
                </div>
                <span className="text-white text-[10px] font-medium tracking-wide">
                  HolyDigits101 · Digital Education Initiative
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}