"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Send, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const [subject, setSubject] = useState("");

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-dot-pattern">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 px-6 py-12">
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-6 block font-bold uppercase">
            {t("eyebrow")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]">
            {t("titleStart")} <br />
            <span className="text-primary">{t("titleHighlight")}</span>{" "}
            {t("titleEnd")}
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
            {t("description")}
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-1">
                  {t("emailLabel")}
                </p>
                <a
                  href="mailto:hello@projectblank.io"
                  className="text-foreground font-medium text-lg hover:text-primary transition-colors"
                >
                  hello@projectblank.io
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-1">
                  {t("locationLabel")}
                </p>
                <p className="text-foreground font-medium text-lg">
                  {t("locationValue")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="bg-card/80 dark:bg-card/50 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-3xl shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                    {t("form.nameLabel")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("form.namePlaceholder")}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                    {t("form.emailLabel")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("form.subjectLabel")}
                </label>
                <CustomSelect
                  options={[
                    { value: "freelance", label: "Freelance Project" },
                    { value: "job", label: "Full-time Opportunity" },
                    { value: "collab", label: "Collaboration" },
                    { value: "other", label: "Other" },
                  ]}
                  placeholder={t("form.subjectPlaceholder")}
                  onChange={setSubject}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("form.messageLabel")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("form.messagePlaceholder")}
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground resize-none"
                />
              </div>

              <button
                className="w-full py-4 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                {t("form.submitButton")}
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CustomSelect({
  options,
  placeholder,
  onChange,
}: {
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string, label: string) => {
    setSelected(label);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg bg-background/50 border flex items-center justify-between outline-none transition-all ${
          isOpen
            ? "border-primary ring-2 ring-primary/20"
            : "border-input hover:border-primary/50"
        }`}
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden py-1"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value, option.label)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                  selected === option.label
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
