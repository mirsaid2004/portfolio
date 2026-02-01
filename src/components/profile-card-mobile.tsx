"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

export function ProfileCardMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-2xl bg-white/5 dark:bg-black/20 p-6 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />

      {/* First Row: Avatar + Name/Title */}
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex-shrink-0">
          <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
            {/* Placeholder for avatar image */}
            <span className="text-2xl">👨‍💻</span>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">Antigravity</h2>
          <p className="text-sm text-muted-foreground font-medium">
            Creative Technologist
          </p>
        </div>
      </div>

      {/* Second Row: Location + Website */}
      <div className="flex gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-2 rounded-lg border border-white/5 flex-1">
          <MapPin size={14} />
          <span>Global / Remote</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-2 rounded-lg border border-white/5 flex-1">
          <LinkIcon size={14} />
          <span className="truncate">antigravity.dev</span>
        </div>
      </div>

      {/* Third Row: Social Links */}
      <div className="flex gap-2 justify-center pt-3 relative z-10 border-t border-white/10">
        <SocialButton icon={<Github size={16} />} href="https://github.com" />
        <SocialButton icon={<Twitter size={16} />} href="https://twitter.com" />
        <SocialButton
          icon={<Linkedin size={16} />}
          href="https://linkedin.com"
        />
        <SocialButton
          icon={<Mail size={16} />}
          href="mailto:hello@example.com"
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
      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 border border-transparent hover:border-white/10"
    >
      {icon}
    </a>
  );
}
