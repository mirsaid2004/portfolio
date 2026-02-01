"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Award, Code2, Sparkles, User } from "lucide-react";
import { SectionHeader } from "./section-header";
import { useTranslations } from "next-intl";

export function AboutStats() {
  const t = useTranslations("AboutStats");

  const stats = [
    {
      icon: <Zap size={24} />,
      title: t("modernStack"),
      description: t("modernStackDesc"),
    },
    {
      icon: <Award size={24} />,
      title: t("performance"),
      description: t("performanceDesc"),
    },
    {
      icon: <Code2 size={24} />,
      title: t("systemDesign"),
      description: t("systemDesignDesc"),
    },
    {
      icon: <Sparkles size={24} />,
      title: t("motionDesign"),
      description: t("motionDesignDesc"),
    },
  ];

  return (
    <div
      id="about-section"
      className="relative w-full py-20 px-4 overflow-hidden bg-linear-to-b from-background via-background/50 to-background"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={User}
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Title & Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("headline")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("description")}
            </p>

            {/* Stats Numbers */}
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">
                  {t("yearsExperience")}
                </div>
                <div className="text-xs font-bold text-muted-foreground tracking-wider">
                  {t("yearsLabel")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">
                  {t("projects")}
                </div>
                <div className="text-xs font-bold text-muted-foreground tracking-wider">
                  {t("projectsLabel")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    {stat.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {stat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}
