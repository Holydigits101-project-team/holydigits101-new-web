import { motion } from 'framer-motion';
import { Users, Globe, Award, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ImpactHub() {
  const impacts = [
    {
      title: 'Students Empowered',
      count: '2,000+',
      desc: 'University students trained in Web3 and digital ownership.',
      icon: Users,
    },
    {
      title: 'Global Reach',
      count: '10+',
      desc: 'Countries represented in our decentralized ecosystem.',
      icon: Globe,
    },
    {
      title: 'Certificates Issued',
      count: '500+',
      desc: 'NFT-based credentials for verifiable skill mastery.',
      icon: Award,
    },
    {
      title: 'Community Projects',
      count: '15+',
      desc: 'Live Web3 solutions built by our bootcamp graduates.',
      icon: Heart,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1529070532901-d00787e91d5a?q=80&w=2070&auto=format&fit=crop&q=40" 
            className="w-full h-full object-cover opacity-30"
            alt="Impact Hub"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-['Orbitron'] text-white mb-6">
              Impact <span className="text-yellow-400">Hub</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tracking our progress in transforming education and empowering African builders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center hover:border-yellow-400/50 transition-all"
              >
                <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-yellow-400" size={32} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{item.count}</h3>
                <h4 className="text-lg font-bold font-['Orbitron'] text-yellow-400 mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold font-['Orbitron'] text-white text-center mb-12">Latest Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 {
                   name: "University of Abuja Pilot",
                   text: "Our first major campus rollout impacting 2,000+ students with foundational Web3 skills.",
                   img: "https://images.unsplash.com/photo-1523050335102-c325090ea232?q=80&w=2070&auto=format&fit=crop&q=40"
                 },
                 {
                   name: "Builder Ecosystem Launch",
                   text: "Connecting local talent to global projects through Mprofy DAO framework.",
                   img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&q=40"
                 }
               ].map((story, i) => (
                 <div key={i} className="group relative h-80 overflow-hidden rounded-2xl">
                    <img src={story.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={story.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{story.name}</h3>
                      <p className="text-gray-300 text-sm">{story.text}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
