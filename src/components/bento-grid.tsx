"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Globe, Layers, Code, Zap } from "lucide-react";
import { useTheme } from "next-themes";

export function BentoGrid() {
  const t = useTranslations("Bento");
  const locale = useLocale();
  const { theme } = useTheme();
  
  // Stagger animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto px-4"
    >
      <StatusTile t={t} variants={item} />
      <TechStackTile t={t} variants={item} />
      <LocaleTile t={t} locale={locale} variants={item} />
      <BioTile t={t} variants={item} />
    </motion.div>
  );
}

function StatusTile({ t, variants }: { t: any; variants: any }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZoneName: "short",
        }).format(new Date())
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={variants}
      className="col-span-1 md:col-span-1 h-48 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group hover:border-white/20 transition-colors"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Zap size={48} />
      </div>
      
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs font-semibold tracking-wider text-green-500 uppercase">
          {t("available")}
        </span>
      </div>
      
      <div>
        <div className="text-4xl font-bold tracking-tighter text-foreground">
          {time.split(" ")[0]} 
          <span className="text-lg font-normal text-muted-foreground ml-1">
             {time.split(" ")[1]} {time.split(" ")[2]}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Local Time</p>
      </div>
    </motion.div>
  );
}

function TechStackTile({ t, variants }: { t: any; variants: any }) {
  const stack = [
    { name: "Next.js", icon: "▲" }, // Using text/unicode for simplicity or could be SVG
    { name: "Framer", icon: "F" },
    { name: "TypeScript", icon: "TS" },
  ];

  return (
    <motion.div
      variants={variants}
      className="col-span-1 md:col-span-1 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-white/20 transition-colors"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
        {t("techStack")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech.name}
            className="px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors cursor-default"
          >
            {tech.name}
          </span>
        ))}
      </div>
      <div className="absolute -bottom-4 -right-4 text-9xl font-bold opacity-5 pointer-events-none select-none">
        TS
      </div>
    </motion.div>
  );
}

function LocaleTile({ t, locale, variants }: { t: any; locale: string; variants: any }) {
  return (
    <motion.div
      variants={variants}
      className="col-span-1 md:col-span-1 h-48 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-white/20 transition-colors"
    >
      <div className="mb-4 relative">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-3xl shadow-inner">
          {locale === "en" ? "🇺🇸" : "🇫🇷"}
        </div>
        <motion.div 
            className="absolute -inset-1 rounded-full border border-blue-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <h3 className="text-lg font-bold">{t("globalReady")}</h3>
      <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">
        {locale === "en" ? "English" : "Français"}
      </p>
    </motion.div>
  );
}

function BioTile({ t, variants }: { t: any; variants: any }) {
  return (
    <motion.div
      variants={variants}
      className="col-span-1 md:col-span-3 h-auto md:h-48 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group hover:border-white/20 transition-colors"
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="md:w-2/3 z-10">
        <h3 className="text-sm font-medium text-primary mb-2 uppercase tracking-wider flex items-center gap-2">
          <Layers size={16} />
          {t("bioTitle")}
        </h3>
        <p className="text-2xl md:text-3xl font-medium leading-tight text-foreground/90">
          "{t("bio")}"
        </p>
      </div>
      
      <div className="md:w-1/3 flex justify-center md:justify-end z-10">
         <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-900 rotate-3 border border-white/10 shadow-2xl flex items-center justify-center">
            <Code className="text-foreground/20" size={40} />
         </div>
      </div>
    </motion.div>
  );
}
