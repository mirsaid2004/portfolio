"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Moon, Sun, Globe } from "lucide-react";

const navItems = [
  { name: "home", href: "/" },
  { name: "work", href: "/projects" }, // Placeholder
  { name: "about", href: "/about" }, // Placeholder
  { name: "contact", href: "/contact" },
];

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("Navigation");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl rounded-full border transition-all duration-300 ${
        scrolled
          ? " backdrop-blur-xl border-white/20 shadow-xl py-3 px-6"
          : "bg-white/5 dark:bg-black/5 backdrop-blur-sm border-white/10 py-4 px-6"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between text-foreground">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          Blank.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 dark:bg-black/5 rounded-full px-2 py-1 border border-white/5">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setHoveredIndex(null);
                }, 50);
              }}
            >
              <span className="relative z-10">{t(item.name)}</span>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  layoutId="navbarhub-hover"
                  style={{
                    backgroundColor: resolvedTheme === "dark" ? "#333" : "#ccc",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 90, scale: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const otherLocale = locale === "en" ? "fr" : "en"; // Simplified for 2 locales

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
      >
        <Globe size={16} />
        <span className="uppercase">{locale}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-24 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-xl overflow-hidden py-1"
          >
            {["en", "fr"].map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${
                  locale === l ? "font-bold text-primary" : ""
                }`}
              >
                {l === "en" ? "English" : "Français"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
