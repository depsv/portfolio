"use client";
import { useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/storage";
import { Certificate } from "@/types";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

const empty = (): Certificate => ({
  id: generateId(), name: "", issuer: "", date: "", credentialId: "", credentialUrl: "",
});

export default function AdminCertificates() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { getPortfolioData().then(d => setItems(d.certificates)); }, []);

  const save = async () => {
    const data = await getPortfolioData();
    await savePortfolioData({ ...data, certificates: items });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof Certificate, value: string) => {
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
          <h1 className="font-display font-bold text-3xl text-white mb-1">Certificates</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{items.length} certificates</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="btn-ghost flex items-center gap-2 text-sm px-4 py-2.5"><Plus size={15} /> Add New</button>
          <button onClick={save} className="btn-primary text-sm px-4 py-2.5">
            <span className="flex items-center gap-2">{saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((cert) => (
          <div key={cert.id} className="glass-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}
              className="w-full flex items-center justify-between p-5 text-left">
              <div>
                <p className="font-medium text-white text-sm">{cert.name || "New Certificate"}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{cert.issuer} {cert.date ? `· ${cert.date}` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setItems(items.filter(i => i.id !== cert.id)); }}
                  className="p-1.5 hover:text-red-400 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Trash2 size={14} />
                </button>
                {expanded === cert.id ? <ChevronUp size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                  : <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.4)" }} />}
              </div>
            </button>

            {expanded === cert.id && (
              <div className="px-5 pb-5 pt-0 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="pt-4">
                  <label className="cms-label">Certificate Name</label>
                  <input className="cms-input" value={cert.name} onChange={(e) => update(cert.id, "name", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Issuer / Platform</label>
                  <input className="cms-input" placeholder="Udemy, AWS, Google..." value={cert.issuer} onChange={(e) => update(cert.id, "issuer", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Date (YYYY-MM)</label>
                  <input className="cms-input" placeholder="2023-06" value={cert.date} onChange={(e) => update(cert.id, "date", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Credential ID</label>
                  <input className="cms-input" value={cert.credentialId || ""} onChange={(e) => update(cert.id, "credentialId", e.target.value)} />
                </div>
                <div>
                  <label className="cms-label">Verification URL</label>
                  <input className="cms-input" placeholder="https://..." value={cert.credentialUrl || ""} onChange={(e) => update(cert.id, "credentialUrl", e.target.value)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
