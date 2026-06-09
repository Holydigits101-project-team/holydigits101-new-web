import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Lightbulb, Shield, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop&q=60" 
            className="w-full h-full object-cover opacity-40 animate-[pulse_10s_ease-in-out_infinite]"
            alt="Collaborative Education"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
          <div className="absolute inset-0 cinematic-overlay z-10"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 border-2 border-yellow-500/30 rounded-full"
          ></motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-full mb-6">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-yellow-400 font-semibold">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-['Orbitron'] text-white mb-6">
              About Holydigits101
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pioneering Web3 Education Since 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
                Who We Are
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                HOLYDIGITS101 is a pioneering education and technology enterprise dedicated to transforming Africa's outdated education system through Web3, blockchain, and digital skills.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Through our <strong>Holydigits101 flagship program and Builders ecosystem</strong>, we help learners build, earn, and own their educational journey while connecting them to digital jobs, talent pipelines, and community-driven projects.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                We are shaping a future where knowledge becomes power, education creates wealth, and every African student can participate in the digital revolution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-3xl blur-3xl group-hover:blur-[50px] transition-all"></div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-yellow-500/30">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop&q=60" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="African Tech Innovation"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                   <p className="text-white font-['Orbitron'] text-2xl font-bold glow-text">
                    HOLY<span className="text-yellow-400">DIGITS</span>101
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
              Our Mission & Vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-2xl backdrop-blur-sm"></div>
              <div className="relative p-8 border border-white/10 rounded-2xl hover:border-yellow-500/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold font-['Orbitron'] text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  To empower young people in schools, orphanages, and IDP camps with digital skills, practical skills, and entrepreneurship to navigate the digital economy with integrity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-2xl backdrop-blur-sm"></div>
              <div className="relative p-8 border border-white/10 rounded-2xl hover:border-yellow-500/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold font-['Orbitron'] text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  To be the global leader in decentralized education, fostering a world where digital ownership and practical entrepreneurship are accessible to every African child.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence in Education',
                description: 'We are committed to providing the highest quality content that is accurate, up-to-date, and easy to understand.',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: Users,
                title: 'Community-First',
                description: 'We believe in the power of collective learning and strive to build a supportive community for our students.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'We constantly evolve our curriculum to reflect the latest trends and technologies in the fast-paced crypto world.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Shield,
                title: 'Integrity',
                description: 'We operate with transparency and honesty, providing unbiased education to help our students make informed decisions.',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl backdrop-blur-sm"></div>
                <div className="relative p-6 border border-white/10 rounded-2xl hover:border-yellow-500/50 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold font-['Orbitron'] text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
              Our Journey
            </h2>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                year: '2024',
                title: 'The Beginning',
                description: 'HOLYDIGITS101 was founded with a mission to demystify Web3 for the masses. We started with blogs, workshops, and university programs.',
              },
              {
                year: '2025',
                title: 'University Impact',
                description: 'Launched in University of Abuja, impacting over 2,000 students with Web3 education and training. Expansion proposals sent and structures laid for nationwide reach.',
              },
              {
                year: '2025',
                title: 'Executive Training',
                description: 'Scaling our mission through specialized executive training and community-led structures in key African cities.',
              },
              {
                year: '2026',
                title: 'The NFT Model',
                description: 'Full integration of our NFT tuition model on the roadmap, enabling secure digital ownership and global payments.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50">
                    <span className="text-black font-bold text-2xl font-['Orbitron']">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative p-6 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-yellow-500/50 transition-all">
                    <h3 className="text-2xl font-bold font-['Orbitron'] text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
              Our Trusted Partners
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Mprofy DAO', 'Sound Rig', 'Spent Academy', 'LingoQL', 'Suilife','Xini8'].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl flex items-center justify-center hover:border-yellow-500/50 transition-all backdrop-blur-sm"
              >
                <span className="text-gray-400 font-semibold text-center px-4">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
