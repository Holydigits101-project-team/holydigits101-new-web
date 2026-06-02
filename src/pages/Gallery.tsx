import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Gallery() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-['Orbitron'] text-white mb-6">
              Gallery
            </h1>
            <p className="text-xl text-gray-400">
              Explore our journey through images
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-2xl hover:border-yellow-500/50 transition-all backdrop-blur-sm"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Gallery Item {item}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
