import { useEffect } from "react";
import type { RefObject } from "react";
import { useLocation } from "react-router-dom";

export type Position = {
  left: number;
  width: number;
  opacity: number;
};

/**
 * Hook to snap the animated cursor to the active navigation link
 */
export const useActiveNavPosition = (
  navRef: RefObject<HTMLElement | null>,
  setPosition: (pos: Position | ((prev: Position) => Position)) => void,
) => {
  const location = useLocation();

  useEffect(() => {
    if (!navRef.current) return;

    const activeLink = navRef.current.querySelector(
      ".nav-link.active",
    ) as HTMLElement;

    if (activeLink) {
      const { width } = activeLink.getBoundingClientRect();
      setPosition({
        left: activeLink.offsetLeft,
        width,
        opacity: 1,
      });
    } else {
      setPosition((pv) => ({ ...pv, opacity: 0 }));
    }
  }, [location.pathname, navRef, setPosition]);
};

/**
 * Hook to handle clicking outside a ref element
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  toggleRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, ref, toggleRef, onClose]);
};

/**
 * Hook to handle Escape key press
 */
export const useEscapeKey = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
};

/** Hook to close menu on media query change */
export const useCloseOnMediaChange = (
  isOpen: boolean,
  onClose: () => void,
  mediaQuery: string,
) => {
  useEffect(() => {
    const mql = window.matchMedia(mediaQuery);

    // Close immediately if already matches
    if (isOpen && mql.matches) {
      onClose();
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (isOpen && e.matches) {
        onClose();
      }
    };

    mql.addEventListener("change", handleMediaChange);
    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [isOpen, onClose, mediaQuery]);
};
