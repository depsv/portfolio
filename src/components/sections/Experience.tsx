"use client";
import { Experience } from "@/types";
import { formatDate } from "@/lib/utils";
import { Briefcase } from "lucide-react";

export default function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label">Career</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((exp, i) => (
            <div key={exp.id} className="glass-card p-6 md:p-8 relative overflow-hidden group">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 w-1 h-full"
                style={{ background: "linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple))" }} />

              <div className="md:flex md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)" }}>
                      <Briefcase size={15} style={{ color: "rgba(168,85,247,0.8)" }} />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-white">{exp.position}</h3>
                    {exp.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.2)", color: "var(--accent-cyan)" }}>
                        Current
                      </span>
                    )}
                  </div>
                  <p className="font-medium ml-11" style={{ color: "rgba(255,255,255,0.6)" }}>{exp.company}</p>
                </div>
                <span className="font-mono text-sm mt-2 md:mt-0 ml-11 md:ml-0 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-5 ml-0 md:ml-11"
                style={{ color: "rgba(255,255,255,0.55)" }}>
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 ml-0 md:ml-11">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
