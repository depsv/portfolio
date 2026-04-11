"use client";
import { Project } from "@/types";
import { ExternalLink, Github, Star } from "lucide-react";

export default function ProjectsSection({ items }: { items: Project[] }) {
  const featured = items.filter((p) => p.featured);
  const others = items.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label">Work</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featured.map((proj) => (
              <ProjectCard key={proj.id} project={proj} featured />
            ))}
          </div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {others.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <div className={`glass-card relative overflow-hidden flex flex-col ${featured ? "p-8" : "p-6"}`}>
      {featured && (
        <div className="absolute top-4 right-4">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
        </div>
      )}

      {/* Category badge */}
      <span className="inline-block text-xs font-mono mb-4 px-3 py-1 rounded-full self-start"
        style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", color: "rgba(168,85,247,0.9)" }}>
        {project.category}
      </span>

      <h3 className={`font-display font-semibold text-white mb-3 ${featured ? "text-2xl" : "text-lg"}`}>
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed flex-1 mb-6"
        style={{ color: "rgba(255,255,255,0.55)" }}>
        {featured ? (project.longDescription || project.description) : project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.slice(0, featured ? 6 : 3).map((tech) => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
        {project.techStack.length > (featured ? 6 : 3) && (
          <span className="tech-tag">+{project.techStack.length - (featured ? 6 : 3)}</span>
        )}
      </div>

      <div className="flex gap-3 mt-auto">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-400"
            style={{ color: "rgba(255,255,255,0.6)" }}>
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-400"
            style={{ color: "rgba(255,255,255,0.6)" }}>
            <Github size={14} />
            Source
          </a>
        )}
      </div>
    </div>
  );
}
