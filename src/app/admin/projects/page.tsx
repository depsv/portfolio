"use client";
import { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { Project } from "@/types";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp, Star } from "lucide-react";

const empty = (): Project => ({
  id: generateId(), title: "", description: "", longDescription: "",
  techStack: [], liveUrl: "", githubUrl: "", featured: false, category: "Full Stack",
});

const categories = ["Full Stack", "Frontend", "Backend", "Mobile", "DevOps", "Open Source"];

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setItems(getPortfolioData().projects); }, []);

  const save = () => {
    const data = getPortfolioData();
    savePortfolioData({ ...data, projects: items });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof Project, value: unknown) => {
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
          <h1 className="font-display font-bold text-3xl text-white mb-1">Projects</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{items.length} projects · {items.filter(p => p.featured).length} featured</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="btn-ghost flex items-center gap-2 text-sm px-4 py-2.5"><Plus size={15} /> Add New</button>
          <button onClick={save} className="btn-primary text-sm px-4 py-2.5">
            <span className="flex items-center gap-2">{saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((proj) => (
          <div key={proj.id} className="glass-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
              className="w-full flex items-center justify-between p-5 text-left">
              <div className="flex items-center gap-3">
                {proj.featured && <Star size={14} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                <div>
                  <p className="font-medium text-white">{proj.title || "New Project"}</p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {proj.category} · {proj.techStack.slice(0, 3).join(", ") || "No tech stack"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); setItems(items.filter(i => i.id !== proj.id)); }}
                  className="p-2 rounded-lg hover:text-red-400 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Trash2 size={15} />
                </button>
                {expanded === proj.id ? <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                  : <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)" }} />}
              </div>
            </button>

            {expanded === proj.id && (
              <div className="px-5 pb-6 pt-0 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="pt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="cms-label">Project Title</label>
                    <input className="cms-input" value={proj.title} onChange={(e) => update(proj.id, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">Category</label>
                    <select className="cms-input" value={proj.category} onChange={(e) => update(proj.id, "category", e.target.value)}>
                      {categories.map(c => <option key={c} value={c} style={{ background: "#080d1a" }}>{c}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="cms-label">Short Description</label>
                    <input className="cms-input" value={proj.description} onChange={(e) => update(proj.id, "description", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="cms-label">Long Description (for featured)</label>
                    <textarea className="cms-input" rows={3} value={proj.longDescription || ""}
                      onChange={(e) => update(proj.id, "longDescription", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="cms-label">Tech Stack (comma separated)</label>
                    <input className="cms-input" placeholder="Next.js, TypeScript, Prisma"
                      value={proj.techStack.join(", ")}
                      onChange={(e) => update(proj.id, "techStack", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} />
                  </div>
                  <div>
                    <label className="cms-label">Live URL</label>
                    <input className="cms-input" placeholder="https://..." value={proj.liveUrl || ""}
                      onChange={(e) => update(proj.id, "liveUrl", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">GitHub URL</label>
                    <input className="cms-input" placeholder="https://github.com/..." value={proj.githubUrl || ""}
                      onChange={(e) => update(proj.id, "githubUrl", e.target.value)} />
                  </div>
                  <div>
                    <label className="cms-label">Image URL</label>
                    <input className="cms-input" placeholder="https://..." value={proj.image || ""}
                      onChange={(e) => update(proj.id, "image", e.target.value)} />
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <input type="checkbox" id={`feat-${proj.id}`} checked={proj.featured}
                      onChange={(e) => update(proj.id, "featured", e.target.checked)} className="w-4 h-4 rounded" />
                    <label htmlFor={`feat-${proj.id}`} className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Mark as featured project
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
