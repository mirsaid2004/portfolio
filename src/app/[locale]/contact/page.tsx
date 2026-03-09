"use client";

import { ContactForm } from "@/components/contact-form";
import { PageSuspense } from "@/components/page-suspense";

export default function ContactPage() {
  return (
    <PageSuspense loaderVariant="full">
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-dot-pattern">
        <ContactForm />
      </div>
    </PageSuspense>
  );
}
