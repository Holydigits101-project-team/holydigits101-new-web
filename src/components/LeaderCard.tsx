import { useState } from "react";
import type { Leader } from "../data/leaders";

type Props = {
  leader: Leader;
  featured?: boolean;
};

export default function LeaderCard({ leader, featured }: Props) {
  const [imgError, setImgError] = useState(false);

  const initials = leader.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-[#D4A017]/40 flex flex-col ${
        featured ? "md:col-span-1" : ""
      }`}
    >
      {/* Photo */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] ${featured ? "h-72" : "h-60"}`}>
        {!imgError ? (
          <img
            src={leader.photo}
            alt={leader.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-black text-[#D4A017]/60">{initials}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              leader.category === "executive"
                ? "bg-[#D4A017] text-[#0B1F3A]"
                : leader.category === "advisory"
                ? "bg-[#3B7B8C] text-white"
                : "bg-white/20 text-white backdrop-blur-sm"
            }`}
          >
            {leader.category === "executive"
              ? "Executive"
              : leader.category === "advisory"
              ? "Advisory"
              : "Department"}
          </span>
        </div>

        {/* Gold accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A017] to-[#F0C040] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Department */}
        <span className="text-[#3B7B8C] text-xs font-semibold uppercase tracking-wider mb-1">
          {leader.department}
        </span>

        {/* Name */}
        <h3 className="text-[#0B1F3A] font-black text-xl leading-tight mb-1 group-hover:text-[#0B1F3A]">
          {leader.name}
        </h3>

        {/* Role */}
        <p className="text-[#D4A017] font-bold text-sm mb-4 leading-tight">
          {leader.role}
        </p>

        {/* Bio */}
        <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
          {leader.bio}
        </p>

        {/* Footer: Twitter */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <a
            href={`https://twitter.com/${leader.twitter.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-[#0B1F3A] transition-colors group/tw"
          >
            <span className="w-7 h-7 rounded-full bg-slate-100 group-hover/tw:bg-[#D4A017]/10 flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <span className="text-xs font-medium">{leader.twitter}</span>
          </a>

          <div className="w-8 h-8 rounded-full border border-[#D4A017]/30 flex items-center justify-center group-hover:bg-[#D4A017] group-hover:border-[#D4A017] transition-all">
            <svg className="w-3.5 h-3.5 text-[#D4A017] group-hover:text-[#0B1F3A] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
