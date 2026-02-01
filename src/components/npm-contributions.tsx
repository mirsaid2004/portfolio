"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Download,
  Star,
  GitBranch,
  ExternalLink,
  Code2,
} from "lucide-react";
import { SectionHeader } from "./section-header";
import { useTranslations } from "next-intl";

interface NpmPackage {
  name: string;
  version: string;
  description: string;
  downloads: string;
  stars?: number;
  npmLink: string;
  githubLink?: string;
  features: string[];
  tags: string[];
}

const packages: NpmPackage[] = [
  {
    name: "hover-image-magnifier",
    version: "0.1.0",
    description:
      "A lightweight React component for creating an elegant image magnifier effect on hover. Perfect for e-commerce product galleries and detail-focused image displays.",
    downloads: "0",
    npmLink: "https://www.npmjs.com/package/hover-image-magnifier",
    githubLink: "https://github.com/mirsaid2004/hover-image-magnifier",
    features: [
      "Zero dependencies",
      "Fully responsive",
      "TypeScript support",
      "Customizable magnification",
      "Smooth animations",
    ],
    tags: ["React", "TypeScript", "Image", "UI Component"],
  },
];

export function NpmContributions() {
  const t = useTranslations("NpmContributions");

  return (
    <div className="relative w-full py-20 px-4 overflow-hidden bg-linear-to-b from-background via-background/50 to-background">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Package}
          badge={t("badge")}
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
      </div>

      {/* Packages Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Package Card */}
              <div className="relative rounded-2xl overflow-hidden bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-secondary/10 transition-colors duration-500" />

                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div className="flex-1">
                      {/* Package Icon & Name */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          <Package size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            v{pkg.version}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {pkg.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {pkg.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-full border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex lg:flex-col gap-6 lg:gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50">
                        <Download className="text-primary" size={18} />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("downloads")}
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {pkg.downloads}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50">
                        <GitBranch className="text-primary" size={18} />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("version")}
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {pkg.version}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6 p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
                    <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Code2 size={16} className="text-primary" />
                      {t("keyFeatures")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {pkg.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={pkg.npmLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]"
                    >
                      <Package size={16} />
                      {t("viewOnNpm")}
                      <ExternalLink size={14} />
                    </a>
                    {pkg.githubLink && (
                      <a
                        href={pkg.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm text-foreground rounded-lg font-semibold text-sm border border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300"
                      >
                        <Code2 size={16} />
                        {t("viewSource")}
                        <ExternalLink size={14} />
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

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-card/30 backdrop-blur-xl rounded-2xl border border-border/50"
        >
          <p className="text-muted-foreground mb-4">{t("morePackages")}</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.npmjs.com/~mirsaid_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium text-sm flex items-center gap-2"
            >
              <Package size={16} />
              {t("npmProfile")}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}
