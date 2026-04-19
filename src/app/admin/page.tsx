"use client";
import { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { PortfolioData } from "@/types";
import { defaultData } from "@/lib/data";
import { User, Code2, CheckCircle2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [saved, setSaved] = useState(false);

  useEffect(() => { getPortfolioData().then(setData); }, []);

  const handleSave = async () => {
    await savePortfolioData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const stats = [
    { label: "Experience", value: data.experience.length, href: "/admin/experience" },
    { label: "Projects", value: data.projects.length, href: "/admin/projects" },
    { label: "Skills", value: data.skills.length, href: "/admin/skills" },
    { label: "Certificates", value: data.certificates.length, href: "/admin/certificates" },
    { label: "Education", value: data.education.length, href: "/admin/education" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">Dashboard</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Manage your portfolio content</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank"
            className="btn-ghost flex items-center gap-2 text-sm px-4 py-2.5">
            <Eye size={15} /> Preview
          </Link>
          <button onClick={handleSave} className="btn-primary text-sm px-4 py-2.5">
            <span className="flex items-center gap-2">
              {saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="glass-card p-5 text-center hover:scale-105 transition-transform">
            <p className="font-display font-bold text-3xl gradient-text mb-1">{stat.value}</p>
            <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Profile editor */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <User size={16} style={{ color: "rgba(168,85,247,0.9)" }} />
          </div>
          <h2 className="font-display font-semibold text-xl text-white">Profile</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="cms-label">Full Name</label>
            <input className="cms-input" value={data.profile.name}
              onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })} />
          </div>
          <div>
            <label className="cms-label">Job Title</label>
            <input className="cms-input" value={data.profile.title}
              onChange={(e) => setData({ ...data, profile: { ...data.profile, title: e.target.value } })} />
          </div>
          <div className="md:col-span-2">
            <label className="cms-label">Tagline</label>
            <input className="cms-input" value={data.profile.tagline}
              onChange={(e) => setData({ ...data, profile: { ...data.profile, tagline: e.target.value } })} />
          </div>
          <div className="md:col-span-2">
            <label className="cms-label">Bio</label>
            <textarea className="cms-input" rows={4} value={data.profile.bio}
              onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })} />
          </div>
          <div>
            <label className="cms-label">Avatar URL</label>
            <input className="cms-input" placeholder="https://..." value={data.profile.avatar || ""}
              onChange={(e) => setData({ ...data, profile: { ...data.profile, avatar: e.target.value } })} />
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { href: "/admin/experience", label: "Edit Experience", desc: "Work history & roles", icon: "💼" },
          { href: "/admin/projects", label: "Edit Projects", desc: "Portfolio & case studies", icon: "🚀" },
          { href: "/admin/skills", label: "Edit Skills", desc: "Tech stack & expertise", icon: "⚡" },
          { href: "/admin/education", label: "Edit Education", desc: "Degrees & institutions", icon: "🎓" },
          { href: "/admin/certificates", label: "Edit Certificates", desc: "Credentials & courses", icon: "🏆" },
          { href: "/admin/contact", label: "Edit Contact", desc: "Links & contact info", icon: "📬" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="glass-card p-5 flex items-center gap-4">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-medium text-white text-sm">{item.label}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <span className="flex items-center gap-2">
            {saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Code2 size={16} /> Save All Changes</>}
          </span>
        </button>
      </div>
    </div>
  );
}
