"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ProfileCard } from "./profile-card";
import { ProfileCardMobile } from "./profile-card-mobile";
import { MagneticButton } from "./magnetic-button";
import { SplitText } from "./split-text";
import { motion, useScroll, useTransform } from "framer-motion";

const Waves = dynamic(() => import("./waves").then((mod) => mod.Waves), {
  ssr: false,
});

export function Hero() {
  const t = useTranslations("HomePage");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");

    if (aboutSection) {
      // Get the absolute position of the about section
      const rect = aboutSection.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - 100; // 100px offset for navbar

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-background px-4 md:px-6 py-20 md:py-0">
      {/* 1. Visual Background: React-Bits Waves (Lazy loaded) */}
      <div className="absolute inset-0 z-0 opacity-40 mask-[linear-gradient(to_right,transparent,black_70%)] pointer-events-none">
        <Waves
          lineColor="#1F2833"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      <div className="container relative z-10 max-w-6xl">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-4">
          {/* Typography Section - FIRST */}
          <div className="flex flex-col gap-4 text-center backdrop-blur-md bg-white/5 dark:bg-black/10 p-4 rounded-xl border border-white/10 shadow-xl">
            <SplitText
              text={t("intro")}
              className="text-base sm:text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 drop-shadow-sm leading-tight"
            />

            <div className="flex justify-center mt-1">
              <MagneticButton
                onClick={scrollToAbout}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow duration-300 shadow-lg cursor-pointer"
              >
                {t("viewWork")}
              </MagneticButton>
            </div>
          </div>

          {/* ProfileCard Mobile - SECOND */}
          <ProfileCardMobile />
        </div>

        {/* Desktop Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
            {/* Typography Section */}
            <div className="flex flex-col gap-6 text-left backdrop-blur-md bg-white/5 dark:bg-black/10 p-8 rounded-2xl border border-white/10 shadow-xl max-w-2xl">
              <SplitText
                text={t("intro")}
                className="text-2xl lg:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 drop-shadow-sm leading-tight"
              />

              <div className="flex justify-start mt-2">
                <MagneticButton
                  onClick={scrollToAbout}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow duration-300 shadow-lg cursor-pointer"
                >
                  {t("viewWork")}
                </MagneticButton>
              </div>
            </div>

            {/* Interactive 3D Element */}
            <div className="flex justify-center items-center lg:justify-end">
              <ProfileCard />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-linear-to-b from-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
}
