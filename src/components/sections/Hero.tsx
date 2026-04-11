"use client";
import { ArrowDown, Github, Linkedin, Mail, Download, Code2 } from "lucide-react";
import { Profile, Contact } from "@/types";

interface HeroProps {
  profile: Profile;
  contact: Contact;
}

export default function Hero({ profile, contact }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in-up"
              style={{ background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.2)" }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-400 tracking-wider">Available for work</span>
            </div>

            <h1 className="font-display font-bold leading-none mb-6 animate-fade-in-up delay-100"
              style={{ fontSize: "clamp(48px, 7vw, 84px)" }}>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>{profile.name.split(" ")[0]}</span>{" "}
              <br />
              <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ") || "Developer"}</span>
            </h1>

            <p className="font-display text-xl font-medium mb-4 animate-fade-in-up delay-200"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              {profile.title}
            </p>

            <p className="text-base leading-relaxed mb-10 max-w-lg animate-fade-in-up delay-300"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-400">
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  Hire Me
                </span>
              </a>
              {contact.resumeUrl && (
                <a href={contact.resumeUrl} download className="btn-ghost inline-flex items-center gap-2">
                  <Download size={16} />
                  Resume
                </a>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 animate-fade-in-up delay-400">
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all hover:scale-110"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Github size={18} />
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all hover:scale-110"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Linkedin size={18} />
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all hover:scale-110"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Mail size={18} />
                </a>
              )}
              <div className="h-px flex-1 max-w-24"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)" }} />
              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                {contact.location}
              </span>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full animate-glow"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)" }} />
              <div className="absolute inset-8 rounded-full"
                style={{
                  border: "1px solid rgba(168,85,247,0.2)",
                  animation: "spin 20s linear infinite"
                }} />
              <div className="absolute inset-16 rounded-full"
                style={{
                  border: "1px dashed rgba(0,217,255,0.2)",
                  animation: "spin 15s linear infinite reverse"
                }} />

              {/* Center avatar / icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name}
                    className="w-40 h-40 rounded-full object-cover"
                    style={{ border: "3px solid rgba(168,85,247,0.4)" }} />
                ) : (
                  <div className="w-40 h-40 rounded-full glass-card-strong flex items-center justify-center accent-border">
                    <Code2 size={56} style={{ color: "rgba(168,85,247,0.7)" }} />
                  </div>
                )}
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card px-3 py-2 rounded-xl animate-float">
                <span className="text-xs font-mono text-cyan-400">React</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-xl"
                style={{ animation: "float 6s ease-in-out 2s infinite" }}>
                <span className="text-xs font-mono" style={{ color: "rgba(168,85,247,0.9)" }}>Next.js</span>
              </div>
              <div className="absolute top-1/2 -right-12 glass-card px-3 py-2 rounded-xl"
                style={{ animation: "float 6s ease-in-out 1s infinite" }}>
                <span className="text-xs font-mono" style={{ color: "rgba(236,72,153,0.9)" }}>TypeScript</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <a href="#experience" className="flex flex-col items-center gap-2 group"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            <span className="text-xs font-mono tracking-wider">scroll</span>
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
