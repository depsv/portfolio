"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2, Settings } from "lucide-react";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-display font-semibold text-white text-sm">
            {name.split(" ")[0]}<span className="gradient-text">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "white";
                (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.25)",
              color: "rgba(168,85,247,0.9)",
            }}
          >
            <Settings size={14} />
            CMS
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-nav border-t mt-2 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-lg text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.03)" }}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="py-3 px-4 rounded-lg text-sm font-medium flex items-center gap-2"
            style={{ background: "rgba(168,85,247,0.1)", color: "rgba(168,85,247,0.9)" }}
          >
            <Settings size={14} /> CMS Admin
          </Link>
        </div>
      )}
    </header>
  );
}
