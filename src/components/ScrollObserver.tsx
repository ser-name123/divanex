"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    // Respect user's motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-init").forEach((el) => {
        el.classList.add("reveal-visible");
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });

    const attachObservers = () => {
      const elements = document.querySelectorAll(".reveal-init:not(.reveal-visible)");
      elements.forEach((el) => observer.observe(el));
    };

    // Initial scan
    attachObservers();

    // Re-check on mutation for dynamically mounted nodes
    const mutationObserver = new MutationObserver(() => {
      attachObservers();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
