import React, { useState } from 'react';
import { Users, Moon, Sun, Rocket, ChevronDown } from 'lucide-react';
import { countryRegions } from '../data/countryRegions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Comprehensive country list with codes and flags
const countries = [
  { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
  { name: 'Albania', code: '+355', flag: '🇦🇱' },
  { name: 'Algeria', code: '+213', flag: '🇩🇿' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Benin', code: '+229', flag: '🇧🇯' },
  { name: 'Botswana', code: '+267', flag: '🇧🇼' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
  { name: 'Burundi', code: '+257', flag: '🇧🇮' },
  { name: 'Cameroon', code: '+237', flag: '🇨🇲' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Cape Verde', code: '+238', flag: '🇨🇻' },
  { name: 'Central African Republic', code: '+236', flag: '🇨🇫' },
  { name: 'Chad', code: '+235', flag: '🇹🇩' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Congo', code: '+242', flag: '🇨🇬' },
  { name: 'Côte d\'Ivoire', code: '+225', flag: '🇨🇮' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
  { name: 'Eritrea', code: '+291', flag: '🇪🇷' },
  { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Gabon', code: '+241', flag: '🇬🇦' },
  { name: 'Gambia', code: '+220', flag: '🇬🇲' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'Guinea', code: '+224', flag: '🇬🇳' },
  { name: 'Guinea-Bissau', code: '+245', flag: '🇬🇼' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Lesotho', code: '+266', flag: '🇱🇸' },
  { name: 'Liberia', code: '+231', flag: '🇱🇷' },
  { name: 'Libya', code: '+218', flag: '🇱🇾' },
  { name: 'Madagascar', code: '+261', flag: '🇲🇬' },
  { name: 'Malawi', code: '+265', flag: '🇲🇼' },
  { name: 'Mali', code: '+223', flag: '🇲🇱' },
  { name: 'Mauritania', code: '+222', flag: '🇲🇷' },
  { name: 'Mauritius', code: '+230', flag: '🇲🇺' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦' },
  { name: 'Mozambique', code: '+258', flag: '🇲🇿' },
  { name: 'Namibia', code: '+264', flag: '🇳🇦' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Niger', code: '+227', flag: '🇳🇪' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Rwanda', code: '+250', flag: '🇷🇼' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Senegal', code: '+221', flag: '🇸🇳' },
  { name: 'Seychelles', code: '+248', flag: '🇸🇨' },
  { name: 'Sierra Leone', code: '+232', flag: '🇸🇱' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Somalia', code: '+252', flag: '🇸🇴' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'South Sudan', code: '+211', flag: '🇸🇸' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Sudan', code: '+249', flag: '🇸🇩' },
  { name: 'Swaziland', code: '+268', flag: '🇸🇿' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Togo', code: '+228', flag: '🇹🇬' },
  { name: 'Tunisia', code: '+216', flag: '🇹🇳' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'Uganda', code: '+256', flag: '🇺🇬' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Zambia', code: '+260', flag: '🇿🇲' },
  { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' },
];



const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
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
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countries.find(c => c.name === 'Nigeria') || countries[0]);
  const [expandedDepts, setExpandedDepts] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
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
  
      // 3 = Wednesday, 4 = Thursday, 7 = Sunday
      if (day === 3 || day === 4 || day === 7) {
        alert("Wednesdays, Thursdays and Sundays are not available.");
        return;
      }
    }
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) !== 9) {
      alert('Please solve the captcha correctly');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    if (selectedRoles.length === 0) {
      alert('Please select at least one department/role');
      return;
    }
    
    console.log('Form submitted:', { ...formData, selectedRoles, selectedCountryCode });
    alert('Application submitted successfully! Our executive team will contact you within 3 business days.');
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
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Human Verification <span className={darkMode ? 'text-yellow-400' : 'text-yellow-600'}>*</span>
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-3 border rounded-lg font-mono text-lg ${
                        darkMode 
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-white' 
                          : 'bg-yellow-50 border-yellow-200 text-gray-900'
                      }`}>
                        4 + 5 = ?
                      </div>
                      <input
                        type="number"
                        required
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        className={`w-24 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-center transition-colors ${
                          darkMode 
                            ? 'bg-black/40 border-yellow-500/20 focus:ring-yellow-500/50 focus:border-yellow-500 text-white' 
                            : 'bg-white border-gray-300 focus:ring-yellow-500/50 focus:border-yellow-500 text-gray-900'
                        }`}
                        placeholder="?"
                      />
                    </div>
                  </div>

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
                    className={`w-full font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 text-lg ${
                      darkMode 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-black shadow-yellow-500/30' 
                        : 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white shadow-yellow-600/30'
                    }`}
                  >
                    <span>Submit Executive Application</span>
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
    </div>
  );
}

export default Waitlist;