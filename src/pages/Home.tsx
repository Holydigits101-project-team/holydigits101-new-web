import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, BookOpen, Coins, GraduationCap, Rocket, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative mx-auto w-24 h-24"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-4xl font-['Orbitron']">H</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-yellow-400 font-['Orbitron'] text-xl"
          >
            Welcome to the official website of Holydigits101
          </motion.div>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10"></div>
          <div className="absolute inset-0 cinematic-overlay z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop&q=60" 
            className="w-full h-full object-cover opacity-60 scale-100 transition-transform duration-[20s] hover:scale-110"
            alt="Students in classroom"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Geometric Decorations */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 border-2 border-yellow-500/30 rounded-full"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 left-20 w-72 h-72 border-2 border-yellow-400/20 rounded-full"
          ></motion.div>
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Orbitron'] mb-6 leading-tight text-white">
              Redefining Education
              <br />
              Through <span className="text-yellow-400 glow-text">Web3</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Empowering African schools with blockchain, AI, and digital ownership.
          </motion.p>

            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="/scout"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full text-lg flex items-center space-x-2 shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all"
            >
              <span>Holydigits101 Scout</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.a>

            <motion.a
              href="/partnership"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-yellow-400 text-yellow-400 font-bold rounded-full text-lg hover:bg-yellow-400 hover:text-black transition-all"
            >
              Partnership
            </motion.a>
          </motion.div>

          {/* ONE powerful glowing button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <motion.a
              href="https://builders.holydigits101.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-12 py-5 bg-black rounded-full overflow-hidden border border-yellow-400/50 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-400/40 to-yellow-400/20 animate-gradient-shift"></div>
              <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_3s_linear_infinite] opacity-20 group-hover:opacity-40"></div>
              <div className="relative flex items-center space-x-3 text-white">
                <Rocket className="text-yellow-400 group-hover:animate-bounce" size={24} />
                <span className="text-xl font-bold font-['Orbitron'] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                  BUILD, OWN & LEAD
                </span>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-yellow-400 rounded-full mx-auto"
            ></motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative py-24 bg-black">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Teacher Training',
                description: 'We equip teachers with blockchain, AI, IoT, and digital skills to deliver modern education.',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
              },
              {
                icon: BookOpen,
                title: 'Web3 School Integration',
                description: 'Schools receive a complete, ready-to-deploy Web3 curriculum connected to global opportunities.',
                image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop',
              },
              {
                icon: Coins,
                title: 'Holydigits101 Educational NFTs',
                description: 'Students will access HOLYDIGITS101 through secure NFTs for tuition payments in the future (part of our roadmap).',
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl h-[400px]"
              >
                <img 
                  src={`${feature.image}&w=800&q=60`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={feature.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-black" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-['Orbitron'] text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Builders Program Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-full mb-6">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-yellow-400 font-semibold">Join the Movement</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
              Builders Program
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose your pathway to shape the future of Web3 education in Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: 'Student Path',
                description: 'Learn, build, and own your educational journey through Web3.',
                color: 'from-blue-500 to-cyan-500',
                // link: '/contact',
                image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop', // University students collaborating
              },
              {
                icon: TrendingUp,
                title: 'Become an Entrepreneur',
                description: 'Launch and scale Web3 education ventures with us.',
                color: 'from-emerald-500 to-teal-600',
                // link: 'https://builders.holydigits101.com',
                external: true,
                featured: true,
                image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop', // Modern office/entrepreneurship vibe
              },
              {
                icon: Rocket,
                title: 'Holydigits101 Online Bootcamp',
                description: 'Intensive digital skills training to prepare you for the global Web3 economy.',
                color: 'from-pink-500 to-rose-500',
                // link: '/contact',
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop', // High quality bootcamp/tech learning image
              },
            ].map((pathway, index) => (
              <motion.a
                key={index}
                href={pathway.link}
                target={pathway.external ? '_blank' : '_self'}
                rel={pathway.external ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative block h-[450px] overflow-hidden rounded-3xl ${pathway.featured ? 'md:col-span-1' : ''}`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img src={`${pathway.image}&w=800&q=60`} alt={pathway.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                </div>

                {pathway.featured && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full animate-pulse">
                      FEATURED
                    </span>
                  </div>
                )}
                
                <div className={`relative h-full p-8 border-2 flex flex-col justify-end ${pathway.featured ? 'border-yellow-500/50' : 'border-white/10'} rounded-3xl hover:border-yellow-500 transition-all duration-300`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${pathway.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    <pathway.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold font-['Orbitron'] text-white mb-3">
                    {pathway.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    {pathway.description}
                  </p>
                  {/* <div className="flex items-center text-yellow-400 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Apply Now</span>
                    <ArrowRight className="ml-2" size={20} />
                  </div> */}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-white mb-6">
              Stay in the Loop
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Subscribe to our newsletter for the latest crypto news and exclusive course offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
