import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Sparkles,
  Zap,
  Upload,
  FileText,
  Check,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRecaptcha, validateCaptchaToken } from '../components/RecaptchaField';
import { useToast } from '../components/Toast';
import { api, partnershipSchema } from '../utils/api';

export default function Partnership() {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const { getToken } = useRecaptcha();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // add this inside the component, before return()

  const countries = useMemo(
    () =>
      [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Democratic Republic of the Congo',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Ivory Coast',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Korea',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestine',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Korea',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
      ].sort(),
    []
  );

  const partnershipTypes = [
    {
      icon: Building2,
      title: 'School Partnerships',
      description:
        'Collaborate with educational institutions to integrate Web3 and blockchain technology into their curriculum',
    },
    {
      icon: Sparkles,
      title: 'Sponsorships',
      description:
        'Support our mission and gain visibility across our expanding network of schools and students',
    },
    {
      icon: Zap,
      title: 'Project Collaborations',
      description:
        'Work together on innovative projects that advance education technology and digital transformation',
    },
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB

      const oversizedFiles = selectedFiles.filter(file => file.size > MAX_SIZE);
      if (oversizedFiles.length > 0) {
        const fileNames = oversizedFiles.map(f => f.name).join(', ');
        toast.error(`The following files exceed the 10MB limit: ${fileNames}. Please upload files under 10MB.`);
        e.target.value = ''; // Reset input selection
        return;
      }

      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const captchaToken = await getToken('partnership');
    if (!validateCaptchaToken(captchaToken, toast.error)) return;

    const targetForm = e.currentTarget;
    const formData = new FormData(targetForm);

    const rawPayload = {
      fullName: formData.get('fullName') as string || '',
      organization: formData.get('organization') as string || '',
      email: formData.get('email') as string || '',
      phone: formData.get('phone') as string || '',
      country: formData.get('country') as string || '',
      partnershipType: formData.get('partnershipType') as string || '',
      proposal: formData.get('proposal') as string || '',
      captchaToken,
    };

    setSubmitting(true);
    try {
      // Validate inputs client-side first using Zod
      const parsedData = partnershipSchema.parse({
        ...rawPayload,
        documents: files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
      });

      // Step 1: Submit core partnership application details
      const response = await api.submitPartnership({
        fullName: parsedData.fullName,
        organization: parsedData.organization,
        email: parsedData.email,
        phone: parsedData.phone,
        country: parsedData.country,
        partnershipType: parsedData.partnershipType,
        proposal: parsedData.proposal,
        captchaToken: parsedData.captchaToken,
      });

      if (response.success && response.data?.id) {
        const partnershipId = response.data.id;

        // Step 2: Upload files if any are attached
        if (files.length > 0) {
          const submissionData = new FormData();
          submissionData.append('partnershippid', partnershipId);
          for (const file of files) {
            submissionData.append('file', file);
          }

          const uploadResponse = await api.uploadPartnershipDocs(submissionData);
          if (uploadResponse.success && uploadResponse.data) {
            const documents = Array.isArray(uploadResponse.data)
              ? uploadResponse.data
              : [uploadResponse.data];

            const saveResponse = await api.savePartnershipDocs(partnershipId, documents);
            if (!saveResponse.success) {
              toast.error(saveResponse.message || 'Application submitted, but failed to save document attachment references.');
            }
          } else {
            toast.error(uploadResponse.message || 'Application submitted, but supporting document uploads failed.');
          }
        }

        // Complete success handling
        targetForm.reset();
        setFiles([]);
        setShowSuccessModal(true);
      } else {
        toast.error(response.message || 'Failed to submit application. Please try again.');
      }
    } catch (error: any) {
      console.error('Error submitting partnership:', error);
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
    <div className="bg-black min-h-screen overflow-x-hidden text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8068814/pexels-photo-8068814.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="Diverse partnership collaboration"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
          <div className="absolute inset-0 cinematic-overlay"></div>
        </div>

        {/* Floating Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl top-20 left-10"
          />

          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1.5,
            }}
            className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-3xl bottom-20 right-10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Orbitron'] mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient-shift glow-text">
              Build Together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Join us in transforming African education through strategic
            partnerships and collaborations
          </motion.p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-amber-500/0 group-hover:from-yellow-500/10 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <item.icon
                      className="text-yellow-400 group-hover:text-yellow-300 transition-colors"
                      size={32}
                    />
                  </div>

                  <h3 className="text-2xl font-bold font-['Orbitron'] mb-4 text-white group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 relative">
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl shadow-yellow-500/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name <span className="text-yellow-400">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Organization / Company Name{' '}
                  <span className="text-yellow-400">*</span>
                </label>

                <input
                  type="text"
                  name="organization"
                  required
                  placeholder="Enter your organization or company name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address{' '}
                    <span className="text-yellow-400">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number{' '}
                    <span className="text-yellow-400">*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Country */}
            <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Country <span className="text-yellow-400">*</span>
                </label>

                <select
                    name="country"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                >
                    <option value="" disabled className="bg-gray-900 text-gray-500">
                    Select your country
                    </option>

                    {countries.map((country) => (
                    <option
                        key={country}
                        value={country}
                        className="bg-gray-900 text-white"
                    >
                        {country}
                    </option>
                    ))}
                </select>
            </div>

              {/* Partnership Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Type of Partnership{' '}
                  <span className="text-yellow-400">*</span>
                </label>

                <select
                  name="partnershipType"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                >
                  <option value="" className="bg-gray-900">
                    Select partnership type
                  </option>

                  <option value="strategic" className="bg-gray-900">
                    Strategic Partnership
                  </option>

                  <option value="sponsorship" className="bg-gray-900">
                    Sponsorship
                  </option>

                  <option value="technology" className="bg-gray-900">
                    Technology Collaboration
                  </option>

                  <option value="education" className="bg-gray-900">
                    Education Program
                  </option>

                  <option value="investment" className="bg-gray-900">
                    Investment
                  </option>

                  <option value="media" className="bg-gray-900">
                    Media Partnership
                  </option>

                  <option value="others" className="bg-gray-900">
                    Others
                  </option>
                </select>
              </div>

              {/* Proposal */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Tell us about your proposal / collaboration idea{' '}
                  <span className="text-yellow-400">*</span>
                </label>

                <textarea
                  name="proposal"
                  required
                  rows={6}
                  placeholder="Share details about your partnership proposal, goals, and how you envision collaborating with us..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Upload Supporting Documents{' '}
                  <span className="text-gray-500">(Optional)</span>
                </label>

                <label className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white/5 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300 group">
                  <Upload className="w-10 h-10 text-gray-400 group-hover:text-yellow-400 transition-colors mb-3" />

                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mb-1">
                    <span className="font-semibold text-yellow-400">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>

                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, PPT, PPTX (Max 10MB each)
                  </p>

                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText
                            className="text-yellow-400"
                            size={16}
                          />

                          <span className="text-white text-sm truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>

                        <span className="text-gray-500 text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>



              {/* Terms */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-5 h-5 bg-white/5 border border-white/10 rounded"
                />

                <label className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-yellow-400 hover:text-yellow-300 underline"
                  >
                    Terms & Conditions
                  </a>{' '}
                  and understand that my information will be used to process
                  this partnership application.
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                  type="submit"
                  className={`w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 flex items-center justify-center group ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}

                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl shadow-yellow-500/20 max-w-md w-full p-8 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full opacity-20 animate-pulse"></div>

              <div className="relative w-24 h-24 flex items-center justify-center">
                <Check
                  className="text-yellow-400"
                  size={48}
                />
              </div>
            </div>

            <h3 className="text-3xl font-bold font-['Orbitron'] mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Application Sent!
              </span>
            </h3>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Thank you for your interest in partnering with Holydigits101.
              Our team will review your proposal and reach out within 48
              hours.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300"
            >
              Got it, thanks!
            </button>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
