"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Rocket, Cloud, Code } from "lucide-react";
import { SectionHeader } from "./section-header";

interface Experience {
  icon: React.ReactNode;
  title: string;
  company: string;
  period: string;
  description: string;
  side: "left" | "right";
}

const experiences: Experience[] = [
  {
    icon: <Rocket size={24} />,
    title: "Lead UI/UX Engineer",
    company: "TechVanguard Studio",
    period: "2022 - Present",
    description:
      "Spearheaded the redesign of the core flagship product, resulting in a 45% increase in user engagement and 20% reduction in churn rate.",
    side: "left",
  },
  {
    icon: <Cloud size={24} />,
    title: "Senior Frontend Developer",
    company: "CloudScale Solutions",
    period: "2020 - 2022",
    description:
      "Optimized the frontend build pipeline using Vite and Webpack 5, reducing deployment times by 60% and improving Core Web Vitals across all pages.",
    side: "right",
  },
  {
    icon: <Code size={24} />,
    title: "Frontend Engineer",
    company: "PixelPerfect Agency",
    period: "2018 - 2020",
    description:
      "Built and maintained high-traffic marketing sites for Fortune 500 clients, implementing pixel-perfect animations and responsive layouts.",
    side: "left",
  },
];

export function ExperienceTimeline() {
  return (
    <div className="relative w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={Briefcase}
          title="Experience Timeline"
          subtitle="My professional journey building scalable applications and leading engineering teams"
        />

        <div className="relative">
          {/* Desktop Timeline Line - Center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/0 via-primary/50 to-primary/0 hidden lg:block -translate-x-1/2" />

          {/* Mobile Timeline Line - Left */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/0 via-primary/50 to-primary/0 lg:hidden" />

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot - Centered vertically on desktop, aligned on mobile */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                  className="absolute left-[18px] lg:left-1/2 top-1/2 lg:top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))] z-10 border-4 border-background"
                />

                {/* Desktop Layout - Alternating Sides */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                  {/* Left Column */}
                  <div className="lg:pr-8">
                    {exp.side === "left" && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative backdrop-blur-xl bg-card/50 dark:bg-card/30 p-6 rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                            {exp.icon}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-semibold text-primary mb-2">
                            {exp.company} • {exp.period}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="lg:pl-8">
                    {exp.side === "right" && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative backdrop-blur-xl bg-card/50 dark:bg-card/30 p-6 rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                            {exp.icon}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-semibold text-primary mb-2">
                            {exp.company} • {exp.period}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Mobile Layout - Single Column */}
                <div className="lg:hidden ml-16">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative backdrop-blur-xl bg-card/50 dark:bg-card/30 p-6 rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                        {exp.icon}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary mb-2">
                        {exp.company} • {exp.period}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
