"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ExternalLink, Github, Zap } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  links: { demo: string; github: string };
  star: { situation: string; task: string; action: string; result: string };
  labels: { viewProject: string; github: string; perf: string };
}

export const ProjectCard = ({
  title,
  description,
  tags,
  links,
  star,
  labels,
}: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
      }}
      className="relative h-[500px] w-full rounded-3xl cursor-pointer group"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-xl overflow-hidden"
      >
        {/* Background / Image Placeholder */}
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        <div className="relative h-full flex flex-col justify-end p-8 z-20">
            {/* Header */}
          <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400">{description}</p>
          </div>

           {/* Performance Tag */}
          <div className="flex gap-2 mb-6">
             {tags.map(tag => (
                 <span key={tag} className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/20 flex items-center gap-1">
                    <Zap size={12} fill="currentColor" /> {tag}
                 </span>
             ))}
          </div>

          {/* STAR Overlay (Slides in on hover) */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md p-8 flex flex-col justify-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 Project Analysis
            </h4>
            <div className="space-y-3 text-sm text-zinc-300">
                <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-blue-400">SITUATION</span>
                    <span>{star.situation}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-purple-400">TASK</span>
                    <span>{star.task}</span>
                </div>
                 <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-yellow-400">ACTION</span>
                    <span>{star.action}</span>
                </div>
                 <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-green-400">RESULT</span>
                    <span>{star.result}</span>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <a href={links.demo} className="flex-1 py-2 bg-white text-black text-center rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                    {labels.viewProject} <ExternalLink size={14} />
                </a>
                 <a href={links.github} className="flex-1 py-2 bg-zinc-800 text-white text-center rounded-lg font-bold text-sm hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 border border-white/10">
                    {labels.github} <Github size={14} />
                </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
