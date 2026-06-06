import { useState, useEffect } from 'react';
import { Search, Upload, Award, ChevronRight, Filter, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ImpactHub = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 'x-spaces',
      title: 'X Spaces',
      description: 'Live discussions and thought leadership',
      image: '/images/x-spaces.jpg',
      height: 'tall'
    },
    {
      id: 'global-outreach',
      title: 'Global Outreach',
      description: 'Transforming education across regions',
      image: '/images/outreach-kenya.jpg',
      height: 'medium'
    },
    {
      id: 'school-visits',
      title: 'School Visits',
      description: 'Connecting with students and communities',
      image: '/images/school-visits.jpg',
      height: 'tall'
    },
    {
      id: 'teacher-training',
      title: 'Teacher Training',
      description: 'Empowering educators for excellence',
      image: '/images/teacher-training.jpg',
      height: 'short'
    },
    {
      id: 'vlogs',
      title: 'Vlogs & Videos',
      description: 'Stories captured on camera',
      image: '/images/vlogs.jpg',
      height: 'medium'
    },
    {
      id: 'photo-gallery',
      title: 'Photo Stories',
      description: 'Moments that inspire change',
      image: '/images/photo-gallery.jpg',
      height: 'tall'
    },
    {
      id: 'google-meet',
      title: 'Recorded Sessions',
      description: 'Virtual meetings and collaborations',
      image: '/images/google-meet.jpg',
      height: 'short'
    },
    {
      id: 'digital-outreach',
      title: 'Digital Outreach',
      description: 'Digital tools and online empowerment',
      image: '/images/outreach-ministry.jpg',
      height: 'medium'
    }
  ];

  const latestPosts = [
    {
      id: 1,
      title: 'University of Abuja Web3 Digital Outreach',
      author: 'Pendar Emmanuel',
      description: '1,000+ students trained and exposed to Web3 fundamentals',
      date: 'May 2025',
      location: 'Abuja, Nigeria',
      stats: '1,000+ Students',
      tags: ['Student Outreach', 'Youth Empowerment', 'Web3 Education'],
      image: '/images/school-visits.jpg',
      height: 'tall'
    },
    {
      id: 2,
      title: 'Lagos Gitex Meet & Greet',
      author: 'Grace Okonkwo',
      description: 'High-energy networking session introducing Web3 opportunities to young innovators',
      date: 'March 2025',
      location: 'Lagos, Nigeria',
      tags: ['Community Impact', 'Digital Literacy'],
      image: '/images/photo-gallery.jpg',
      height: 'medium'
    },
    {
      id: 3,
      title: 'Delta State Partnership',
      author: 'David Mwangi',
      date: 'April 2025',
      location: 'Delta State, Nigeria',
      stats: '15 Schools',
      tags: ['Partnership Success', 'STEM Development'],
      image: '/images/teacher-training.jpg',
      height: 'short'
    },
    {
      id: 4,
      title: 'Orphanage Digital Literacy Workshop',
      author: 'Sarah Kamau',
      date: 'June 2025',
      location: 'Abuja, Nigeria',
      tags: ['Community Impact', 'Youth Empowerment'],
      image: '/images/outreach-ministry.jpg',
      height: 'medium'
    },
    {
      id: 5,
      title: 'Youth Web3 Bootcamp',
      author: 'Pendar Emmanuel',
      date: 'February 2025',
      location: 'Lagos, Nigeria',
      tags: ['Web3 Education', 'STEM Development', 'Digital Literacy'],
      image: '/images/vlogs.jpg',
      height: 'tall'
    }
  ];

  const getHeightClass = (height: string) => {
    switch (height) {
      case 'short': return 'h-64';
      case 'medium': return 'h-80';
      case 'tall': return 'h-96';
      default: return 'h-80';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Floating Gold Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FFD700]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: 'blur(1px)',
              boxShadow: '0 0 10px #FFD700',
              animation: `float ${Math.random() * 20 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Radial Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-[#FFD700]/5 via-transparent to-transparent"></div>
      </div>

      {/* Premium Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="mt-12 relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-impact.jpg" 
            alt="Executive Impact" 
            className="w-full h-full object-cover opacity-30"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-[#0A0A0A]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FFD700]/5"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 animate-fade-in">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFC700]/10 border border-[#FFD700]/40 rounded-full text-[#FFD700] font-semibold text-sm mb-4 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
              Executive Impact Hub
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight" style={{
            textShadow: '0 0 60px rgba(255, 215, 0, 0.6), 0 0 120px rgba(255, 215, 0, 0.3)',
            animation: 'glow 3s ease-in-out infinite'
          }}>
            Stories That <span className="bg-gradient-to-r from-[#FFD700] via-[#FFC700] to-[#FFD700] bg-clip-text text-transparent" style={{
              textShadow: '0 0 40px rgba(255, 215, 0, 0.8)',
              animation: 'glow 2s ease-in-out infinite'
            }}>Matter</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
            Executive Board Progress • School Visits • X Spaces • Outreach • Vlogs
          </p>
          
          {/* Gold Divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            <Sparkles className="w-4 h-4 text-[#FFD700] mx-4 animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </div>

          <button className="group relative bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black px-10 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <Upload className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Upload Your Impact</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
          <p className="mt-4 text-sm text-[#FFD700] flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 animate-pulse" />
            <span>Executive Members Only</span>
          </p>
        </div>
      </section>

      {/* Gradient Transition */}
      <div className="h-20 bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A] relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="bg-[#0A0A0A] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Categories Section */}
              <div className="mb-20">
                <div className="mb-12 text-center">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-3" style={{
                    textShadow: '0 0 50px rgba(255, 215, 0, 0.4), 0 0 100px rgba(255, 215, 0, 0.2)',
                    animation: 'glow 2.5s ease-in-out infinite'
                  }}>
                    Explore Our Impact
                  </h2>
                  <p className="text-gray-400 text-lg mb-6">Discover stories from across the globe</p>
                  
                  {/* Decorative Line */}
                  <div className="flex items-center justify-center">
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"></div>
                  </div>
                </div>

                {/* Premium Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="break-inside-avoid mb-6 group"
                      onMouseEnter={() => setHoveredCard(category.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2">
                        {/* Card Glow Effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-[#FFD700]/50 via-[#FFC700]/30 to-[#FFD700]/50 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${
                          hoveredCard === category.id ? 'opacity-100' : ''
                        }`}></div>
                        
                        {/* Card Container */}
                        <div className="relative bg-gradient-to-br from-[#1a1a1a]/90 to-black/90 backdrop-blur-xl border border-[#FFD700]/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(255,215,0,0.2)] transition-all duration-500">
                          {/* Gold Accent Line */}
                          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent transform origin-left transition-transform duration-500 ${
                            hoveredCard === category.id ? 'scale-x-100' : 'scale-x-0'
                          }`}></div>

                          <div className={`relative ${getHeightClass(category.height)} overflow-hidden`}>
                            <img
                              src={category.image}
                              alt={category.title}
                              className={`w-full h-full object-cover transition-all duration-700 ${
                                hoveredCard === category.id ? 'scale-110 brightness-60' : 'scale-100 brightness-40'
                              }`}
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                            <div className={`absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${
                              hoveredCard === category.id ? 'opacity-100' : ''
                            }`}></div>
                            
                            <div className="absolute inset-0 flex flex-col justify-end p-5">
                              <div className={`transform transition-all duration-500 ${
                                hoveredCard === category.id ? 'translate-y-[-8px]' : ''
                              }`}>
                                <h3 className="text-xl font-black text-white mb-2 leading-tight" style={{
                                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.3)'
                                }}>
                                  {category.title}
                                </h3>
                                <p className="text-gray-300 text-sm mb-3 font-medium" style={{
                                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                                }}>
                                  {category.description}
                                </p>
                              </div>
                              <div className={`flex items-center text-[#FFD700] font-bold transition-all duration-300 ${
                                hoveredCard === category.id ? 'opacity-100 translate-x-2' : 'opacity-80'
                              }`}>
                                <span>Explore</span>
                                <ChevronRight className={`w-5 h-5 ml-1 transition-transform duration-300 ${
                                  hoveredCard === category.id ? 'translate-x-1' : ''
                                }`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Divider */}
              <div className="mb-20 flex items-center justify-center">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
                <div className="px-6">
                  <Sparkles className="w-6 h-6 text-[#FFD700] animate-pulse" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
              </div>

              {/* Latest Impact Section */}
              <div className="mb-20">
                <div className="mb-12 text-center">
                  <h2 className="text-5xl font-black text-white mb-3" style={{
                    textShadow: '0 0 60px rgba(255, 215, 0, 0.5), 0 0 120px rgba(255, 215, 0, 0.3)',
                    animation: 'glow 2s ease-in-out infinite'
                  }}>
                    Latest Impact
                  </h2>
                  <p className="text-[#FFD700] text-xl font-bold mb-6" style={{
                    textShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
                    animation: 'glow 1.8s ease-in-out infinite'
                  }}>
                    Real stories, real change across the globe
                  </p>
                  
                  {/* Decorative Line */}
                  <div className="flex items-center justify-center">
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"></div>
                  </div>
                </div>

                {/* Impact Posts Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {latestPosts.map((post) => (
                    <div
                      key={post.id}
                      className="break-inside-avoid mb-6 group"
                      onMouseEnter={() => setHoveredCard(`post-${post.id}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2">
                        {/* Card Glow Effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-[#FFD700]/60 via-[#FFC700]/40 to-[#FFD700]/60 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${
                          hoveredCard === `post-${post.id}` ? 'opacity-100' : ''
                        }`}></div>
                        
                        {/* Card Container */}
                        <div className="relative bg-gradient-to-br from-[#1a1a1a]/95 to-black/95 backdrop-blur-xl border border-[#FFD700]/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_60px_rgba(255,215,0,0.3)] transition-all duration-500">
                          {/* Gold Corner Accents */}
                          <div className="absolute top-0 left-0 w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#FFD700] to-transparent"></div>
                          </div>
                          <div className="absolute bottom-0 right-0 w-16 h-16">
                            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#FFD700] to-transparent"></div>
                            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-[#FFD700] to-transparent"></div>
                          </div>

                          <div className={`relative ${getHeightClass(post.height)} overflow-hidden`}>
                            <img
                              src={post.image}
                              alt={post.title}
                              className={`w-full h-full object-cover transition-all duration-700 ${
                                hoveredCard === `post-${post.id}` ? 'scale-110 brightness-60' : 'scale-100 brightness-40'
                              }`}
                            />
                            
                            {/* Layered Gradients */}
                            <div className="absolute inset-0" style={{
                              background: 'linear-gradient(to top, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.92) 30%, rgba(10, 10, 10, 0.6) 50%, transparent 100%)'
                            }}></div>
                            <div className={`absolute inset-0 bg-gradient-to-t from-[#FFD700]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${
                              hoveredCard === `post-${post.id}` ? 'opacity-100' : ''
                            }`}></div>
                            
                            <div className="absolute inset-0 flex flex-col justify-end p-4">
                              <div className={`transform transition-all duration-500 ${
                                hoveredCard === `post-${post.id}` ? 'translate-y-[-6px]' : ''
                              }`}>
                                {/* Title */}
                                <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight" style={{
                                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.3)'
                                }}>
                                  {post.title}
                                </h3>
                                
                                {/* Description */}
                                {post.description && (
                                  <p className="text-gray-300 text-xs md:text-sm mb-2 leading-relaxed font-medium" style={{
                                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                                  }}>
                                    {post.description}
                                  </p>
                                )}
                                
                                {/* Stats Badge */}
                                {post.stats && (
                                  <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg mb-2 transition-all duration-300 bg-gradient-to-r from-[#FFD700] to-[#FFC700] ${
                                    hoveredCard === `post-${post.id}` ? 'shadow-[0_0_25px_rgba(255,215,0,0.6)] scale-105' : 'shadow-md'
                                  }`}>
                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-black font-black text-sm tracking-wide">{post.stats}</span>
                                  </div>
                                )}
                                
                                {/* Date & Location */}
                                <div className="flex items-center flex-wrap gap-2 mb-2 text-[#FFD700] text-xs font-bold" style={{
                                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                                }}>
                                  <div className="flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{post.date}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{post.location}</span>
                                  </div>
                                </div>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                  {post.tags.map((tag) => (
                                    <span key={tag} className={`px-2 py-1 backdrop-blur-md rounded-md text-white text-xs font-semibold border transition-all duration-300 ${
                                      hoveredCard === `post-${post.id}` 
                                        ? 'bg-[#FFD700]/40 border-[#FFD700]/70 shadow-lg shadow-[#FFD700]/20' 
                                        : 'bg-white/10 border-white/30 shadow-md'
                                    }`} style={{
                                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                                    }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Sidebar */}
            <aside className="lg:w-80 space-y-6">
              {/* Executive Access Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] via-[#FFC700] to-[#FFD700] rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-[#FFD700]/20 to-[#FFC700]/10 rounded-2xl p-6 border border-[#FFD700]/40 backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="w-12 h-12 text-[#FFD700] animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                  </div>
                  <h3 className="text-white text-xl font-bold text-center mb-2">Executive Access</h3>
                  <p className="text-gray-300 text-sm text-center mb-4">Share your impact stories</p>
                  <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black py-3 rounded-xl font-bold hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    <Upload className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Upload Progress</span>
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-[#FFD700]/20 shadow-xl">
                <h3 className="text-white text-lg font-bold mb-4">Search & Filter</h3>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-full pl-10 pr-4 py-3 bg-black/60 border border-[#FFD700]/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                </div>
                <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-[#FFD700]/40 text-[#FFD700] rounded-xl font-bold hover:bg-[#FFD700]/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300">
                  <Filter className="w-5 h-5" />
                  <span>Advanced Filters</span>
                </button>
              </div>

              {/* X Spaces & Impact Stats */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] via-[#FFC700] to-[#FFD700] rounded-2xl opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-2xl p-6 text-black hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2 group-hover:scale-105 transition-transform duration-300">X Spaces & Impact</h3>
                    <p className="text-black/70 text-sm mb-4 font-semibold">Growing our reach together</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-black/10 rounded-xl backdrop-blur-sm group-hover:bg-black/20 transition-all duration-300">
                        <span className="font-bold">X Spaces Hosted</span>
                        <span className="text-3xl font-black">38</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/10 rounded-xl backdrop-blur-sm group-hover:bg-black/20 transition-all duration-300">
                        <span className="font-bold">Teachers Trained</span>
                        <span className="text-3xl font-black">28</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/10 rounded-xl backdrop-blur-sm group-hover:bg-black/20 transition-all duration-300">
                        <span className="font-bold">Students Reached</span>
                        <span className="text-3xl font-black">2.4K+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ImpactHub;
