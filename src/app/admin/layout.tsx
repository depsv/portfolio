"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, FolderKanban, GraduationCap,
  Award, Zap, Phone, ArrowLeft, Settings, Download, Upload, LogOut
} from "lucide-react";
import { exportData, importData } from "@/lib/storage";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Zap },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/contact", label: "Contact", icon: Phone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (importData(result)) {
          window.location.reload();
        } else {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 fixed left-0 top-0 bottom-0 z-40 overflow-y-auto"
        style={{ background: "rgba(5,8,16,0.9)", borderRight: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
              <Settings size={14} className="text-white" />
            </div>
            <div>
              <p className="font-display font-semibold text-white text-sm">Portfolio CMS</p>
              <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Content Manager</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: active ? "rgba(168,85,247,0.15)" : "transparent",
                  color: active ? "rgba(168,85,247,0.95)" : "rgba(255,255,255,0.5)",
                  border: active ? "1px solid rgba(168,85,247,0.2)" : "1px solid transparent",
                }}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={handleExport}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(0,217,255,0.06)", border: "1px solid rgba(0,217,255,0.15)", color: "rgba(0,217,255,0.8)" }}>
            <Download size={14} /> Export JSON
          </button>
          <button onClick={handleImport}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
            <Upload size={14} /> Import JSON
          </button>
          <Link href="/"
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "transparent", color: "rgba(255,255,255,0.35)" }}>
            <ArrowLeft size={14} /> View Portfolio
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "rgba(239,68,68,0.7)" }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
