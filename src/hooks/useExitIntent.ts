"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rh_exit_seen";

export function useExitIntent() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    if (localStorage.getItem(STORAGE_KEY) === "true") return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY < 20) {
        setTriggered(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setTriggered(false);
  }

  return { triggered, dismiss };
}
