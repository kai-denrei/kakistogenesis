import { useEffect } from "react";

/**
 * Lock body scroll while a modal is open.
 *
 * Why a helper, not inline `body.style.overflow = "hidden"`:
 * iOS Safari ignores `overflow: hidden` on <body>. The reliable cross-platform
 * trick is `position: fixed` + restore the scroll offset after unmount.
 *
 * Implementation note: we add a class so the CSS owns the lock styling
 * (see .is-scroll-locked in index.css), and this hook only manages
 * the scroll-position dance.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.top = `-${scrollY}px`;
    body.classList.add("is-scroll-locked");
    return () => {
      body.classList.remove("is-scroll-locked");
      body.style.top = "";
      // Restore scroll without animating
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}
