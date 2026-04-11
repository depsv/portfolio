"use client";
import { Certificate } from "@/types";
import { Award, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function CertificatesSection({ items }: { items: Certificate[] }) {
  if (!items.length) return null;

  return (
    <section id="certificates" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label">Achievements</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            <span className="gradient-text">Certificates</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((cert) => (
            <div key={cert.id} className="glass-card p-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
                style={{ background: "var(--accent-cyan)", transform: "translate(30%, -30%)" }} />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                  <Award size={18} style={{ color: "rgba(251,191,36,0.9)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-1">{cert.name}</h3>
                  <p className="text-xs mb-2" style={{ color: "rgba(168,85,247,0.8)" }}>{cert.issuer}</p>
                  <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {formatDate(cert.date)}
                  </p>

                  {cert.credentialId && (
                    <p className="text-xs mt-1 font-mono truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                      ID: {cert.credentialId}
                    </p>
                  )}

                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mt-3 transition-colors"
                      style={{ color: "var(--accent-cyan)" }}>
                      <ExternalLink size={11} />
                      Verify
                    </a>
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
