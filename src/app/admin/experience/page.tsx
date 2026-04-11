"use client";
import { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { Experience } from "@/types";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

const empty = (): Experience => ({
  id: generateId(), company: "", position: "", startDate: "", endDate: "",
  current: false, description: "", technologies: [],
});

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setItems(getPortfolioData().experience); }, []);

  const save = () => {
    const data = getPortfolioData();
    savePortfolioData({ ...data, experience: items });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof Experience, value: unknown) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addNew = () => {
    const item = empty();
    setItems([item, ...items]);
    setExpanded(item.id);
  };

  const remove = (id: string) => { setItems(items.filter(i => i.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">Experience</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{items.length} entries</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="btn-ghost flex items-center gap-2 text-sm px-4 py-2.5">
            <Plus size={15} /> Add New
          </button>
          <button onClick={save} className="btn-primary text-sm px-4 py-2.5">
            <span className="flex items-center gap-2">
              {saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((exp) => (
          <div key={exp.id} className="glass-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
              className="w-full flex items-center justify-between p-5 text-left">
              <div>
                <p className="font-medium text-white">{exp.position || "New Position"}</p>
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {exp.company || "Company"} {exp.current ? "· Current" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); remove(exp.id); }}
                  className="p-2 rounded-lg transition-colors hover:text-red-400"
                  style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Trash2 size={15} />
                </button>
                {expanded === exp.id ? <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                  : <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)" }} />}
              </div>
            </button>

            {expanded === exp.id && (
              <div className="px-5 pb-6 pt-0 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="pt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="cms-label">Position / Role</label>
                    <input className="cms-input" value={exp.position}
                      onChange={(e) => update(exp.id, "position", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">Company</label>
                    <input className="cms-input" value={exp.company}
                      onChange={(e) => update(exp.id, "company", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">Start Date (YYYY-MM)</label>
                    <input className="cms-input" placeholder="2023-01" value={exp.startDate}
                      onChange={(e) => update(exp.id, "startDate", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">End Date (YYYY-MM)</label>
                    <input className="cms-input" placeholder="2024-06" value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => update(exp.id, "endDate", e.target.value)} />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id={`current-${exp.id}`} checked={exp.current}
                      onChange={(e) => update(exp.id, "current", e.target.checked)}
                      className="w-4 h-4 rounded" />
                    <label htmlFor={`current-${exp.id}`} className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Currently working here
                    </label>
                  </div>
                </div>
                <div>
                  <label className="cms-label">Description</label>
                  <textarea className="cms-input" rows={4} value={exp.description}
                    onChange={(e) => update(exp.id, "description", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Technologies (comma separated)</label>
                  <input className="cms-input" placeholder="React, TypeScript, Node.js"
                    value={exp.technologies.join(", ")}
                    onChange={(e) => update(exp.id, "technologies", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
