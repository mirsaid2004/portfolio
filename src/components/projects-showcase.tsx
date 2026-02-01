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
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "./section-header";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Project {
  id: number;
  title: string;
  descriptionKey: string;
  longDescriptionKey: string;
  image: string;
  tags: string[];
  metrics: {
    icon: React.ReactNode;
    labelKey: string;
    value: string;
  }[];
  links: {
    live?: string;
    github?: string;
  };
  featured?: boolean;
}

export function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const t = useTranslations("ProjectsShowcase");

  const projects: Project[] = [
    {
      id: 1,
      title: "Soff.uz",
      descriptionKey: "projects.soff.description",
      longDescriptionKey: "projects.soff.longDescription",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
      metrics: [
        {
          icon: <Zap size={16} />,
          labelKey: "projects.soff.metrics.performance",
          value: "100/100",
        },
        {
          icon: <TrendingUp size={16} />,
          labelKey: "projects.soff.metrics.conversion",
          value: "+45%",
        },
        {
          icon: <Users size={16} />,
          labelKey: "projects.soff.metrics.users",
          value: "50k+",
        },
      ],
      links: {
        live: "https://soff.uz",
      },
      featured: true,
    },
    {
      id: 2,
      title: "Ilimiyish.uz",
      descriptionKey: "projects.ilimiyish.description",
      longDescriptionKey: "projects.ilimiyish.longDescription",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "WebSocket", "Redis"],
      metrics: [
        {
          icon: <Users size={16} />,
          labelKey: "projects.ilimiyish.metrics.concurrent",
          value: "10k+",
        },
        {
          icon: <Zap size={16} />,
          labelKey: "projects.ilimiyish.metrics.latency",
          value: "<100ms",
        },
        {
          icon: <TrendingUp size={16} />,
          labelKey: "projects.ilimiyish.metrics.uptime",
          value: "99.9%",
        },
      ],
      links: {
        live: "https://ilimiyish.uz",
      },
    },
    {
      id: 3,
      title: "RealEstateCRM.uz",
      descriptionKey: "projects.realestatecrm.description",
      longDescriptionKey: "projects.realestatecrm.longDescription",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      tags: ["Next.js", "OpenAI", "PostgreSQL", "Docker"],
      metrics: [
        {
          icon: <Zap size={16} />,
          labelKey: "projects.realestatecrm.metrics.response",
          value: "<2s",
        },
        {
          icon: <Users size={16} />,
          labelKey: "projects.realestatecrm.metrics.dailyUsers",
          value: "5k+",
        },
        {
          icon: <TrendingUp size={16} />,
          labelKey: "projects.realestatecrm.metrics.savedTime",
          value: "70%",
        },
      ],
      links: {
        live: "https://realestatecrm.uz",
      },
    },
    {
      id: 4,
      title: "Ishora.uz",
      descriptionKey: "projects.ishora.description",
      longDescriptionKey: "projects.ishora.longDescription",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
      tags: ["Jenkins", "Docker", "K8s", "Node.js"],
      metrics: [
        {
          icon: <Zap size={16} />,
          labelKey: "projects.ishora.metrics.deployTime",
          value: "-80%",
        },
        {
          icon: <TrendingUp size={16} />,
          labelKey: "projects.ishora.metrics.successRate",
          value: "98%",
        },
        {
          icon: <Users size={16} />,
          labelKey: "projects.ishora.metrics.teams",
          value: "12",
        },
      ],
      links: {
        live: "https://ishora.uz",
      },
    },
    {
      id: 5,
      title: "DarmonServis.uz",
      descriptionKey: "projects.darmonservis.description",
      longDescriptionKey: "projects.darmonservis.longDescription",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
      metrics: [
        {
          icon: <Zap size={16} />,
          labelKey: "projects.darmonservis.metrics.performance",
          value: "100/100",
        },
        {
          icon: <TrendingUp size={16} />,
          labelKey: "projects.darmonservis.metrics.conversion",
          value: "+45%",
        },
        {
          icon: <Users size={16} />,
          labelKey: "projects.darmonservis.metrics.users",
          value: "50k+",
        },
      ],
      links: {
        live: "https://darmonservis.uz",
      },
    },
    {
      id: 6,
      title: "DarmonTravel.uz",
      descriptionKey: "projects.darmontravel.description",
      longDescriptionKey: "projects.darmontravel.longDescription",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "WebSocket", "Redis"],
      metrics: [
        {
          icon: <Users size={16} />,
          labelKey: "projects.darmontravel.metrics.concurrent",
          value: "10k+",
        },
        {
          icon: <Zap size={16} />,
          labelKey: "projects.darmontravel.metrics.latency",
          value: "<100ms",
        },
        {
          icon: <TrendingUp size={16} />,
          labelKey: "projects.darmontravel.metrics.uptime",
          value: "99.9%",
        },
      ],
      links: {
        live: "https://darmontravel.uz",
      },
    },
  ];

  return (
    <div className="relative w-full py-20 px-4 bg-linear-to-b from-background via-background/50 to-background">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={FolderKanban}
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto">
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
                      {t("featured")}
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
                    {t(project.descriptionKey as any)}
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
                          {t(metric.labelKey as any)}
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
                        {t("viewLive")}
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
                        {t("viewCode")}
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

      {/* View More Projects Link */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 hover:border-primary/50 text-foreground hover:text-primary font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            {t("viewMoreProjects")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}
