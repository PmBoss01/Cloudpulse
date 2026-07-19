"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";

export function AnimatedNumber({
  value,
  className,
  delay = 0,
}: {
  value: number;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const from = hasAnimated.current ? previousValue.current : 0;

    const controls = animate(from, value, {
      duration: hasAnimated.current ? 0.8 : 1.4,
      delay: hasAnimated.current ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toString();
      },
      onComplete() {
        previousValue.current = value;
        hasAnimated.current = true;
      },
    });

    return () => controls.stop();
  }, [value, delay]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
