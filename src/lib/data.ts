import { PortfolioData } from "@/types";

export const defaultData: PortfolioData = {
  profile: {
    name: "Your Name",
    title: "Full Stack Web Developer",
    tagline: "Building digital experiences that matter.",
    bio: "Passionate web developer with expertise in modern JavaScript frameworks. I craft performant, scalable, and beautiful web applications from concept to deployment.",
    avatar: "",
  },
  education: [
    {
      id: "edu-1",
      institution: "Universitas Indonesia",
      degree: "Sarjana Komputer",
      field: "Ilmu Komputer",
      startYear: "2018",
      endYear: "2022",
      description: "Fokus pada pengembangan perangkat lunak dan sistem informasi.",
    },
  ],
  certificates: [
    {
      id: "cert-1",
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: "2023-06",
      credentialId: "AWS-DA-12345",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      id: "cert-2",
      name: "Next.js & React - The Complete Guide",
      issuer: "Udemy",
      date: "2022-12",
      credentialId: "UC-abc123",
      credentialUrl: "https://udemy.com/certificate/abc123",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "PT. Teknologi Maju",
      position: "Senior Frontend Developer",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description:
        "Memimpin pengembangan frontend untuk platform e-commerce B2B dengan lebih dari 50.000 pengguna aktif. Mengimplementasikan arsitektur micro-frontend dan meningkatkan performa hingga 40%.",
      technologies: ["Next.js", "TypeScript", "Redux", "Tailwind CSS", "GraphQL"],
    },
    {
      id: "exp-2",
      company: "Startup Digital",
      position: "Full Stack Developer",
      startDate: "2022-03",
      endDate: "2022-12",
      current: false,
      description:
        "Mengembangkan fitur-fitur baru dan memelihara aplikasi SaaS menggunakan React dan Node.js.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-Commerce Platform",
      description: "Platform belanja modern dengan fitur real-time inventory dan payment gateway.",
      longDescription:
        "Membangun platform e-commerce full-featured dengan Next.js, mencakup autentikasi, manajemen produk, keranjang belanja real-time, dan integrasi payment gateway Midtrans.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Midtrans"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/username/ecommerce",
      featured: true,
      category: "Full Stack",
    },
    {
      id: "proj-2",
      title: "Dashboard Analytics",
      description: "Real-time analytics dashboard untuk monitoring bisnis.",
      techStack: ["React", "D3.js", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/username/dashboard",
      featured: true,
      category: "Frontend",
    },
  ],
  skills: [
    { id: "sk-1", name: "React / Next.js", category: "Frontend", level: 5 },
    { id: "sk-2", name: "TypeScript", category: "Language", level: 5 },
    { id: "sk-3", name: "Node.js", category: "Backend", level: 4 },
    { id: "sk-4", name: "PostgreSQL", category: "Database", level: 4 },
    { id: "sk-5", name: "Tailwind CSS", category: "Frontend", level: 5 },
    { id: "sk-6", name: "Docker", category: "DevOps", level: 3 },
    { id: "sk-7", name: "AWS", category: "DevOps", level: 3 },
    { id: "sk-8", name: "GraphQL", category: "Backend", level: 4 },
    { id: "sk-9", name: "Git", category: "Tools", level: 5 },
    { id: "sk-10", name: "Figma", category: "Design", level: 3 },
  ],
  contact: {
    email: "hello@yourname.dev",
    phone: "+62 812 3456 7890",
    linkedin: "https://linkedin.com/in/yourname",
    github: "https://github.com/yourname",
    twitter: "https://twitter.com/yourname",
    location: "Jakarta, Indonesia",
    resumeUrl: "",
  },
};
