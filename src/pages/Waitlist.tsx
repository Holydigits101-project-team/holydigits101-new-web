import React, { useState } from 'react';
import { Rocket, ChevronDown } from 'lucide-react';
import { countryRegions, countries } from '../data/countryRegions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { api, AllowedRole } from '../utils/api';
import { useToast } from '../components/Toast';
import { Modal } from '../components/Modal';
import { useRecaptcha, validateCaptchaToken } from '../components/RecaptchaField';



const timeSlots = [
  "2:00 PM – 2:30 PM",
  "2:30 PM – 3:00 PM",
  "3:00 PM – 3:30 PM",
  "3:30 PM – 4:00 PM",
  "4:00 PM – 4:30 PM",
  "4:30 PM – 5:00 PM",
  "5:00 PM – 5:30 PM",
  "5:30 PM – 6:00 PM",
  "6:00 PM – 6:30 PM",
  "6:30 PM – 7:00 PM",
  "7:00 PM – 7:30 PM",
  "7:30 PM – 8:00 PM",
  "8:00 PM – 8:30 PM",
  "8:30 PM – 9:00 PM"
];

const departments = [
  {
    name: 'Technical & IT Team',
    roles: [
      'Website Development',
      'NFT Development',
      'UX/UI Design',
      'Backend Engineering',
      'Cybersecurity',
      'Blockchain Infrastructure',
      'DevOps & Cloud',
      'AI & Data Science',
    ],
  },
  {
    name: 'On-Ground School Training',
    roles: [
      'Education & Curriculum Design',
      'Online Blockchain Bootcamps',
      'Teacher Training & Mentorship',
      'STEAM Lab Deployment',
    ],
  },
  {
    name: 'Creative & Brand Leadership',
    roles: [
      'Brand Strategy',
      'Content Creation',
      'Social Media Management',
      'Event Curation',
      'Partnerships & PR',
    ],
  },
];

function Waitlist() {
  const { toast } = useToast();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [darkMode] = useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countries.find(c => c.name === 'Nigeria') || countries[0]);
  const [expandedDepts, setExpandedDepts] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<AllowedRole[]>([]);
  const { getToken } = useRecaptcha();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'Nigeria',
    region: '',
    phone: '',
    postalCode: '',
    motivation: '',
    preferredDate: '',
    preferredTime: '',
  });

  const toggleDepartment = (index: number) => {
    setExpandedDepts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role as AllowedRole)
        ? prev.filter((r) => r !== role)
        : [...prev, role as AllowedRole]
    );
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === "preferredDate") {
      const selectedDate = new Date(value);
      const day = selectedDate.getDay();
  
      // 3 = Wednesday, 4 = Thursday, 0 = Sunday
      if (day === 3 || day === 4 || day === 0) {
        toast.error("Wednesdays, Thursdays, and Sundays are not available.");
        return;
      }
    }
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const captchaToken = await getToken('waitlist');
      if (!validateCaptchaToken(captchaToken, toast.error)) return;

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        country: formData.country,
        region: formData.region,
        phone: `${selectedCountryCode.code} ${formData.phone}`,
        postalCode: formData.postalCode,
        motivation: formData.motivation,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        selectedRoles,
        captchaToken,
      };

      if (!agreedToTerms) {
        toast.error('Please agree to the Terms & Conditions');
        return;
      }

      const response = await api.submitWaitlist(payload);

      if (response.success) {
        setIsSuccessModalOpen(true);
        // Reset form data
        setFormData({
          fullName: '',
          email: '',
          country: 'Nigeria',
          region: '',
          phone: '',
          postalCode: '',
          motivation: '',
          preferredDate: '',
          preferredTime: '',
        });
        setSelectedRoles([]);
        setAgreedToTerms(false);
      } else {
        toast.error(response.message || 'Failed to submit application. Please try again.');
      }

    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.name === 'ZodError') {
        const errorMessages = error.issues.map((err: any) => err.message).join('\n');
        toast.error(`Validation Error:\n${errorMessages}`);
      } else {
        toast.error(error.message || 'An error occurred. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#0B1120]' : 'bg-gray-50'
      }`}>
        {/* Background Image with Blur */}
        <div 
          className={`absolute inset-0 bg-cover bg-center ${darkMode ? 'opacity-10' : 'opacity-5'}`}
          style={{ 
            backgroundImage: 'url(/executives-bg.jpg)',
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-b from-[#0B1120]/90 via-[#1a1f35]/80 to-[#0B1120]/95' 
            : 'bg-gradient-to-b from-white/80 via-gray-50/70 to-white/90'
        }`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Navbar */}
          <Navbar />

          {/* Main Form Card */}
          <div className="mt-12 max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className={`backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 transition-colors duration-300 ${
              darkMode 
                ? 'bg-white/5 border border-yellow-500/20 shadow-yellow-500/5' 
                : 'bg-white border border-gray-200 shadow-gray-200/50'
            }`}>
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                    darkMode 
                      ? 'from-yellow-400 via-yellow-300 to-amber-400' 
                      : 'from-yellow-600 via-amber-500 to-yellow-600'
                  }`}>
                    Join the Executive
                  </span>{' '}
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>Movement</span>
                </h1>
                <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Shape the future of African education, blockchain & leadership.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information - Two Column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Country <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={(e) => {
                        handleInputChange(e);
                        // Reset region when country changes
                        setFormData(prev => ({ ...prev, region: '' }));
                        // Automatically update the country code prefix
                        const matchedCountry = countries.find(c => c.name === e.target.value);
                        if (matchedCountry) {
                          setSelectedCountryCode(matchedCountry);
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white' 
                          : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900'
                      }`}
                    >
                      {countries.map((country) => (
                        <option key={country.name} value={country.name} className={darkMode ? 'bg-[#0B1120]' : 'bg-white'}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Region/State */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Region / State <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <select
                      name="region"
                      required
                      value={formData.region}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white' 
                          : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900'
                      }`}
                    >
                      <option value="" className={darkMode ? 'bg-[#0B1120]' : 'bg-white'}>
                        Select {formData.country ? 'Region/State' : 'a country first'}
                      </option>
                      {formData.country && countryRegions[formData.country] && countryRegions[formData.country].map((region) => (
                        <option key={region} value={region} className={darkMode ? 'bg-[#0B1120]' : 'bg-white'}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Country Code */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Country Code <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <select
                      required
                      value={selectedCountryCode.name}
                      onChange={(e) => {
                        const country = countries.find(c => c.name === e.target.value);
                        if (country) setSelectedCountryCode(country);
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white' 
                          : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900'
                      }`}
                    >
                      {countries.map((country) => (
                        <option key={`code-${country.name}`} value={country.name} className={darkMode ? 'bg-[#0B1120]' : 'bg-white'}>
                          {country.flag} {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Phone Number <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <div className="flex space-x-2">
                      <div className={`w-32 px-3 py-3 border rounded-lg flex items-center space-x-2 ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 text-white' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}>
                        <span>{selectedCountryCode.flag}</span>
                        <span className="text-sm">{selectedCountryCode.code}</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          darkMode 
                            ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white placeholder-gray-500' 
                            : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="8012345678"
                      />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Postal / Zip Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>

                {/* Motivation Textarea */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Why do you want to join as Executive Member? <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                  </label>
                  <textarea
                    name="motivation"
                    required
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={6}
                    minLength={1}
                    maxLength={200}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors ${
                      darkMode 
                        ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Describe your leadership experience, vision for African education, blockchain expertise, and what you'd bring to the executive council..."
                  />
                  <div className="text-sm text-gray-500 mt-1 flex justify-end">
                    {formData.motivation.length}/200
                  </div>
                  {/* <textarea
                    name="motivation"
                    required
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={6}
                    min={1}
                    max={200}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors ${
                      darkMode 
                        ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Describe your leadership experience, vision for African education, blockchain expertise, and what you'd bring to the executive council..."
                  /> */}
                </div>

                {/* Schedule Interview */}
                <div className={`border-t pt-8 ${darkMode ? 'border-yellow-500/10' : 'border-gray-200'}`}>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>Schedule Your Interview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          darkMode 
                            ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white' 
                            : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Preferred Time Slot
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          darkMode 
                            ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white' 
                            : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900'
                        }`}
                      >
                        <option value="" className={darkMode ? 'bg-[#0B1120]' : 'bg-white'}>Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className={darkMode ? 'bg-[#0B1120]' : 'bg-white'}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    You will be contacted to confirm or reschedule if needed. Our executive team will reach out within 3 business days.
                  </p>
                </div>

                {/* Department Selection */}
                <div className={`border-t pt-8 ${darkMode ? 'border-yellow-500/10' : 'border-gray-200'}`}>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    Select Executive Department(s) & Roles <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                  </h3>
                  <div className="space-y-3">
                    {departments.map((dept, index) => (
                      <div key={dept.name} className={`border rounded-lg overflow-hidden transition-colors ${
                        darkMode 
                          ? 'border-yellow-500/20 bg-black/20' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <button
                          type="button"
                          onClick={() => toggleDepartment(index)}
                          className={`w-full px-4 py-3 flex justify-between items-center transition-colors ${
                            darkMode ? 'hover:bg-yellow-500/5' : 'hover:bg-gray-100'
                          }`}
                        >
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{dept.name}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              darkMode ? 'text-yellow-400' : 'text-yellow-600'
                            } ${expandedDepts.includes(index) ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {expandedDepts.includes(index) && (
                          <div className={`px-4 py-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-2 ${
                            darkMode 
                              ? 'bg-black/40 border-yellow-500/10' 
                              : 'bg-white border-gray-200'
                          }`}>
                            {dept.roles.map((role) => (
                              <label
                                key={role}
                                className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                                  darkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-600'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedRoles.includes(role)}
                                  onChange={() => toggleRole(role)}
                                  className={`w-4 h-4 rounded focus:ring-offset-0 ${
                                    darkMode 
                                      ? 'border-yellow-400/30 bg-black/40 text-yellow-500 focus:ring-yellow-500' 
                                      : 'border-gray-300 bg-white text-yellow-600 focus:ring-yellow-500'
                                  }`}
                                />
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{role}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {selectedRoles.length > 0 && (
                    <div className={`mt-4 p-3 border rounded-lg ${
                      darkMode 
                        ? 'bg-yellow-500/10 border-yellow-500/30' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className={`font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Selected:</span>{' '}
                        {selectedRoles.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Section */}
                <div className={`border-t pt-8 space-y-6 ${darkMode ? 'border-yellow-500/10' : 'border-gray-200'}`}>
                  {/* Captcha */}


                  {/* Terms Checkbox */}
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className={`w-5 h-5 mt-0.5 rounded focus:ring-offset-0 ${
                        darkMode 
                          ? 'border-yellow-400/30 bg-black/40 text-yellow-500 focus:ring-yellow-500' 
                          : 'border-gray-300 bg-white text-yellow-600 focus:ring-yellow-500'
                      }`}
                    />
                    <span className={`text-sm transition-colors ${
                      darkMode 
                        ? 'text-gray-300 group-hover:text-white' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      I agree to the{' '}
                      <a href="#" className={`hover:underline ${
                        darkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>
                        Terms & Conditions
                      </a>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 text-lg ${
                      submitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      darkMode 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-black shadow-yellow-500/30' 
                        : 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white shadow-yellow-600/30'
                    }`}
                  >
                    <span>{submitting ? 'Submitting Application...' : 'Submit Executive Application'}</span>
                    <Rocket className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            {/* <div className={`text-center mt-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              <p>© 2024 HolyDigits101. Shaping the future of African education & blockchain.</p>
            </div> */}
          </div>

          <Footer />
        </div>
      </div>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Application Received!"
        type="success"
      >
        Your waitlist application for the Executive Movement has been submitted successfully. Our team will contact you within 3 business days to arrange your interview.
      </Modal>
    </div>
  );
}

export default Waitlist;
