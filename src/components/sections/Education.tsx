"use client";
import { Education } from "@/types";
import { GraduationCap } from "lucide-react";

export default function EducationSection({ items }: { items: Education[] }) {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label">Background</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((edu) => (
            <div key={edu.id} className="glass-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.2)" }}>
                  <GraduationCap size={22} style={{ color: "var(--accent-cyan)" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl text-white mb-1">{edu.institution}</h3>
                  <p className="font-medium mb-1" style={{ color: "rgba(168,85,247,0.9)" }}>
                    {edu.degree}
                  </p>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{edu.field}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono px-2 py-1 rounded"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
