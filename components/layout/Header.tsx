"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 24;

// Scroll position as an external store: no setState inside effects, and the server
// snapshot keeps the first client render identical to the HTML (no hydration mismatch).
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

export function Header() {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);


  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ease-out-expo",
        menuOpen
          ? "border-line bg-bg"
          : scrolled
            ? "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
      )}
    >
      <div aria-hidden="true" className="reading-progress" />
      <div className="px-gutter flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#top" className="text-sm font-medium tracking-tight">
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link group text-sm">
                  <span className="text-label mr-1.5 text-muted transition-colors group-hover:text-accent">
                    {item.index} /
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="text-label -mr-2 px-2 py-3 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Primary" hidden={!menuOpen} className="mobile-navigation border-t border-line md:hidden">
        <ul className="px-gutter py-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-baseline gap-3 py-3 text-2xl font-medium tracking-tight"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-label text-muted">{item.index}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
