"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Send,
  Instagram,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import confetti from "canvas-confetti";
import Image from "next/image";

export function ProfileCard() {
  const locale = useLocale();
  const t = useTranslations("ProfileCard");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Tilt effect - improved
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Reverse the direction so card tilts towards mouse
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDownloadResume = () => {
    setIsDownloading(true);

    // Trigger confetti
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = (rect.left + rect.width / 2) / window.innerWidth;
      const centerY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: centerX, y: centerY },
        colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"],
      });
    }

    // Download resume based on locale
    const resumeFiles: Record<string, string> = {
      en: "/cv_en.pdf",
      uz: "/cv_uz.pdf",
      ru: "/cv_ru.pdf",
    };

    const resumeFile = resumeFiles[locale] || resumeFiles.en;

    // Create temporary link and trigger download
    const link = document.createElement("a");
    link.href = resumeFile;
    link.download = `Mirsaid_Mirakhmedov_CV_${locale}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 rounded-3xl bg-white/5 dark:bg-black/20 p-6 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group"
    >
      {/* Glow Effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/50 transition-colors duration-500" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/30 rounded-full blur-3xl group-hover:bg-secondary/50 transition-colors duration-500" />

      {/* Header / Avatar */}
      <div className="flex flex-col items-center mb-5 relative z-10">
        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-500 mb-3 shadow-lg">
          <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
            <Image
              src="/avatar.jpg"
              alt="Mirsaid Mirakhmedov"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Mirsaid Mirakhmedov
        </h2>
        <p className="text-sm text-muted-foreground font-medium">{t("role")}</p>
      </div>

      {/* Details */}
      <div className="space-y-2.5 relative z-10 mb-5">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-white/5 p-2 rounded-lg border border-white/5">
          <MapPin size={16} />
          <span>{t("location")}</span>
        </div>

        {/* Download Resume Button */}
        <motion.button
          onClick={handleDownloadResume}
          disabled={isDownloading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2.5 text-sm text-foreground bg-primary/20 hover:bg-primary/30 p-2.5 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download
            size={16}
            className={isDownloading ? "animate-bounce" : ""}
          />
          <span>{isDownloading ? t("downloading") : t("downloadResume")}</span>
        </motion.button>
      </div>

      {/* Social Links */}
      <div className="flex gap-2 justify-center pt-3 relative z-10 border-t border-white/10">
        <SocialButton
          icon={<Github size={18} />}
          href="https://github.com/mirsaid2004"
        />
        <SocialButton
          icon={<Linkedin size={18} />}
          href="https://www.linkedin.com/in/mirsaid-mirakhmedov-56a658225/"
        />
        <SocialButton
          icon={<Mail size={18} />}
          href="mailto:mir21.07.2004@gmail.com"
        />
        <SocialButton
          icon={<Send size={18} />}
          href="https://t.me/mirakhmedov_mirsaid"
        />
        <SocialButton
          icon={<Instagram size={18} />}
          href="https://www.instagram.com/mirsaid20045/"
        />
      </div>
    </motion.div>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 border border-transparent hover:border-white/10"
    >
      {icon}
    </a>
  );
}
