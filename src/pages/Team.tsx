import { useState, useEffect, useRef } from "react";
import { leaders } from "../data/leaders";
import LeaderCard from "../components/LeaderCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Tab = "all" | "executive" | "departmental" | "advisory";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const statItems = [
  { value: "200K+", label: "Learners Reached" },
  { value: "25+", label: "Countries Impacted" },
  { value: "13", label: "Leadership Team" },
  { value: "8", label: "Years of Impact" },
];

export default function LeadersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView(0.05);
  const { ref: ctaRef, inView: ctaInView } = useInView();

  // filtered is used for tab count display only — sections render by category

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All Leaders", count: leaders.length },
    {
      key: "executive",
      label: "Executive Board",
      count: leaders.filter((l) => l.category === "executive").length,
    },
    {
      key: "departmental",
      label: "Departmental Heads",
      count: leaders.filter((l) => l.category === "departmental").length,
    },
    {
      key: "advisory",
      label: "Advisory Board",
      count: leaders.filter((l) => l.category === "advisory").length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0] font-sans">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/leaders-hero.jpg"
            alt="HolyDigits101 Leadership Team"
            onLoad={() => setHeroLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Multi-layer overlay for richness */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/90 via-[#0B1F3A]/70 to-[#0B1F3A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />
          {/* Gold shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 via-transparent to-[#3B7B8C]/10" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-[#D4A017]/10 animate-[spin_30s_linear_infinite]" />
        <div className="absolute top-40 right-40 w-64 h-64 rounded-full border border-[#3B7B8C]/15 animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 rounded-full bg-[#D4A017]/5 blur-3xl" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pt-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#D4A017]" />
              <span className="text-[#D4A017] text-xs font-bold uppercase tracking-[0.3em]">
                HolyDigits101 · Leadership
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tight">
              Our
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-[#F0C040]">
                Leadership
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Meet the passionate minds driving digital education and community
              transformation across Africa. Every leader here is a steward of
              purpose, equity, and innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#join"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4A017] to-[#F0C040] text-[#0B1F3A] font-black text-base shadow-xl shadow-amber-400/30 hover:scale-105 hover:shadow-amber-400/50 transition-all duration-300"
              >
                Join Our Movement
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#leaders"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Meet the Team
                <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F6F0] to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="max-w-6xl mx-auto px-6 -mt-8 relative z-10 mb-20"
      >
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                statsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl font-black text-[#0B1F3A] mb-1">
                {stat.value}
              </div>
              <div className="text-[#D4A017] text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION HEADER
      ══════════════════════════════════════════════════════ */}
      <section id="leaders" className="max-w-7xl mx-auto px-6 mb-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A017]" />
            <span className="text-[#D4A017] text-xs font-bold uppercase tracking-[0.3em]">
              The Team
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A017]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1F3A] mb-4 leading-tight">
            Driven by Purpose,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-[#F0C040]">
              {" "}United by Vision
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Each member of our leadership team brings a unique combination of
            expertise, lived experience, and dedication to transforming digital
            education across the African continent.
          </p>
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-[#0B1F3A] text-white shadow-lg shadow-slate-300"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-[#D4A017]/50 hover:text-[#0B1F3A]"
              }`}
            >
              {tab.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? "bg-[#D4A017] text-[#0B1F3A]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EXECUTIVE BOARD (featured)
      ══════════════════════════════════════════════════════ */}
      {(activeTab === "all" || activeTab === "executive") && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          {activeTab === "all" && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-[#D4A017] to-[#F0C040] rounded-full" />
                <h3 className="text-2xl font-black text-[#0B1F3A]">
                  Executive Board
                </h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4A017]/30 to-transparent" />
            </div>
          )}
          <div
            ref={activeTab === "executive" ? gridRef : undefined}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {leaders
              .filter((l) => l.category === "executive")
              .map((leader, i) => (
                <div
                  key={leader.id}
                  className={`transition-all duration-700 ${
                    gridInView || activeTab !== "executive"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <LeaderCard leader={leader} featured />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          DEPARTMENTAL HEADS
      ══════════════════════════════════════════════════════ */}
      {(activeTab === "all" || activeTab === "departmental") && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          {activeTab === "all" && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-[#3B7B8C] to-[#5BA3B8] rounded-full" />
                <h3 className="text-2xl font-black text-[#0B1F3A]">
                  Departmental Heads
                </h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#3B7B8C]/30 to-transparent" />
            </div>
          )}
          <div
            ref={activeTab === "departmental" ? gridRef : undefined}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {leaders
              .filter((l) => l.category === "departmental")
              .map((leader, i) => (
                <div
                  key={leader.id}
                  className={`transition-all duration-700 ${
                    gridInView || activeTab !== "departmental"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <LeaderCard leader={leader} />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          ADVISORY BOARD  (special visual treatment)
      ══════════════════════════════════════════════════════ */}
      {(activeTab === "all" || activeTab === "advisory") && (
        <section className="mb-24">
          {/* Advisory Section Background */}
          <div className="bg-gradient-to-br from-[#0B1F3A] via-[#0d2545] to-[#0B1F3A] py-16 px-6 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A017]/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#3B7B8C]/10 blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-[#D4A017] to-[#F0C040] rounded-full" />
                  <h3 className="text-2xl font-black text-white">
                    Advisory Board
                  </h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#D4A017]/40 to-transparent" />
                <span className="text-[#D4A017]/60 text-xs font-bold uppercase tracking-widest hidden sm:block">
                  Strategic Guidance
                </span>
              </div>

              {/* Advisory Intro */}
              <p className="text-white/60 text-base max-w-2xl mb-10 leading-relaxed">
                Our Advisory Board comprises distinguished leaders, scholars,
                and innovators who provide strategic counsel and open doors
                that accelerate HolyDigits101's continental impact.
              </p>

              {/* Cards */}
              <div
                ref={activeTab === "advisory" ? gridRef : undefined}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {leaders
                  .filter((l) => l.category === "advisory")
                  .map((leader, i) => (
                    <div
                      key={leader.id}
                      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-[#D4A017]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4A017]/10 ${
                        gridInView || activeTab !== "advisory"
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{ transitionDelay: `${i * 150}ms`, transition: "all 700ms" }}
                    >
                      {/* Photo */}
                      <div className="h-56 relative overflow-hidden">
                        <img
                          src={leader.photo}
                          alt={leader.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/20 to-transparent" />

                        {/* Star badge */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#D4A017] flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0B1F3A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>

                        {/* Name over image bottom */}
                        <div className="absolute bottom-4 left-5 right-5">
                          <h3 className="text-white font-black text-xl leading-tight">
                            {leader.name}
                          </h3>
                          <p className="text-[#D4A017] text-xs font-bold mt-0.5">
                            {leader.department}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-white/60 text-sm leading-relaxed mb-5">
                          {leader.bio}
                        </p>
                        <a
                          href={`https://twitter.com/${leader.twitter.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white/40 hover:text-[#D4A017] transition-colors"
                        >
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="text-xs font-medium">{leader.twitter}</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          "ALL" filtered view (when single category picked from tab)
      ══════════════════════════════════════════════════════ */}
      {activeTab === "all" && (
        <section
          ref={gridRef}
          className="max-w-7xl mx-auto px-6 mb-8"
        />
      )}

      {/* ══════════════════════════════════════════════════════
          JOIN / CTA SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="join"
        ref={ctaRef}
        className="max-w-7xl mx-auto px-6 mb-24"
      >
        <div
          className={`relative rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${
            ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017] via-[#E8B422] to-[#F0C040]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwQjFGM0EiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#0B1F3A]/10" />

          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#0B1F3A]/10 rounded-full px-4 py-1.5 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#0B1F3A] animate-pulse" />
                <span className="text-[#0B1F3A] text-xs font-bold uppercase tracking-widest">
                  We're Growing
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B1F3A] leading-tight mb-4">
                Want to be part of
                <br />
                this movement?
              </h2>
              <p className="text-[#0B1F3A]/70 text-lg max-w-lg leading-relaxed">
                We're looking for passionate, purpose-driven leaders to join
                our executive team and help shape the future of digital
                education across Africa.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <a
                href="mailto:join@holydigits101.com"
                className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#0B1F3A] text-white font-black text-base shadow-2xl shadow-[#0B1F3A]/30 hover:scale-105 hover:bg-[#0d2545] transition-all duration-300"
              >
                Apply to Join as Executive
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="mailto:info@holydigits101.com"
                className="text-[#0B1F3A]/70 text-sm font-semibold hover:text-[#0B1F3A] transition-colors underline underline-offset-4"
              >
                Or reach us at info@holydigits101.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALUES STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🌍",
              title: "Pan-African Vision",
              desc: "Our leadership team represents diverse African nations, cultures, and experiences, ensuring our work resonates authentically across the continent.",
            },
            {
              icon: "💡",
              title: "Innovation First",
              desc: "We embrace cutting-edge technology and pedagogical research to design solutions that are both globally competitive and locally relevant.",
            },
            {
              icon: "🤝",
              title: "Community Trust",
              desc: "Every decision our leaders make is guided by the communities we serve — transparent, accountable, and deeply human in every interaction.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-[#D4A017]/30 hover:shadow-xl transition-all duration-400 group"
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-[#0B1F3A] font-black text-xl mb-3 group-hover:text-[#D4A017] transition-colors">
                {v.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
