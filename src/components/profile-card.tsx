"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, MapPin, Link as LinkIcon } from "lucide-react";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-80 rounded-3xl bg-white/5 dark:bg-black/20 p-6 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group"
    >
        {/* Glow Effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/50 transition-colors duration-500" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/30 rounded-full blur-3xl group-hover:bg-secondary/50 transition-colors duration-500" />

      {/* Header / Avatar */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 shadow-lg">
           <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
                {/* Placeholder for avatar image */}
               <span className="text-3xl">👨‍💻</span>
           </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Antigravity</h2>
        <p className="text-sm text-muted-foreground font-medium">Creative Technologist</p>
      </div>

      {/* Details */}
      <div className="space-y-3 relative z-10 mb-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/5 p-2 rounded-lg border border-white/5">
            <MapPin size={16} />
            <span>Global / Remote</span>
        </div>
         <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/5 p-2 rounded-lg border border-white/5">
            <LinkIcon size={16} />
            <span>antigravity.dev</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-center pt-2 relative z-10 border-t border-white/10">
        <SocialButton icon={<Github size={18} />} href="https://github.com" />
        <SocialButton icon={<Twitter size={18} />} href="https://twitter.com" />
        <SocialButton icon={<Linkedin size={18} />} href="https://linkedin.com" />
        <SocialButton icon={<Mail size={18} />} href="mailto:hello@example.com" />
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
