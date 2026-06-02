import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FlagshipProduct() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 animate-pulse"
            alt="Blockchain Technology"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-['Orbitron'] mb-6 text-white">
              Mprofy <span className="text-yellow-400">DAO</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              The flagship decentralized learning ecosystem empowering the next generation of African builders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {[
              { icon: Rocket, title: 'Build', desc: 'Transform ideas into Web3 reality' },
              { icon: Star, title: 'Earn', desc: 'Get rewarded for your learning journey' },
              { icon: Shield, title: 'Own', desc: 'True digital ownership of your credentials' },
              { icon: Zap, title: 'Scale', desc: 'Connect to global tech opportunities' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-yellow-400/50 transition-all"
              >
                <item.icon className="text-yellow-400 mb-4 mx-auto" size={40} />
                <h3 className="text-xl font-bold font-['Orbitron'] text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
