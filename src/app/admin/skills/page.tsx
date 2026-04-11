"use client";
import { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { Skill } from "@/types";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

const empty = (): Skill => ({ id: generateId(), name: "", category: "Frontend", level: 3 });
const categories = ["Frontend", "Backend", "Database", "DevOps", "Language", "Tools", "Design"];

export default function AdminSkills() {
  const [items, setItems] = useState<Skill[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setItems(getPortfolioData().skills); }, []);

  const save = () => {
    const data = getPortfolioData();
    savePortfolioData({ ...data, skills: items });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof Skill, value: unknown) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = items.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">Skills</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{items.length} skills across {categories.filter(c => grouped[c]?.length > 0).length} categories</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setItems([empty(), ...items])} className="btn-ghost flex items-center gap-2 text-sm px-4 py-2.5">
            <Plus size={15} /> Add Skill
          </button>
          <button onClick={save} className="btn-primary text-sm px-4 py-2.5">
            <span className="flex items-center gap-2">{saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Ungrouped new items at top */}
      {items.filter(s => !categories.includes(s.category)).length > 0 && (
        <SkillTable title="Uncategorized" skills={items.filter(s => !categories.includes(s.category))}
          categories={categories} update={update} remove={(id) => setItems(items.filter(i => i.id !== id))} />
      )}

      <div className="space-y-6">
        {categories.map(cat => {
          const catSkills = items.filter(s => s.category === cat);
          if (!catSkills.length) return null;
          return (
            <SkillTable key={cat} title={cat} skills={catSkills} categories={categories}
              update={update} remove={(id) => setItems(items.filter(i => i.id !== id))} />
          );
        })}
      </div>

      {/* New skills (no category match yet) */}
      {items.filter(s => !s.name).length > 0 && (
        <div className="mt-6 glass-card p-6">
          <h3 className="font-semibold text-white mb-4">New Skills</h3>
          <div className="space-y-3">
            {items.filter(s => !s.name).map(skill => (
              <SkillRow key={skill.id} skill={skill} categories={categories} update={update}
                remove={(id) => setItems(items.filter(i => i.id !== id))} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SkillTable({ title, skills, categories, update, remove }: {
  title: string; skills: Skill[]; categories: string[];
  update: (id: string, field: keyof Skill, value: unknown) => void;
  remove: (id: string) => void;
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="font-display font-semibold text-white">{title}</h3>
        <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{skills.length} skills</span>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        {skills.map(skill => (
          <SkillRow key={skill.id} skill={skill} categories={categories} update={update} remove={remove} />
        ))}
      </div>
    </div>
  );
}

function SkillRow({ skill, categories, update, remove }: {
  skill: Skill; categories: string[];
  update: (id: string, field: keyof Skill, value: unknown) => void;
  remove: (id: string) => void;
}) {
  return (
    <div className="px-6 py-3 flex items-center gap-4">
      <input className="cms-input flex-1" placeholder="Skill name" value={skill.name}
        onChange={(e) => update(skill.id, "name", e.target.value)} />
      <select className="cms-input w-36" value={skill.category}
        onChange={(e) => update(skill.id, "category", e.target.value)}
        style={{ background: "rgba(255,255,255,0.05)" }}>
        {categories.map(c => <option key={c} value={c} style={{ background: "#080d1a" }}>{c}</option>)}
      </select>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => update(skill.id, "level", n)}
            className="w-6 h-6 rounded-full transition-all"
            style={{
              background: n <= skill.level
                ? "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))"
                : "rgba(255,255,255,0.08)",
              border: n <= skill.level ? "none" : "1px solid rgba(255,255,255,0.1)",
            }} />
        ))}
      </div>
      <button onClick={() => remove(skill.id)} className="p-2 hover:text-red-400 transition-colors"
        style={{ color: "rgba(255,255,255,0.3)" }}>
        <Trash2 size={14} />
      </button>
    </div>
  );
}
