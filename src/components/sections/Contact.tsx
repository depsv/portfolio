"use client";
import { Contact } from "@/types";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";

export default function ContactSection({ contact }: { contact: Contact }) {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="section-label">Get In Touch</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Punya proyek menarik? Saya selalu terbuka untuk peluang baru dan kolaborasi yang menarik.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact info */}
          <div className="glass-card p-8">
            <h3 className="font-display font-semibold text-xl text-white mb-8">Contact Info</h3>
            <div className="space-y-6">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.2)" }}>
                    <Mail size={16} style={{ color: "var(--accent-cyan)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{contact.email}</p>
                  </div>
                </a>
              )}
              {contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}>
                    <Phone size={16} style={{ color: "var(--accent-purple)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Phone</p>
                    <p className="text-sm font-medium text-white">{contact.phone}</p>
                  </div>
                </div>
              )}
              {contact.location && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)" }}>
                    <MapPin size={16} style={{ color: "var(--accent-pink)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Location</p>
                    <p className="text-sm font-medium text-white">{contact.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social */}
            <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-mono mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Social</p>
              <div className="flex gap-3">
                {contact.github && (
                  <a href={contact.github} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all hover:scale-110"
                    style={{ color: "rgba(255,255,255,0.6)" }}>
                    <Github size={16} />
                  </a>
                )}
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all hover:scale-110"
                    style={{ color: "rgba(255,255,255,0.6)" }}>
                    <Linkedin size={16} />
                  </a>
                )}
                {contact.twitter && (
                  <a href={contact.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all hover:scale-110"
                    style={{ color: "rgba(255,255,255,0.6)" }}>
                    <Twitter size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick message */}
          <div className="glass-card p-8">
            <h3 className="font-display font-semibold text-xl text-white mb-8">Send a Message</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
              window.open(`mailto:${contact.email}?subject=Hire ${name}&body=${encodeURIComponent(message)}`);
            }} className="space-y-4">
              <div>
                <label className="cms-label">Your Name</label>
                <input name="name" required placeholder="John Doe" className="cms-input" />
              </div>
              <div>
                <label className="cms-label">Message</label>
                <textarea name="message" required rows={5} placeholder="Tell me about your project..." className="cms-input" />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
