import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { api } from '../utils/api';
import { useToast } from './Toast';
import { useRecaptcha, validateCaptchaToken } from './RecaptchaField';

export default function Footer() {
  const { toast } = useToast();
  const { getToken } = useRecaptcha();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const captchaToken = await getToken('newsletter');
      if (!validateCaptchaToken(captchaToken, toast.error)) return;

      const response = await api.subscribeNewsletter({ email, captchaToken });

      if (response.success) {
        toast.success('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        toast.error(response.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
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

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Waitlist', path: '/waitlist' },
    { name: 'Impact Hub', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  const communityLinks = [
    { name: 'Discord Server', url: 'https://discord.gg/ZMxeWXUnS' },
    { name: 'Twitter/X', url: 'https://x.com/holydigits101?s=21' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/holydigits101-global/' },
    { name: 'YouTube', url: 'https://youtube.com/@holydigits101?si=y5xQ4DTwzTrvAnh8' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black border-t border-yellow-500/20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              {/* <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div> */}
              <div className="ml-[5rem!important] relative w-12 h-12 rounded-full flex items-center justify-center">
                <img src="https://storage.lingoql.com/holydigits101/logo-main.png" ></img>
                <div className="ml-[5px] md:block">
                  <span className="text-white font-['Orbitron'] text-xl font-bold tracking-wider">HOLY<span className="text-yellow-400">DIGITS</span>101</span>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              From classrooms to startups, from learners to leaders. We equip students and educators with the tools, mindset, and blockchain-powered knowledge needed to create wealth, build solutions, and lead in the decentralized digital economy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-['Orbitron'] text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-['Orbitron'] text-lg font-semibold mb-6 relative inline-block">
              Community
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-['Orbitron'] text-lg font-semibold mb-6 relative inline-block">
              Stay Updated
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
                type="submit"
                className={`w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all ${
                  submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Holydigits101. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="mailto:official@holydigits101.com" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
