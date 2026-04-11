"use client";
import { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { Education } from "@/types";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

const empty = (): Education => ({
  id: generateId(), institution: "", degree: "", field: "",
  startYear: "", endYear: "", description: "",
});

export default function AdminEducation() {
  const [items, setItems] = useState<Education[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setItems(getPortfolioData().education); }, []);

  const save = () => {
    const data = getPortfolioData();
    savePortfolioData({ ...data, education: items });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof Education, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addNew = () => {
    const item = empty();
    setItems([item, ...items]);
    setExpanded(item.id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">Education</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{items.length} entries</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="btn-ghost flex items-center gap-2 text-sm px-4 py-2.5"><Plus size={15} /> Add New</button>
          <button onClick={save} className="btn-primary text-sm px-4 py-2.5">
            <span className="flex items-center gap-2">{saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((edu) => (
          <div key={edu.id} className="glass-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
              className="w-full flex items-center justify-between p-5 text-left">
              <div>
                <p className="font-medium text-white">{edu.institution || "New Institution"}</p>
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {edu.degree} {edu.field ? `· ${edu.field}` : ""} {edu.startYear ? `· ${edu.startYear}–${edu.endYear}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); setItems(items.filter(i => i.id !== edu.id)); }}
                  className="p-2 rounded-lg hover:text-red-400 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Trash2 size={15} />
                </button>
                {expanded === edu.id ? <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                  : <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)" }} />}
              </div>
            </button>

            {expanded === edu.id && (
              <div className="px-5 pb-6 pt-4 grid md:grid-cols-2 gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <label className="cms-label">Institution</label>
                  <input className="cms-input" value={edu.institution} onChange={(e) => update(edu.id, "institution", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Degree</label>
                  <input className="cms-input" placeholder="Sarjana / Bachelor" value={edu.degree} onChange={(e) => update(edu.id, "degree", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Field of Study</label>
                  <input className="cms-input" placeholder="Ilmu Komputer" value={edu.field} onChange={(e) => update(edu.id, "field", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="cms-label">Start Year</label>
                    <input className="cms-input" placeholder="2018" value={edu.startYear} onChange={(e) => update(edu.id, "startYear", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">End Year</label>
                    <input className="cms-input" placeholder="2022" value={edu.endYear} onChange={(e) => update(edu.id, "endYear", e.target.value)} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="cms-label">Description (optional)</label>
                  <textarea className="cms-input" rows={3} value={edu.description || ""}
                    onChange={(e) => update(edu.id, "description", e.target.value)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
