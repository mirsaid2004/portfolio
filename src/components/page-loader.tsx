"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface PageLoaderProps {
  variant?: "minimal" | "full" | "sections";
}

export function PageLoader({ variant = "full" }: PageLoaderProps) {
  const t = useTranslations("PageLoader");

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Animated gradient orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent"
          />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (variant === "sections") {
    return (
      <div className="space-y-8 px-6 py-12">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="space-y-4"
          >
            {/* Section header skeleton */}
            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />

            {/* Content lines skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded-lg animate-pulse w-full" />
              <div className="h-4 bg-muted rounded-lg animate-pulse w-5/6" />
              <div className="h-4 bg-muted rounded-lg animate-pulse w-4/5" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Full page loader (default)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-dot-pattern px-6">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Main loader icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="relative w-20 h-20">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full"
            />

            {/* Inner pulsing circle */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-2 bg-primary/10 rounded-full"
            />

            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground mb-12"
        >
          {t("description")}
        </motion.p>

        {/* Progress bar with animated fill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Loading dots animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="w-2.5 h-2.5 bg-primary rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
