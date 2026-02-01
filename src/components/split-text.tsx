"use client";

import BlurText from "./blur-text";

export function SplitText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <BlurText
      text={text}
      className={className}
      animateBy="words"
      delay={120}
      direction="bottom"
    />
  );
}
