"use client";

import React, { useEffect, useRef, useState } from "react";
import { ALPHA_FORM_URL } from "../../lib/constants";
import { CTAButton } from "../ui/cta-button";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldHide =
        currentScrollY > lastScrollYRef.current &&
        currentScrollY > 140 &&
        !isOpen;
      setIsHide(shouldHide);
      lastScrollYRef.current = currentScrollY;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      ref={navRef}
      id="nav"
      className={`nav g g3 ${isOpen ? "open" : ""} ${isHide ? "hide" : ""}`}
    >
      <a className="lg" href="#top" aria-label="Q home" onClick={closeMenu}>
        Q
      </a>

      <div className="nl" id="nl">
        <a href="#product" onClick={closeMenu}>
          Product
        </a>
        <a href="#how" onClick={closeMenu}>
          How it works
        </a>
        <a href="#privacy" onClick={closeMenu}>
          Privacy
        </a>
        <a href="#pricing" onClick={closeMenu}>
          Pricing
        </a>
        <a href="#faq" onClick={closeMenu}>
          FAQ
        </a>
      </div>

      <div className="nr">
        <CTAButton
          href={ALPHA_FORM_URL}
          size="small"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Alpha
        </CTAButton>

        <button
          className="mn"
          id="mn"
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <i />
          <i />
        </button>
      </div>
    </nav>
  );
};
