export type Leader = {
  id: number;
  name: string;
  role: string;
  department: string;
  category: "executive" | "departmental" | "advisory";
  bio: string;
  twitter: string;
  photo: string;
  featured?: boolean;
};

export const leaders: Leader[] = [
  // ─── EXECUTIVE BOARD ────────────────────────────────────
  {
    id: 1,
    name: "Pendar Emmanuel",
    role: "Founder & Executive Lead",
    department: "Executive Board",
    category: "executive",
    bio: "A visionary digital educator and community builder who founded HolyDigits101 to bridge the digital divide across Africa. Pendar drives the organization's overarching mission with relentless passion and a deep love for transforming lives through technology.",
    twitter: "@PendarEmmanuel",
    photo:
      "https://images.pexels.com/photos/5648408/pexels-photo-5648408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
    featured: true,
  },
  {
    id: 2,
    name: "Adaeze Okonkwo",
    role: "Co-Founder",
    department: "Strategic Vision & Partnerships",
    category: "executive",
    bio: "A master strategist and relationship builder who forged HolyDigits101's key institutional and governmental partnerships across five African nations. Adaeze turns bold visions into sustainable, scalable action.",
    twitter: "@AdaezeOkonkwo",
    photo:
      "https://images.pexels.com/photos/9304685/pexels-photo-9304685.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
    featured: true,
  },
  {
    id: 3,
    name: "Kwame Asante",
    role: "Chief Executive Officer",
    department: "Operations & Growth",
    category: "executive",
    bio: "Kwame brings 12 years of nonprofit operational excellence, leading HolyDigits101's growth from a grassroots initiative to a continent-wide digital education force. His leadership ensures every program runs at peak impact.",
    twitter: "@KwameAsante",
    photo:
      "https://images.pexels.com/photos/7446948/pexels-photo-7446948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
    featured: true,
  },
  {
    id: 4,
    name: "Tunde Oyeleke",
    role: "Chief Technology Officer",
    department: "Technology & Digital Innovation",
    category: "executive",
    bio: "An MIT-trained software architect who designs and scales HolyDigits101's digital platforms. Tunde's innovations have delivered accessible EdTech tools to over 200,000 learners across rural and urban communities.",
    twitter: "@TundeOyeleke",
    photo:
      "https://images.pexels.com/photos/4183516/pexels-photo-4183516.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
    featured: true,
  },

  // ─── DEPARTMENTAL HEADS ──────────────────────────────────
  {
    id: 5,
    name: "Funmilayo Bello",
    role: "Deputy Director",
    department: "Operations",
    category: "departmental",
    bio: "Funmilayo orchestrates the day-to-day operations of HolyDigits101 with precision and warmth, ensuring every team member and community program operates seamlessly toward collective impact.",
    twitter: "@FunmilayoBello",
    photo:
      "https://images.pexels.com/photos/5905895/pexels-photo-5905895.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 6,
    name: "Dr. Amara Diallo",
    role: "Head of Department",
    department: "Education & Curriculum",
    category: "departmental",
    bio: "A former UNESCO curriculum specialist, Dr. Diallo architects HolyDigits101's world-class learning frameworks that blend African cultural context with global digital literacy standards.",
    twitter: "@DrAmaraDiallo",
    photo:
      "https://images.pexels.com/photos/5905899/pexels-photo-5905899.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 7,
    name: "Nnamdi Chukwu",
    role: "Head of Department",
    department: "Research & Development",
    category: "departmental",
    bio: "Nnamdi leads rigorous research initiatives that measure community impact and drive evidence-based innovation at HolyDigits101, publishing findings in top-tier global educational journals.",
    twitter: "@NnamdiChukwu",
    photo:
      "https://images.pexels.com/photos/7792860/pexels-photo-7792860.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 8,
    name: "Chioma Eze",
    role: "Programs Officer",
    department: "Community Engagement",
    category: "departmental",
    bio: "Chioma's heart-centered approach has connected thousands of community members to HolyDigits101's programs. She designs and manages grassroots outreach that leaves lasting empowerment in every village and city neighborhood.",
    twitter: "@ChiomaEze",
    photo:
      "https://images.pexels.com/photos/37357477/pexels-photo-37357477.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 9,
    name: "Blessing Osei",
    role: "Head",
    department: "Media & Communications",
    category: "departmental",
    bio: "Blessing crafts HolyDigits101's compelling narrative across digital and traditional media, amplifying stories of transformation and positioning the organization as Africa's most trusted EdTech voice.",
    twitter: "@BlessingOsei",
    photo:
      "https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 10,
    name: "Emeka Nwosu",
    role: "Technical Lead / IT Director",
    department: "Technology Infrastructure",
    category: "departmental",
    bio: "Emeka ensures HolyDigits101's digital infrastructure is robust, secure, and always available for learners. From cloud architecture to cybersecurity, he builds the backbone of Africa's digital education future.",
    twitter: "@EmekaNwosu",
    photo:
      "https://images.pexels.com/photos/5060570/pexels-photo-5060570.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },

  // ─── ADVISORY BOARD ─────────────────────────────────────
  {
    id: 11,
    name: "Prof. Ngozi Adeyemi",
    role: "Board Advisory Member",
    department: "Education Policy",
    category: "advisory",
    bio: "Former Minister of Education with 30 years of policy expertise. Prof. Ngozi guides HolyDigits101's strategic alignment with national education goals across West Africa.",
    twitter: "@ProfNgoziAdeyemi",
    photo:
      "https://images.pexels.com/photos/18809829/pexels-photo-18809829.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 12,
    name: "Dr. Samuel Mensah",
    role: "Board Advisory Member",
    department: "Technology & Innovation",
    category: "advisory",
    bio: "Silicon Valley tech executive and Africa-focused investment strategist. Dr. Mensah advises on technology roadmaps and positions HolyDigits101 for global partnerships and funding.",
    twitter: "@DrSamuelMensah",
    photo:
      "https://images.pexels.com/photos/5648411/pexels-photo-5648411.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
  {
    id: 13,
    name: "Yetunde Fashola",
    role: "Board Advisory Member",
    department: "Community Development",
    category: "advisory",
    bio: "Acclaimed social entrepreneur and Forbes Africa 50 honoree. Yetunde brings deep expertise in scaling community-based development programs that deliver measurable, lasting change.",
    twitter: "@YetundeFashola",
    photo:
      "https://images.pexels.com/photos/5905897/pexels-photo-5905897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500",
  },
];
