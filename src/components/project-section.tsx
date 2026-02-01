"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./project-card";

export function ProjectSection() {
  const t = useTranslations("Projects");

  const projects = [
    {
      id: "project1",
      links: { demo: "#", github: "#" },
      tags: ["Lighthouse 100", "+40% Conversion"],
    },
    {
      id: "project2",
      links: { demo: "#", github: "#" },
      tags: ["Realtime", "WS + 10k"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 50 },
    },
  };

  return (
    <section className="py-24 px-4 relative z-10 w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("title")}</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard
              title={t(`${project.id}.title` as any)}
              description={t(`${project.id}.description` as any)}
              tags={project.tags}
              links={project.links}
              star={{
                situation: t(`${project.id}.situation` as any),
                task: t(`${project.id}.task` as any),
                action: t(`${project.id}.action` as any),
                result: t(`${project.id}.result` as any),
              }}
              labels={{
                viewProject: t("viewProject"),
                github: t("github"),
                perf: t("perf"),
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
