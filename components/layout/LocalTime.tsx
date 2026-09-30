"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.location.timeZone,
});

// Ticking every 10s is enough for an HH:MM clock and keeps the page idle otherwise.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}
const getSnapshot = () => formatter.format(Date.now());
const getServerSnapshot = () => "--:--";

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <time dateTime={time === "--:--" ? undefined : time}>{time}</time>;
}
