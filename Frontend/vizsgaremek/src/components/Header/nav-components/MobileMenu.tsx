import type { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "../nav-constants/navConstants";
import { NavTab } from "./NavTab";

type MobileMenuProps = {
  navRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onToggle: () => void;
  onNavClick: () => void;
  toggleRef: RefObject<HTMLDivElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
};

export const MobileMenu = ({
  navRef,
  isOpen,
  onNavClick,
  menuRef,
}: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="nav-tabs-mobile"
          id="toggle-div"
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav ref={navRef}>
            {NAV_ITEMS.map((item) => {
              return (
                <NavTab key={item.to} to={item.to} onClick={onNavClick}>
                  {item.label}
                </NavTab>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
