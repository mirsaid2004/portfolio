"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  TrendingUp,
  Users,
  Zap,
  FolderKanban,
} from "lucide-react";
import { SectionHeader } from "./section-header";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
  links: {
    live?: string;
    github?: string;
  };
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "High-performance Next.js e-commerce with 100 Lighthouse score",
    longDescription:
      "Built a scalable e-commerce platform using Next.js 14, React Server Components, and Edge Runtime. Implemented advanced caching strategies and optimized images resulting in perfect Lighthouse scores.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    metrics: [
      { icon: <Zap size={16} />, label: "Performance", value: "100/100" },
      { icon: <TrendingUp size={16} />, label: "Conversion", value: "+45%" },
      { icon: <Users size={16} />, label: "Users", value: "50k+" },
    ],
    links: {
      live: "#",
      github: "#",
    },
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Analytics Dashboard",
    description: "WebSocket-powered dashboard handling 10k+ concurrent users",
    longDescription:
      "Developed a real-time analytics platform with WebSocket connections, Redis pub/sub, and optimized React rendering. Handles massive concurrent connections with sub-100ms latency.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "WebSocket", "Redis"],
    metrics: [
      { icon: <Users size={16} />, label: "Concurrent", value: "10k+" },
      { icon: <Zap size={16} />, label: "Latency", value: "<100ms" },
      { icon: <TrendingUp size={16} />, label: "Uptime", value: "99.9%" },
    ],
    links: {
      live: "#",
      github: "#",
    },
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "OpenAI-powered content creation tool with smart caching",
    longDescription:
      "Created an AI-powered content generation platform integrated with OpenAI API. Implemented intelligent caching, rate limiting, and streaming responses for optimal UX.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "Docker"],
    metrics: [
      { icon: <Zap size={16} />, label: "Response", value: "<2s" },
      { icon: <Users size={16} />, label: "Daily Users", value: "5k+" },
      { icon: <TrendingUp size={16} />, label: "Saved Time", value: "70%" },
    ],
    links: {
      live: "#",
      github: "#",
    },
  },
  {
    id: 4,
    title: "DevOps Pipeline Manager",
    description: "Jenkins + Docker orchestration with automated deployments",
    longDescription:
      "Built a comprehensive CI/CD pipeline management system using Jenkins, Docker, and Kubernetes. Automated deployments reduced release time by 80%.",
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    tags: ["Jenkins", "Docker", "K8s", "Node.js"],
    metrics: [
      { icon: <Zap size={16} />, label: "Deploy Time", value: "-80%" },
      { icon: <TrendingUp size={16} />, label: "Success Rate", value: "98%" },
      { icon: <Users size={16} />, label: "Teams", value: "12" },
    ],
    links: {
      github: "#",
    },
  },
];

export function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="relative w-full py-20 px-4 bg-linear-to-b from-background via-background/50 to-background">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={FolderKanban}
          title="Featured Projects"
          subtitle="A selection of projects showcasing my expertise in modern web development, performance optimization, and scalable architecture"
        />
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              className="group relative"
            >
              {/* Project Card */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/90" />
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-bold backdrop-blur-sm">
                      <Star size={12} fill="currentColor" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-background/80 backdrop-blur-md rounded-xl border border-border/50">
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className="text-primary">{metric.icon}</div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]"
                      >
                        <ExternalLink size={16} />
                        View Live
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-card/80 backdrop-blur-sm text-foreground rounded-lg font-semibold text-sm border border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}
