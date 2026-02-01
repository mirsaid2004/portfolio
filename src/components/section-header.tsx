"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  badge,
}: SectionHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Icon className="text-primary" size={20} />
            <span className="text-sm font-semibold text-primary">{badge}</span>
          </div>
        )}
        {!badge && (
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
            <Icon className="text-primary" size={28} />
          </div>
        )}
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>
    </div>
  );
}
