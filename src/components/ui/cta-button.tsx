"use client";

import React, { useRef } from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

export interface CTAButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "outline";
  size?: "regular" | "small" | "large";
  magnetic?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  variant = "primary",
  size = "regular",
  magnetic = true,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}) => {
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const reducedMotion = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (magnetic && !reducedMotion && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    onPointerMove?.(e);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (magnetic && btnRef.current) {
      btnRef.current.style.transform = "";
    }
    onPointerLeave?.(e);
  };

  const classNames = cn(
    "cta",
    variant === "outline" && "o",
    size === "small" && "s",
    magnetic && "mag",
    className
  );

  return (
    <a
      ref={btnRef}
      className={classNames}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
};
