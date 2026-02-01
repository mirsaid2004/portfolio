"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./section-header";
import { useTranslations } from "next-intl";

export function ExperienceTimeline() {
  const t = useTranslations("Experience");

  const jobs = [
    { key: "soff", current: true, achievementCount: 3 },
    { key: "darmon", current: false, achievementCount: 3 },
    { key: "itkey", current: false, achievementCount: 4 },
    { key: "dynbek", current: false, achievementCount: 3 },
  ];

  return (
    <div className="relative w-full py-20 px-4 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Briefcase}
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <div className="relative mt-12">
          {/* Center Timeline Line - Desktop Only */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {jobs.map((job, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={job.key}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[calc(50%-3rem)] group">
                    <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                      {/* Current Badge */}
                      {job.current && (
                        <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                          {t("present")}
                        </div>
                      )}

                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {t(`jobs.${job.key}.title` as any)}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase size={16} className="text-primary" />
                            <span className="font-semibold text-foreground">
                              {t(`jobs.${job.key}.company` as any)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar size={16} className="text-primary" />
                            <span>{t(`jobs.${job.key}.period` as any)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                        {t(`jobs.${job.key}.description` as any)}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-3 pl-2">
                        {Array.from({ length: job.achievementCount }).map(
                          (_, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: achievementIndex * 0.1 }}
                              className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform"
                            >
                              <CheckCircle2
                                size={18}
                                className="text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform"
                              />
                              <span className="text-sm text-muted-foreground leading-relaxed">
                                {t(
                                  `jobs.${job.key}.achievements.${achievementIndex}` as any
                                )}
                              </span>
                            </motion.div>
                          )
                        )}
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                    </div>
                  </div>

                  {/* Center Timeline Dot - Desktop Only */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-4 border-background z-10 flex-shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        job.current ? "bg-primary animate-pulse" : "bg-primary"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
