"use client";

import { Suspense, ReactNode } from "react";
import { PageLoader } from "./page-loader";

interface PageSuspenseProps {
  children: ReactNode;
  loaderVariant?: "minimal" | "full" | "sections";
}

export function PageSuspense({
  children,
  loaderVariant = "full",
}: PageSuspenseProps) {
  return (
    <Suspense fallback={<PageLoader variant={loaderVariant} />}>
      {children}
    </Suspense>
  );
}
