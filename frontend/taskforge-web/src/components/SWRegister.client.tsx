"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Don’t register on localhost if you want, but it’s fine during dev too.
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("SW register failed", err));
    }
  }, []);
  return null;
}