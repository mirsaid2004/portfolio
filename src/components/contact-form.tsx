"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  ChevronDown,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const t = useTranslations("Contact");

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, t("form.validation.nameMin"))
      .max(50, t("form.validation.nameMax"))
      .required(t("form.validation.nameRequired")),
    email: Yup.string()
      .email(t("form.validation.emailInvalid"))
      .required(t("form.validation.emailRequired")),
    subject: Yup.string().required(t("form.validation.subjectRequired")),
    message: Yup.string()
      .min(10, t("form.validation.messageMin"))
      .max(500, t("form.validation.messageMax"))
      .required(t("form.validation.messageRequired")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      // Initialize EmailJS
      emailjs.init({
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      });

      // Send email
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: values.name,
            to_name: "Antigravity",
            from_email: values.email,
            to_email: "hello@projectblank.io",
            subject: values.subject,
            message: values.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            setLoading(false);
            setShowSuccessModal(true);
            triggerConfetti();
            resetForm();
          },
          (error: Error) => {
            setLoading(false);
            console.error(error);
            alert(t("form.error"));
          }
        );
    },
  });

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <>
      <div className="relative w-full py-20 px-4 bg-linear-to-b from-background via-background/50 to-background">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-24`}>
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <span className="text-primary font-mono text-sm tracking-wider mb-6 block font-bold uppercase">
                {t("getInTouch")}
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]">
                {t("titleStart")} <br />
                <span className="text-primary">{t("titleHighlight")}</span>
              </h2>
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
              initial={{ opacity: 0, x: 50, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-card/80 dark:bg-card/50 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-3xl shadow-2xl">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                        {t("form.nameLabel")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("form.namePlaceholder")}
                        disabled={loading}
                        className={`w-full px-4 py-3 rounded-lg bg-background/50 border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                          formik.touched.name && formik.errors.name
                            ? "border-red-500"
                            : "border-input"
                        }`}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                        {t("form.emailLabel")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("form.emailPlaceholder")}
                        disabled={loading}
                        className={`w-full px-4 py-3 rounded-lg bg-background/50 border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : "border-input"
                        }`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                      {t("form.subjectLabel")}
                    </label>
                    <CustomSelect
                      options={[
                        {
                          value: "Freelance Project",
                          label: t("form.subjects.freelance"),
                        },
                        {
                          value: "Full-time Opportunity",
                          label: t("form.subjects.fulltime"),
                        },
                        {
                          value: "Collaboration",
                          label: t("form.subjects.collaboration"),
                        },
                        {
                          value: "Other",
                          label: t("form.subjects.other"),
                        },
                      ]}
                      placeholder={t("form.subjectPlaceholder")}
                      value={formik.values.subject}
                      onChange={(value) =>
                        formik.setFieldValue("subject", value)
                      }
                      onBlur={() => formik.setFieldTouched("subject", true)}
                      disabled={loading}
                      error={formik.touched.subject && formik.errors.subject}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                      {t("form.messageLabel")}
                    </label>
                    <textarea
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={4}
                      placeholder={t("form.messagePlaceholder")}
                      disabled={loading}
                      className={`w-full px-4 py-3 rounded-lg bg-background/50 border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        formik.touched.message && formik.errors.message
                          ? "border-red-500"
                          : "border-input"
                      }`}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    className="w-full py-4 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    type="submit"
                    disabled={loading || !formik.isValid}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t("form.sending")}
                      </>
                    ) : (
                      <>
                        {t("form.submitButton")}
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-md w-full bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/50 hover:bg-background border border-border/50 hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              >
                <X size={16} className="text-foreground" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-10 text-center">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
                >
                  <CheckCircle2 size={40} className="text-primary" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-foreground mb-3"
                >
                  {t("form.success.title")}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6 leading-relaxed"
                >
                  {t("form.success.description")}
                </motion.p>

                {/* Action Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowSuccessModal(false)}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t("form.success.button")}
                </motion.button>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
}: {
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string | false;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg bg-background/50 border flex items-center justify-between outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? "border-red-500"
            : isOpen
            ? "border-primary ring-2 ring-primary/20"
            : "border-input hover:border-primary/50"
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
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
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                  value === option.value
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
