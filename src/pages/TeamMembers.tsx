import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useMemo, useState } from "react";

type TeamCategory = "Founders" | "Departmental Heads";

type SocialLink = {
  label: "X" | "LinkedIn";
  url: string;
  display: string;
};

type TeamMember = {
  name: string;
  role: string;
  category: TeamCategory;
  summary: string;
  fullBio: string;
  social?: SocialLink;
  image: string;
  imageClass: string;
};

type Advisor = {
  name: string;
  focus: string;
  bio: string;
  image: string;
  linkedin: string;
};

const heroImage =
  "https://images.pexels.com/photos/34211750/pexels-photo-34211750.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1920";

const stats = [
  { value: "5K+", label: "Learners Reached" },
  { value: "5+", label: "Countries Impacted" },
  { value: "13", label: "Leadership Team" },
  { value: "2", label: "Years of Impact" },
];

const particles = [
  { top: "12%", left: "8%", size: "6px", delay: "0s", duration: "12s" },
  { top: "22%", left: "82%", size: "8px", delay: "-5s", duration: "15s" },
  { top: "38%", left: "16%", size: "5px", delay: "-8s", duration: "16s" },
  { top: "55%", left: "88%", size: "7px", delay: "-2s", duration: "13s" },
  { top: "70%", left: "12%", size: "9px", delay: "-9s", duration: "17s" },
  { top: "84%", left: "62%", size: "5px", delay: "-4s", duration: "14s" },
  { top: "16%", left: "48%", size: "4px", delay: "-7s", duration: "11s" },
  { top: "64%", left: "42%", size: "6px", delay: "-3s", duration: "18s" },
];

// Centralized team data keeps the page ready for backend image uploads later.
const teamMembers: TeamMember[] = [
  {
    name: "Pendar Emmanuel",
    role: "Founder",
    category: "Founders",
    summary:
      "Digital entrepreneur and educator advancing Web3, blockchain innovation, and decentralized education through HolyDigits101 Global.",
    fullBio:
      "Pendar is a digital entrepreneur, educator, and founder of HolyDigits101 Global, dedicated to advancing Web3, blockchain innovation, and decentralized education across Africa. Through his work, he empowers individuals with the skills, mindset, and opportunities needed to succeed in the digital economy. As Africa Network Operations & Communications Lead at XINI8, he helps drive the growth of decentralized media infrastructure and blockchain adoption across the continent. He is also the author of the upcoming book The Dark Truth of Web3 and the Misinform Illusion, which explores blockchain, AI, digital freedom, and misinformation in the modern internet era.",
    social: {
      label: "X",
      url: "https://x.com/emmyholy_?s=21",
      display: "@emmyholy_",
    },
    image:
      "https://storage.lingoql.com/holydigits101/pendar.jpg",
    imageClass: "h-[430px]",
  },
  {
    name: "Dorcas Olaoye",
    role: "Co-Founder / Executive Director",
    category: "Founders",
    summary:
      "Educator, product manager, and community builder designing programs that prepare young people for the digital age.",
    fullBio:
      "Dorcas Olaoye is an educator, product manager, community builder, and Co-Founder/Executive Director of HOLYDIGITS101 Global. She is committed to empowering young people through education, technology, and digital innovation. Through her leadership at HOLYDIGITS101 Global, she develops programs and initiatives that help students, educators, and young professionals gain the skills needed to succeed in the digital age. With expertise in education, product management, project coordination, communications, and digital media, she focuses on building impactful learning communities that foster innovation, leadership, and personal growth.",
    social: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/dorcas-olaoye-606a41254?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      display: "@horladoky1904",
    },
    image:
      "https://storage.lingoql.com/holydigits101/cofounder.PNG",
    imageClass: "h-[485px]",
  },
  {
    name: "Edu Confidence Edwin",
    role: "CEO",
    category: "Founders",
    summary:
      "Leads executive coordination, organizational growth, and operational alignment for HolyDigits101 Global.",
    fullBio:
      "Edu Confidence Edwin serves as CEO of HolyDigits101 Global, supporting the organization through executive leadership, growth coordination, and operational direction. His work helps align people, programs, reporting, and strategic delivery so the movement can scale with clarity, accountability, and global impact.",
    image:
      "https://storage.lingoql.com/holydigits101/confidence.PNG",
    imageClass: "h-[410px]",
  },
  {
    name: "Akinlolu Blessing",
    role: "HOD, Education & Curriculum",
    category: "Departmental Heads",
    summary:
      "Shapes learner-centered curriculum for digital literacy, Web3 understanding, and practical problem-solving.",
    fullBio:
      "Akinlolu Blessing leads Education & Curriculum with a focus on accessible learning design, educator support, and practical digital skills. The work centers on helping learners understand technology with confidence while connecting lessons to real opportunities in a changing global economy.",
    image:
      "https://images.pexels.com/photos/5905753/pexels-photo-5905753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    imageClass: "h-[395px]",
  },
  {
    name: "Odey Divine",
    role: "HOD, Research & Development",
    category: "Departmental Heads",
    summary:
      "Turns research, field insight, and emerging technology trends into stronger learning experiences.",
    fullBio:
      "Odey Divine leads Research & Development by studying educational gaps, testing new ideas, and translating insight into programs that are useful, ethical, and scalable. This role helps HolyDigits101 stay responsive as Web3, AI, and digital education evolve.",
    image:
      "https://images.pexels.com/photos/5816287/pexels-photo-5816287.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    imageClass: "h-[350px]",
  },
  {
    name: "Prosper James",
    role: "Programs Officer / Community Engagement",
    category: "Departmental Heads",
    summary:
      "Connects programs with real communities so learning feels practical, human, and locally meaningful.",
    fullBio:
      "Prosper James supports Programs and Community Engagement by coordinating outreach, learner participation, and community relationships. This work keeps the mission grounded in real needs while helping people access the skills, mindset, and support required for digital opportunity.",
    image:
      "https://images.pexels.com/photos/7870288/pexels-photo-7870288.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    imageClass: "h-[455px]",
  },
  {
    name: "Olutimehin Toluwani Honour",
    role: "HOD, Media & Communications",
    category: "Departmental Heads",
    summary:
      "Leads storytelling, communications, and digital presence with clarity, dignity, and purpose.",
    fullBio:
      "Olutimehin Toluwani Honour leads Media & Communications, shaping how the HolyDigits101 story is shared across platforms. The role focuses on clear messaging, community trust, campaign coordination, and media that reflects the organization's values of education, access, innovation, and service.",
    image:
      "https://images.pexels.com/photos/16306778/pexels-photo-16306778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    imageClass: "h-[405px]",
  },
  {
    name: "Jimin",
    role: "Technical / IT Lead",
    category: "Departmental Heads",
    summary:
      "Supports the technical systems, digital tools, and infrastructure behind decentralized learning access.",
    fullBio:
      "Jimin supports Technical / IT operations for HolyDigits101, helping the organization maintain reliable systems, digital tools, and technical workflows. This role strengthens the foundation needed to deliver Web3 education, community programs, and future platform experiences at scale.",
    image:
      "https://images.pexels.com/photos/8091254/pexels-photo-8091254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    imageClass: "h-[470px]",
  },
  {
    name: "Edu Confidence Edwin",
    role: "Support Units, M&E / Administration & Reporting",
    category: "Departmental Heads",
    summary:
      "Oversees monitoring, evaluation, administration, and reporting systems that keep the mission accountable.",
    fullBio:
      "Edu Confidence Edwin also leads the Support Units for Monitoring & Evaluation (M&E), Administration, and Reporting. This role strengthens internal accountability, program documentation, operational follow-through, and the reporting structure needed to measure impact across HolyDigits101 initiatives.",
    image:
      "https://images.pexels.com/photos/28426638/pexels-photo-28426638.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    imageClass: "h-[385px]",
  },
];

const advisors: Advisor[] = [
  {
    name: "Alex Grapov",
    focus: "Advisory Board",
    bio: "Provides strategic counsel for growth, global positioning, and responsible digital ecosystem building.",
    image:
      "https://storage.lingoql.com/holydigits101/grapov.jpg",
    linkedin:
      "https://www.linkedin.com/in/alex-grapov-com?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Virginia Scmidt",
    focus: "Advisory Board",
    bio: "Advises on education, impact partnerships, and sustainable pathways for digital learning communities.",
    image:
      "https://storage.lingoql.com/holydigits101/virginia.jpg",
    linkedin:
      "https://www.linkedin.com/in/virginia-schmidt-397684b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Israel O. Pender",
    focus: "Advisory Board",
    bio: "Supports leadership wisdom, organizational trust, and long-term community-centered decision making.",
    image:
      "https://storage.lingoql.com/holydigits101/israel.JPG",
    linkedin: "https://www.linkedin.com/in/israel-pender-0b98a389",
  },
];

const categories = ["All Leaders", "Founders", "Departmental Heads"] as const;

function XIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.55l-5.13-6.7L5.2 22H1.94l7.6-8.69L1.5 2h6.72l4.64 6.14L18.244 2Zm-1.14 17.91h1.8L7.24 4H5.31l11.79 15.91Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 8h4.2v15H.4V8Zm7.3 0h4.02v2.05h.06c.56-1.06 1.94-2.18 3.99-2.18 4.27 0 5.06 2.81 5.06 6.47V23h-4.2v-7.68c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V23H7.7V8Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TeamMembers() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All Leaders");
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});

  const visibleMembers = useMemo(() => {
    if (activeCategory === "All Leaders") return teamMembers;
    return teamMembers.filter((member) => member.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory]);

  const toggleBio = (name: string) => {
    setExpandedBios((current) => ({ ...current, [name]: !current[name] }));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] font-sans text-white selection:bg-[#F4B400] selection:text-[#050505]">
      <style>{`
        @keyframes heroDrift {
          0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
          50% { transform: scale(1.1) translate3d(-1.25%, 1%, 0); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.32; }
          50% { transform: translate3d(20px, -34px, 0); opacity: 0.9; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244, 180, 0, 0.34), 0 24px 70px rgba(212, 160, 23, 0.24); }
          50% { box-shadow: 0 0 0 16px rgba(244, 180, 0, 0), 0 28px 90px rgba(244, 180, 0, 0.34); }
        }

        .motion-drift { animation: heroDrift 18s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(110deg, #ffffff 0%, #F4B400 28%, #D4A017 54%, #fff3c4 78%, #ffffff 100%);
          background-size: 230% 230%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 7s ease-in-out infinite;
        }
        .particle { animation: particleFloat var(--duration) ease-in-out infinite; animation-delay: var(--delay); }
        .pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        .reveal { opacity: 0; transform: translateY(34px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); transition-delay: var(--delay, 0ms); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        .tech-grid { background-image: linear-gradient(rgba(244,180,0,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.075) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 68%); }
        .gold-ring { border: 1px solid rgba(244,180,0,0.2); box-shadow: inset 0 0 44px rgba(244,180,0,0.06), 0 0 80px rgba(212,160,23,0.12); }

        @media (prefers-reduced-motion: reduce) {
          .motion-drift, .gradient-text, .particle, .pulse-glow { animation: none !important; }
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <section id="top" className="relative flex min-h-screen items-center bg-[#050505] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Students and educators collaborating in a warm classroom setting"
            className="motion-drift h-full w-full object-cover opacity-46"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.98)_0%,rgba(17,17,17,0.9)_48%,rgba(5,5,5,0.62)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(244,180,0,0.24),transparent_34%),radial-gradient(circle_at_18%_74%,rgba(212,160,23,0.18),transparent_30%)]" />
          <div className="tech-grid absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/72 to-transparent" />
        </div>

        <div className="gold-ring pointer-events-none absolute -right-36 top-28 z-10 h-[28rem] w-[28rem] rounded-full opacity-70" />
        <div className="gold-ring pointer-events-none absolute -bottom-28 left-[-10rem] z-10 h-[22rem] w-[22rem] rounded-full opacity-50" />

        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {particles.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}`}
              className="particle absolute rounded-full bg-[#F4B400] shadow-[0_0_28px_rgba(244,180,0,0.95)]"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
                "--delay": particle.delay,
                "--duration": particle.duration,
              } as React.CSSProperties}
            >
              <span className="sr-only">Floating network particle {index + 1}</span>
            </span>
          ))}
        </div>

        <Navbar />

        <div className="mt-12 relative z-20 mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
          <div className="max-w-4xl pt-16">
            <p className="reveal mb-6 text-sm font-bold uppercase tracking-[0.42em] text-[#F4B400]" style={{ "--delay": "40ms" } as React.CSSProperties}>
              HolyDigits 101 Global
            </p>
            <h1 className="reveal text-6xl font-black leading-[0.92] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl" style={{ "--delay": "120ms" } as React.CSSProperties}>
              Our <span className="gradient-text">Leadership</span>
            </h1>
            <p className="reveal mt-7 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl" style={{ "--delay": "220ms" } as React.CSSProperties}>
              Meet the passionate minds driving <span className="font-semibold text-[#fff3c4]">Web3 decentralized digital education</span> and community transformation across Africa. Every leader here is a steward of purpose, equity, and innovation.
            </p>
            <p className="reveal mt-5 max-w-2xl text-base leading-7 text-white/58" style={{ "--delay": "300ms" } as React.CSSProperties}>
              The foundation starts in Africa and grows toward a global future because the educational system is broken in many parts of the world.
            </p>
            <div className="reveal mt-10" style={{ "--delay": "380ms" } as React.CSSProperties}>
              <a
                href="#join"
                className="pulse-glow inline-flex items-center gap-3 rounded-full bg-[#F4B400] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#D4A017]"
              >
                Join Our Movement
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-[#F4B400]/12 bg-[#111111] px-6 py-12 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,180,0,0.16),transparent_44%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="reveal rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#F4B400]/50 hover:shadow-[0_28px_90px_rgba(244,180,0,0.18)]"
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <p className="gradient-text text-4xl font-black tracking-[-0.055em] sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/58 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="leaders" className="relative bg-[#050505] px-6 py-24 text-white sm:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(244,180,0,0.18),transparent_32%),radial-gradient(circle_at_82%_42%,rgba(212,160,23,0.2),transparent_34%),linear-gradient(180deg,#050505_0%,#111111_52%,#050505_100%)]" />
        <div className="tech-grid absolute inset-0 opacity-80" />
        <div className="gold-ring pointer-events-none absolute -left-40 top-28 h-[28rem] w-[28rem] rounded-full opacity-35" />
        <div className="gold-ring pointer-events-none absolute -right-36 bottom-36 h-[24rem] w-[24rem] rounded-full opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="reveal mb-4 text-sm font-bold uppercase tracking-[0.34em] text-[#F4B400]">Faces Behind the Mission</p>
              <h2 className="reveal text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl" style={{ "--delay": "90ms" } as React.CSSProperties}>
                Builders of a <span className="gradient-text">decentralized education</span> movement.
              </h2>
              <p className="reveal mt-5 text-lg leading-8 text-white/62" style={{ "--delay": "160ms" } as React.CSSProperties}>
                A focused leadership circle guiding programs, research, curriculum, technology, and community trust from Africa to the world.
              </p>
            </div>
            <div className="reveal flex flex-wrap gap-3" aria-label="Filter leaders by category" style={{ "--delay": "220ms" } as React.CSSProperties}>
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-xl transition ${
                      isActive
                        ? "border-[#F4B400] bg-[#F4B400] text-[#050505] shadow-[0_0_44px_rgba(244,180,0,0.34)]"
                        : "border-white/10 bg-white/[0.055] text-white/68 hover:border-[#F4B400]/65 hover:bg-white/[0.09] hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {visibleMembers.map((member, index) => {
              const bioKey = `${member.name}-${member.role}`;
              const isExpanded = expandedBios[bioKey];

              return (
                <article
                  key={bioKey}
                  className="reveal group mb-6 break-inside-avoid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.07] shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#F4B400]/70 hover:bg-white/[0.095] hover:shadow-[0_32px_110px_rgba(244,180,0,0.22)]"
                  style={{ "--delay": `${Math.min(index * 70, 520)}ms` } as React.CSSProperties}
                >
                  <div className={`relative ${member.imageClass} overflow-hidden bg-[#111111]`}>
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      className="h-full w-full object-cover opacity-92 transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-84" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_50%_100%,rgba(244,180,0,0.32),transparent_70%)]" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="text-2xl font-extrabold tracking-[-0.04em] text-white">{member.name}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-[#F4B400]">{member.role}</p>
                    <p className="mt-4 text-[15px] leading-7 text-white/66">{isExpanded ? member.fullBio : member.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleBio(bioKey)}
                        className="rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-bold text-[#fff3c4] transition hover:border-[#F4B400] hover:bg-[#F4B400] hover:text-[#050505] hover:shadow-[0_0_30px_rgba(244,180,0,0.3)]"
                      >
                        {isExpanded ? "Show less" : "Read full bio"}
                      </button>
                      {member.social ? (
                        <a
                          href={member.social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#fff3c4] transition hover:text-[#F4B400]"
                          aria-label={`Visit ${member.name} on ${member.social.label}`}
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F4B400]/14 text-[#fff3c4] transition group-hover:bg-[#F4B400]/26">
                            <XIcon />
                          </span>
                          {member.social.display}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-[#111111] px-6 py-24 text-white sm:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(244,180,0,0.18),transparent_34%),radial-gradient(circle_at_16%_88%,rgba(212,160,23,0.12),transparent_28%)]" />
        <div className="gold-ring pointer-events-none absolute -right-32 top-20 h-[24rem] w-[24rem] rounded-full opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="reveal mb-4 text-sm font-bold uppercase tracking-[0.34em] text-[#F4B400]">Advisory Board</p>
            <h2 className="reveal text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
              Global counsel for <span className="gradient-text">lasting impact.</span>
            </h2>
            <p className="reveal mt-5 text-lg leading-8 text-white/62" style={{ "--delay": "150ms" } as React.CSSProperties}>
              Advisors support governance, partnerships, digital inclusion, and responsible innovation as HolyDigits101 scales beyond its foundation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {advisors.map((advisor, index) => (
              <article
                key={advisor.name}
                className="reveal group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.07] shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#F4B400]/70 hover:bg-white/[0.095] hover:shadow-[0_32px_110px_rgba(244,180,0,0.22)]"
                style={{ "--delay": `${index * 110}ms` } as React.CSSProperties}
              >
                <div className="h-80 overflow-hidden bg-[#111111] sm:h-96">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className={`h-full w-full object-contain opacity-92 transition duration-700 group-hover:scale-105`}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-2xl font-extrabold tracking-[-0.04em] text-white">{advisor.name}</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-[#F4B400]">{advisor.focus}</p>
                  <p className="mt-5 text-[15px] leading-7 text-white/66">{advisor.bio}</p>
                  <a
                    href={advisor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-bold text-[#fff3c4] transition hover:border-[#F4B400] hover:bg-[#F4B400] hover:text-[#050505] hover:shadow-[0_0_30px_rgba(244,180,0,0.3)]"
                    aria-label={`Visit ${advisor.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                    LinkedIn Profile
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="relative bg-[#050505] px-6 py-24 text-white sm:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,180,0,0.22),transparent_36%)]" />
        <div className="gold-ring pointer-events-none absolute left-1/2 top-14 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-30" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="reveal mb-5 text-sm font-bold uppercase tracking-[0.34em] text-[#F4B400]">Lead With Us</p>
          <h2 className="reveal text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
            Want to be part of this <span className="gradient-text">movement?</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62" style={{ "--delay": "150ms" } as React.CSSProperties}>
            Join a global Web3 edtech movement building digital confidence, decentralized learning access, and practical opportunity for a better education future.
          </p>
          <div className="reveal mt-10 flex justify-center" style={{ "--delay": "230ms" } as React.CSSProperties}>
            <a
              href="mailto:hello@holydigits101.com?subject=Executive%20Member%20Application"
              className="pulse-glow inline-flex items-center gap-3 rounded-full bg-[#F4B400] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#D4A017]"
            >
              Apply to Join as Executive Member
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}