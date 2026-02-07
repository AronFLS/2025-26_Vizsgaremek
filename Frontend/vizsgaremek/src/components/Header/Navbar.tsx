import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  useActiveNavPosition,
  useClickOutside,
  useCloseOnMediaChange,
  useEscapeKey,
} from "./nav-hooks/useNavigation";
import type { Position } from "./nav-hooks/useNavigation";
import { DesktopNav } from "./nav-components/DesktopNav";
import { NavIcons } from "./nav-components/NavIcons";
import { AccountMenu } from "./nav-components/AccountMenu";
import { CiMenuBurger } from "react-icons/ci";
import { MobileMenu } from "./nav-components/MobileMenu";
import { IoClose } from "react-icons/io5";

function Navbar() {
  // Media query and refs
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navRef = useRef<HTMLElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const accountToggleRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLDivElement>(null);

  // State management
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Custom hooks
  useActiveNavPosition(navRef, setPosition);
  useClickOutside(accountMenuRef, accountToggleRef, isAccountOpen, () =>
    setIsAccountOpen(false),
  );
  useClickOutside(mobileMenuRef, mobileToggleRef, isMobileMenuOpen, () =>
    setIsMobileMenuOpen(false),
  );
  useEscapeKey(isAccountOpen, () => setIsAccountOpen(false));
  useEscapeKey(isMobileMenuOpen, () => setIsMobileMenuOpen(false));

  useCloseOnMediaChange(
    isMobileMenuOpen,
    () => setIsMobileMenuOpen(false),
    "(min-width: 769px)",
  );

  return (
    <div className="navbar-container">
      <header className="navbar">
        <div className="navbar-main">
          {isMobile ? (
            <div ref={mobileToggleRef}>
              {isMobileMenuOpen ? (
                <IoClose
                  className="menuburger-icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              ) : (
                <CiMenuBurger
                  className="menuburger-icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              )}
            </div>
          ) : (
            <DesktopNav
              navRef={navRef}
              position={position}
              onNavClick={() => {}}
            />
          )}

          <NavLink to="/" className="nav-logo">
            <span>Logo</span>
          </NavLink>

          <NavIcons
            onAccountToggle={() => setIsAccountOpen(!isAccountOpen)}
            accountToggleRef={accountToggleRef}
          />
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        menuRef={mobileMenuRef}
        navRef={navRef}
        onNavClick={() => setIsMobileMenuOpen(false)}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        toggleRef={mobileToggleRef}
      />

      {/* Account menu */}
      <AccountMenu isOpen={isAccountOpen} menuRef={accountMenuRef} />
    </div>
  );
}

export default Navbar;
