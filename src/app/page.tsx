"use client";
import { useEffect, useState } from "react";
import { getPortfolioData } from "@/lib/storage";
import { PortfolioData } from "@/types";
import { defaultData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import ExperienceSection from "@/components/sections/Experience";
import ProjectsSection from "@/components/sections/Projects";
import SkillsSection from "@/components/sections/Skills";
import EducationSection from "@/components/sections/Education";
import CertificatesSection from "@/components/sections/Certificates";
import ContactSection from "@/components/sections/Contact";

export default function HomePage() {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    getPortfolioData().then(setData);
  }, []);

  return (
    <>
      <Navbar name={data.profile.name} />
      <main>
        <Hero profile={data.profile} contact={data.contact} />
        <ExperienceSection items={data.experience} />
        <ProjectsSection items={data.projects} />
        <SkillsSection items={data.skills} />
        <EducationSection items={data.education} />
        <CertificatesSection items={data.certificates} />
        <ContactSection contact={data.contact} />
      </main>
      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
          © {new Date().getFullYear()} {data.profile.name} · Built with Next.js
        </p>
      </footer>
    </>
  );
}
