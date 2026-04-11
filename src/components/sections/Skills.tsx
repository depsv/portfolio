"use client";
import { Skill } from "@/types";

export default function SkillsSection({ items }: { items: Skill[] }) {
  const categories = Array.from(new Set(items.map((s) => s.category)));

  const categoryColors: Record<string, string> = {
    Frontend: "rgba(0,217,255,0.8)",
    Backend: "rgba(168,85,247,0.8)",
    Database: "rgba(236,72,153,0.8)",
    DevOps: "rgba(251,191,36,0.8)",
    Language: "rgba(52,211,153,0.8)",
    Tools: "rgba(251,146,60,0.8)",
    Design: "rgba(196,181,253,0.8)",
  };

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label">Expertise</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Skills & <span className="gradient-text">Tech Stack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catSkills = items.filter((s) => s.category === cat);
            const color = categoryColors[cat] || "rgba(255,255,255,0.6)";
            return (
              <div key={cat} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <h3 className="font-display font-semibold text-white">{cat}</h3>
                  <span className="ml-auto text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {catSkills.length} skills
                  </span>
                </div>
                <div className="space-y-4">
                  {catSkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                          {skill.name}
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <div key={dot} className="w-1.5 h-1.5 rounded-full transition-all"
                              style={{
                                background: dot <= skill.level ? color : "rgba(255,255,255,0.1)",
                                boxShadow: dot <= skill.level ? `0 0 4px ${color}` : "none",
                              }} />
                          ))}
                        </div>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-bar-fill" style={{ width: `${(skill.level / 5) * 100}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
