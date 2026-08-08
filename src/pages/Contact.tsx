import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../utils/api';
import { useToast } from '../components/Toast';

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const response = await api.submitContact({ name, email, message });

      if (response.success) {
        toast.success('Message sent successfully! We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(response.message || 'Failed to send message. Please try again.');
      }
    } catch (error: any) {
      console.error('Error sending contact message:', error);
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
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-['Orbitron'] text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', value: 'official@holydigits101.com' },
                  { icon: MapPin, title: 'Headquarters', value: 'Abuja, Nigeria' },
                  { icon: Phone, title: 'Community', value: 'Global Web3 Ecosystem' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-black" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-xl"
            >
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>
              <div>
                <textarea
                  rows={6}
                  required
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-all resize-none"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
                type="submit"
                className={`w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-yellow-500/50 transition-all ${
                  submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                <Send size={20} />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
