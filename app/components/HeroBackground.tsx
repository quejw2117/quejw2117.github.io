"use client";

import { useEffect, useRef } from "react";

type ConnectionHints = EventTarget & {
  saveData?: boolean;
  effectiveType?: string;
};

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)");
    const connection = (navigator as Navigator & { connection?: ConnectionHints }).connection;
    let pageLoaded = document.readyState === "complete";
    let inView = !("IntersectionObserver" in window);

    function syncPlayback() {
      if (!video) return;
      const slowNetwork = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
      if (!pageLoaded || !inView || document.hidden || motion.matches || connection?.saveData || slowNetwork) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) {
        video.src = mobile.matches ? "/hero-background-mobile.mp4" : "/hero-background-web.mp4";
      }
      void video.play().catch(() => { /* The first frame remains visible if autoplay is blocked. */ });
    }

    function onPageLoad() {
      pageLoaded = true;
      syncPlayback();
    }

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          syncPlayback();
        })
      : null;
    observer?.observe(video);
    window.addEventListener("load", onPageLoad);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener?.("change", syncPlayback);
    connection?.addEventListener?.("change", syncPlayback);
    syncPlayback();
    return () => {
      observer?.disconnect();
      window.removeEventListener("load", onPageLoad);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener?.("change", syncPlayback);
      connection?.removeEventListener?.("change", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video ref={videoRef} className="hero-video" muted loop playsInline preload="none"
      poster="/hero-poster-web.webp" aria-hidden="true" />
  );
}
