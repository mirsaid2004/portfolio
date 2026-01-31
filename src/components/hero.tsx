"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ProfileCard } from "./profile-card";
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

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      {/* 1. Visual Background: React-Bits Waves (Lazy loaded) */}
      <div className="absolute inset-0 z-0 opacity-40 [mask-image:linear-gradient(to_right,transparent,black_70%)] pointer-events-none">
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

      <div className="container px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Typography Section */}
        <div className="flex flex-col gap-6 text-center lg:text-left backdrop-blur-md bg-white/5 dark:bg-black/10 p-8 rounded-2xl border border-white/10 shadow-xl">
          <SplitText 
            text={t('intro')} 
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 drop-shadow-sm"
          />
          
          <div className="flex justify-center lg:justify-start">
             <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow duration-300 shadow-lg">
               {t('viewWork')}
             </MagneticButton>
          </div>
        </div>

        {/* Interactive 3D Element */}
        <div className="flex justify-center items-center">
          <ProfileCard />
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
}
