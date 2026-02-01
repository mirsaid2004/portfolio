"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Home, Wrench, HardHat } from "lucide-react";

export default function UnderConstruction() {
  const t = useTranslations("UnderConstruction");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-dot-pattern px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative inline-block mb-8"
        >
          {/* Animated Construction Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-4 border-primary/20"
          >
            <HardHat size={64} className="text-primary" />
          </motion.div>

          {/* Rotating Wrench */}
          <motion.div
            className="absolute -bottom-2 -right-2"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              <Wrench size={20} className="text-primary" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-foreground mb-4"
        >
          {t("title")}
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-primary mb-6"
        >
          {t("subtitle")}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
        >
          {t("description")}
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Building something amazing...
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
          >
            <Home size={18} />
            {t("backHome")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
