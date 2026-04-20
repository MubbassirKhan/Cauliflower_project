// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent automatic scroll restoration on hard refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Jump to the top of the page on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null; // ⟶ this component renders nothing
}
