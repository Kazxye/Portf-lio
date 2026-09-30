"use client";

import { useEffect } from "react";

/**
 * Entrance motion for [data-reveal] elements. Mounted once; renders nothing.
 *
 * Only elements that start below the fold are hidden, and only by JavaScript, so there is
 * no flash on first paint, nothing is hidden without JS, and content in view on load is
 * never delayed. Reduced motion skips the effect entirely.
 */
export function ScrollReveal() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let sequence = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(sequence++, 4) * 70}ms`);
          el.dataset.reveal = "shown";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of pending) {
      el.dataset.reveal = "pending";
      observer.observe(el);
    }

    const showAll = () => {
      if (!motionPreference.matches) return;
      observer.disconnect();
      for (const el of pending) el.dataset.reveal = "shown";
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const el = event.target.closest<HTMLElement>('[data-reveal="pending"]');
      if (el) {
        el.style.setProperty("--reveal-delay", "0ms");
        el.dataset.reveal = "shown";
        observer.unobserve(el);
      }
    };
    motionPreference.addEventListener("change", showAll);
    document.addEventListener("focusin", onFocus);

    return () => {
      motionPreference.removeEventListener("change", showAll);
      document.removeEventListener("focusin", onFocus);
      observer.disconnect();
      // Never leave content hidden if the component unmounts mid-scroll.
      for (const el of pending) el.dataset.reveal = "shown";
    };
  }, []);

  return null;
}
