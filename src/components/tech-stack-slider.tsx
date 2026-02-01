"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import {
  Code2,
  Boxes,
  Server,
  Palette,
  GitBranch,
  Container,
  Cog,
  Workflow,
  TestTube2,
  FileCode,
  Layers,
  Braces,
} from "lucide-react";
import { SectionHeader } from "./section-header";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const techStack: TechItem[] = [
  { name: "JS/TS", icon: <FileCode size={32} />, category: "Language" },
  { name: "React", icon: <Boxes size={32} />, category: "Frontend" },
  { name: "Next.js", icon: <Layers size={32} />, category: "Framework" },
  { name: "Node.js", icon: <Server size={32} />, category: "Backend" },
  { name: "NestJS", icon: <Braces size={32} />, category: "Framework" },
  { name: "Tailwind/Sass", icon: <Palette size={32} />, category: "Styling" },
  { name: "Git", icon: <GitBranch size={32} />, category: "Version Control" },
  { name: "Docker", icon: <Container size={32} />, category: "DevOps" },
  { name: "PM2", icon: <Cog size={32} />, category: "Process Manager" },
  { name: "Jenkins", icon: <Workflow size={32} />, category: "CI/CD" },
  {
    name: "Testing",
    icon: <TestTube2 size={32} />,
    category: "Quality Assurance",
  },
];

// Duplicate the array for seamless infinite scroll
const duplicatedTechStack = [
  ...techStack,
  ...techStack,
  ...techStack,
  ...techStack,
];

export function TechStackSlider() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isRecentlyHovered, setIsRecentlyHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseSpeed = 1; // pixels per frame

  // Calculate base distance for one loop
  const itemWidth = 144; // 128px card + 16px gap
  const loopDistance = techStack.length * itemWidth;

  // Add global mouse event listeners for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = e.clientX - dragStartX;
      const currentX = x.get();
      const newX = currentX + delta;

      // Update velocity based on drag speed
      setScrollVelocity(-delta);

      setDragStartX(e.clientX);

      // Reset position for infinite loop
      if (newX <= -loopDistance * 2) {
        x.set(newX + loopDistance);
      } else if (newX >= 0) {
        x.set(newX - loopDistance);
      } else {
        x.set(newX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (containerRef.current) {
          containerRef.current.style.cursor = "grab";
        }
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStartX, x, loopDistance]);

  // Auto-scroll animation with debounce
  useAnimationFrame((time, delta) => {
    if (!isDragging && hoveredIndex === null && !isRecentlyHovered) {
      const currentX = x.get();
      const newX = currentX - (baseSpeed + Math.abs(scrollVelocity) * 0.1);

      // Reset position for infinite loop
      if (newX <= -loopDistance) {
        x.set(newX + loopDistance);
      } else {
        x.set(newX);
      }
    }

    // Decay scroll velocity
    if (scrollVelocity !== 0) {
      setScrollVelocity(scrollVelocity * 0.95);
      if (Math.abs(scrollVelocity) < 0.1) {
        setScrollVelocity(0);
      }
    }
  });

  // Handle hover with debounce
  const handleMouseEnter = (index: number) => {
    if (isDragging) return;

    setHoveredIndex(index);
    setIsRecentlyHovered(true);

    // Clear existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);

    // Set a debounce delay before allowing auto-scroll to resume
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsRecentlyHovered(false);
    }, 500); // 500ms debounce delay
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse wheel scroll (horizontal)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    const currentX = x.get();
    const newX = currentX - delta;

    // Update velocity for dynamic speed
    setScrollVelocity(delta / 10);

    // Reset position for infinite loop
    if (newX <= -loopDistance * 2) {
      x.set(newX + loopDistance);
    } else if (newX >= 0) {
      x.set(newX - loopDistance);
    } else {
      x.set(newX);
    }
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  return (
    <div className="relative w-full py-12 px-4 overflow-hidden bg-linear-to-b from-background via-background/50 to-background">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={Code2}
          title="Tech Stack"
          subtitle="Technologies I work with to build amazing experiences"
        />
      </div>

      {/* Slider Container */}
      <div className="relative h-52 max-w-7xl mx-auto">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex overflow-hidden cursor-grab select-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
        >
          <motion.div className="flex gap-6 relative" style={{ x }}>
            {duplicatedTechStack.map((tech, index) => (
              <div
                key={index}
                className="relative shrink-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Tech Card */}
                <div className="w-32 h-32 rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                  {/* Animated gradient glow on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="text-5xl relative z-10 group-hover:brightness-110 transition-all duration-300">
                    {tech.icon}
                  </div>

                  {/* Category Badge */}
                  <div className="text-[10px] font-medium text-muted-foreground group-hover:text-primary px-2 py-1 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-all duration-300 relative z-10">
                    {tech.category}
                  </div>

                  {/* Smooth shine effect on hover - improved */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 80%, transparent 100%)",
                        transform: "skewX(-20deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}
