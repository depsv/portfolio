"use client";
import React, { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { Contact } from "@/types";
import { CheckCircle2, Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, FileText } from "lucide-react";

const defaultContact: Contact = {
  email: "", phone: "", linkedin: "", github: "", twitter: "", website: "", location: "", resumeUrl: "",
};

export default function AdminContact() {
  const [contact, setContact] = useState<Contact>(defaultContact);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setContact(getPortfolioData().contact); }, []);

  const save = () => {
    const data = getPortfolioData();
    savePortfolioData({ ...data, contact });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: keyof Contact, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  const fields: { key: keyof Contact; label: string; icon: React.ElementType; placeholder: string; type?: string }[] = [
    { key: "email", label: "Email Address", icon: Mail, placeholder: "hello@yourname.dev", type: "email" },
    { key: "phone", label: "Phone Number", icon: Phone, placeholder: "+62 812 3456 7890" },
    { key: "location", label: "Location", icon: MapPin, placeholder: "Jakarta, Indonesia" },
    { key: "github", label: "GitHub URL", icon: Github, placeholder: "https://github.com/username" },
    { key: "linkedin", label: "LinkedIn URL", icon: Linkedin, placeholder: "https://linkedin.com/in/username" },
    { key: "twitter", label: "Twitter / X URL", icon: Twitter, placeholder: "https://twitter.com/username" },
    { key: "website", label: "Personal Website", icon: Globe, placeholder: "https://yourname.dev" },
    { key: "resumeUrl", label: "Resume / CV URL", icon: FileText, placeholder: "https://drive.google.com/..." },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">Contact & Links</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Manage your contact information and social links</p>
        </div>
        <button onClick={save} className="btn-primary text-sm px-4 py-2.5">
          <span className="flex items-center gap-2">{saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}</span>
        </button>
      </div>

      <div className="glass-card p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
            <div key={key}>
              <label className="cms-label flex items-center gap-2">
                <Icon size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                {label}
              </label>
              <input
                className="cms-input"
                type={type || "text"}
                placeholder={placeholder}
                value={contact[key] || ""}
                onChange={(e) => update(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 flex justify-end" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={save} className="btn-primary flex items-center gap-2 px-6 py-3">
            <span className="flex items-center gap-2">
              {saved ? <><CheckCircle2 size={16} /> Saved!</> : "Save All Changes"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
