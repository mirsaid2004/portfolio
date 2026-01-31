"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ThreeDCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 h-full w-full rounded-xl bg-card shadow-xl border border-white/10"
      >
        <div 
          style={{ transform: "translateZ(75px)" }} 
          className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg dark:bg-black"
        >
           <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
             HOVER ME
           </h2>
           <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
             I tilt in 3D
           </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
