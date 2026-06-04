import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Impact Hub', path: '/https://holydigits-impact-hub.lingoql.com' },
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl font-['Orbitron']">H</span>
                </div>
              </div>
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                <img src="https://storage.lingoql.com/holydigits101/logo-main.png" ></img>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering individuals worldwide with the knowledge to navigate the digital economy with confidence and skill.
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
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                Subscribe
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
