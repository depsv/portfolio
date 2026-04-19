"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Code2, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Login gagal");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-4">
            <Code2 size={22} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Admin Login</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Masukkan password untuk melanjutkan
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="cms-label">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock size={15} style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  required
                  autoFocus
                  className="cms-input !pl-10 !pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="text-sm px-4 py-2.5 rounded-lg"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "rgba(239,68,68,0.9)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memeriksa..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
