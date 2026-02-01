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

export function ProfileCardMobile() {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-xl bg-white/5 dark:bg-black/20 p-4 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/30 rounded-full blur-3xl" />

      {/* First Row: Avatar + Name/Title */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-12 h-12 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex-shrink-0">
          <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
            <Image
              src="/avatar.jpg"
              alt="Mirsaid Mirakhmedov"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-foreground">
            Mirsaid Mirakhmedov
          </h2>
          <p className="text-xs text-muted-foreground font-medium">
            {t("role")}
          </p>
        </div>
      </div>

      {/* Second Row: Location */}
      <div className="flex gap-2 mb-2 relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 flex-1">
          <MapPin size={12} />
          <span>{t("location")}</span>
        </div>
      </div>

      {/* Download Resume Button */}
      <motion.button
        onClick={handleDownloadResume}
        disabled={isDownloading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 text-xs text-foreground bg-primary/20 hover:bg-primary/30 p-2 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 font-medium mb-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
        <span>{isDownloading ? t("downloading") : t("downloadResume")}</span>
      </motion.button>

      {/* Social Links */}
      <div className="flex gap-1.5 justify-center pt-2 relative z-10 border-t border-white/10">
        <SocialButton
          icon={<Github size={14} />}
          href="https://github.com/mirsaid2004"
        />
        <SocialButton
          icon={<Linkedin size={14} />}
          href="https://www.linkedin.com/in/mirsaid-mirakhmedov-56a658225/"
        />
        <SocialButton
          icon={<Mail size={14} />}
          href="mailto:mir21.07.2004@gmail.com"
        />
        <SocialButton
          icon={<Send size={14} />}
          href="https://t.me/mirakhmedov_mirsaid"
        />
        <SocialButton
          icon={<Instagram size={14} />}
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
      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 border border-transparent hover:border-white/10"
    >
      {icon}
    </a>
  );
}
