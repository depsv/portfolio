# 🚀 Portfolio Web App — Next.js + Dark Glassmorphism

Portfolio lengkap dengan CMS bawaan, dibangun dengan **Next.js 14**, **TypeScript**, dan **Tailwind CSS**.

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | Custom Glassmorphism Components |
| Storage | localStorage (browser-based CMS) |
| Hosting | Vercel (gratis) |

---

## ✨ Fitur

### Portfolio Public (`/`)
- **Hero Section** — nama, title, bio, social links, animasi floating
- **Experience** — timeline pengalaman kerja dengan tech tags
- **Projects** — grid proyek dengan featured & kategori
- **Skills** — skill per kategori dengan level indicator
- **Education** — riwayat pendidikan
- **Certificates** — sertifikat & kredensial
- **Contact** — form kontak + info lengkap

### CMS Admin (`/admin`)
- Dashboard dengan statistik dan quick links
- Edit Profile (nama, bio, avatar)
- CRUD untuk semua section (Experience, Projects, Skills, Education, Certificates, Contact)
- **Export / Import JSON** — backup data ke file
- Preview langsung ke portfolio

---

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── page.tsx              # Halaman portfolio utama
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Glassmorphism CSS theme
│   └── admin/
│       ├── layout.tsx        # Sidebar CMS
│       ├── page.tsx          # Dashboard admin
│       ├── experience/       # CRUD pengalaman
│       ├── projects/         # CRUD proyek
│       ├── skills/           # CRUD skills
│       ├── education/        # CRUD pendidikan
│       ├── certificates/     # CRUD sertifikat
│       └── contact/          # Edit kontak
├── components/
│   ├── Navbar.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Education.tsx
│       ├── Certificates.tsx
│       └── Contact.tsx
├── lib/
│   ├── data.ts               # Default data
│   ├── storage.ts            # localStorage CMS layer
│   └── utils.ts              # Helpers
└── types/
    └── index.ts              # TypeScript types
```

---

## 🚀 Cara Deploy ke Vercel (dari GitHub)

### Step 1 — Buat Repository GitHub

```bash
# Di folder portfolio ini
git init
git add .
git commit -m "feat: initial portfolio setup"

# Buat repo baru di github.com lalu:
git remote add origin https://github.com/USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2 — Daftar & Connect ke Vercel

1. Buka **[vercel.com](https://vercel.com)** → Sign Up dengan GitHub
2. Klik **"Add New Project"**
3. Import repository `portfolio` dari GitHub
4. Vercel otomatis detect Next.js — klik **Deploy**
5. Selesai! URL live akan tersedia dalam ~1 menit

### Step 3 — Custom Domain (Opsional)

Di Vercel Dashboard → Settings → Domains → tambahkan domain kamu.

---

## 💻 Development Lokal

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Buka browser
open http://localhost:3000        # Portfolio
open http://localhost:3000/admin  # CMS Admin
```

---

## 📝 Cara Edit Konten

### Via CMS (Recommended)
1. Buka `/admin` di browser
2. Edit konten sesuai kebutuhan
3. Klik **"Save Changes"**
4. Data tersimpan di `localStorage` browser

### Via Export/Import JSON
1. Edit via CMS → klik **"Export JSON"** untuk backup
2. Edit file JSON langsung jika perlu
3. Klik **"Import JSON"** untuk restore

### ⚠️ Catatan Penting: localStorage vs Database

Saat ini data disimpan di **localStorage** (browser lokal). Artinya:
- Data **tidak hilang** selama pakai browser yang sama
- Data **tidak sync** antar device/browser
- Cocok untuk portfolio personal yang dikelola dari 1 device

### 🔄 Untuk Multi-Device / Production (Upgrade Path)

Jika ingin data sync antar device, tambahkan salah satu:

**Option A — Vercel KV (Redis, gratis tier ada)**
```bash
npm install @vercel/kv
```

**Option B — Supabase (PostgreSQL gratis)**
```bash
npm install @supabase/supabase-js
```

**Option C — JSON di GitHub repo (simple)**
Simpan data sebagai file JSON di repo dan fetch via GitHub API.

---

## 🎨 Kustomisasi Tema

Edit `src/app/globals.css`:

```css
:root {
  --accent-cyan: #00D9FF;    /* Warna utama */
  --accent-purple: #A855F7;  /* Warna sekunder */
  --accent-pink: #EC4899;    /* Warna aksen */
  --bg-primary: #050810;     /* Background utama */
}
```

---

## 📦 Commands

```bash
npm run dev      # Development
npm run build    # Build production
npm run start    # Jalankan production build
npm run lint     # Lint check
```

---

Built with ❤️ menggunakan Next.js 14 + Tailwind CSS
