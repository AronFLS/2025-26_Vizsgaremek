import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { CiShoppingCart, CiUser, CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function Navbar() {
  // Component State and Refs
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Add refs for the account menu and toggle button
  const navTabsMenuRef = useRef<HTMLDivElement>(null);
  const accountToggleRef = useRef<HTMLDivElement>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isNavTabsOpen, setIsNavTabsOpen] = useState(false);

  // This function calculates the position and size of the active navigation link
  // to move the animated cursor (`Cursor` component) to the correct spot.
  const snapToActive = () => {
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
  };

  // Side Effects Management
  useEffect(() => {
    snapToActive();
  }, [location.pathname]);

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close account or nav tabs menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if the click is outside the account menu and its toggle button
      if (
        isAccountOpen &&
        navTabsMenuRef.current &&
        !navTabsMenuRef.current.contains(target) &&
        accountToggleRef.current &&
        !accountToggleRef.current.contains(target)
      ) {
        setIsAccountOpen(false);
      }

      // Check if the click is outside the nav tabs menu and its toggle button
      if (
        isNavTabsOpen &&
        navTabsMenuRef.current &&
        !navTabsMenuRef.current.contains(target) &&
        accountToggleRef.current &&
        !accountToggleRef.current.contains(target)
      ) {
        setIsNavTabsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountOpen, isNavTabsOpen]);

  // Close search or account or nav tabs menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearchQuery("");
        }
        if (isAccountOpen) {
          setIsAccountOpen(false);
        }
        if (isNavTabsOpen) {
          setIsNavTabsOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen, isAccountOpen, isNavTabsOpen]);

  // Event Handlers
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleOverlayClick = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  // Component Rendering (JSX)
  return (
    <>
      {/* Blur overlay for when the search bar is open */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
          />
        )}
      </AnimatePresence>

      {/* Main header and navbar structure */}
      <header className={`navbar ${isSearchOpen ? "navbar-expanded" : ""}`}>
        <div className="navbar-main">
          {isMobile ? (
            // Mobile navigation menu toggle
            <div
              className="nav-mobile-menu"
              onClick={() => setIsNavTabsOpen(!isNavTabsOpen)}
              ref={accountToggleRef}
            >
              <nav
                ref={navRef}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CiMenuBurger />
                <Cursor position={position} />
              </nav>
            </div>
          ) : (
            // Desktop navigation links
            <nav
              ref={navRef}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <NavTab to="/phones" onClick={() => setIsNavTabsOpen(false)}>
                iPhones
              </NavTab>
              <NavTab to="/notebooks" onClick={() => setIsNavTabsOpen(false)}>
                MacBooks
              </NavTab>
              <NavTab to="/accessories" onClick={() => setIsNavTabsOpen(false)}>
                Accessories
              </NavTab>

              <Cursor position={position} />
            </nav>
          )}
          <NavLink to="/" className="nav-logo">
            <span>Logo</span>
          </NavLink>

          {/* Icons for search, cart, and user account */}
          <div className="nav-icons">
            <button
              onClick={handleSearchToggle}
              className="search-toggle-btn"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              {isSearchOpen ? <IoCloseOutline /> : <CiSearch />}
            </button>

            <NavLink to="/cart" className="nav-cart">
              <CiShoppingCart />
            </NavLink>

            <div
              className="nav-account"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              ref={accountToggleRef}
            >
              <CiUser id="account-icon" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>

        {/* Search input area that appears when toggled */}
        <div
          className={`search-container ${isSearchOpen ? "search-container-visible" : ""}`}
        >
          <div className="search-input-wrapper">
            <CiSearch className="search-input-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Pop-up for user account sign-in */}
      <AnimatePresence>
        {isAccountOpen && (
          <motion.div
            className="sign-in"
            id="toggle-div"
            ref={navTabsMenuRef}
            initial={{ opacity: 0, y: -10, x: 200 }}
            animate={{ opacity: 1, y: 0, x: 200 }}
            exit={{ opacity: 0, y: -10, x: 200 }}
            transition={{ duration: 0.2 }}
          >
            <p className="label">Email address:</p>
            <input type="text" />
            <p className="label" style={{ marginTop: "10px" }}>
              Password:
            </p>
            <input type="password" />
            <button id="signin-button">Sign in</button>
            <p className="p-noaccount">
              {" "}
              Don't have an account? <a href="/account">Sign up</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pop-up for mobile navigation links */}
      <AnimatePresence>
        {isNavTabsOpen && (
          <motion.div
            className="nav-tabs-mobile"
            id="toggle-div"
            ref={navTabsMenuRef}
            initial={{ opacity: 0, y: -10, x: -50 }}
            animate={{ opacity: 1, y: 0, x: -50 }}
            exit={{ opacity: 0, y: -10, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            <NavTab to="/phones" onClick={() => setIsNavTabsOpen(false)}>
              iPhones
            </NavTab>
            <NavTab to="/notebooks" onClick={() => setIsNavTabsOpen(false)}>
              MacBooks
            </NavTab>
            <NavTab to="/accessories" onClick={() => setIsNavTabsOpen(false)}>
              Accessories
            </NavTab>

            <Cursor position={position} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable component for individual navigation links.
const NavTab = ({
  children,
  to,
  onClick,
}: {
  children: string;
  to: string;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <NavLink
      ref={ref}
      to={to}
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      style={{ position: "relative", zIndex: 10 }}
      onClick={onClick}
    >
      <span>{children}</span>
    </NavLink>
  );
};

// Animated cursor that highlights the active navigation link.
const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.div
      animate={{
        ...position,
      }}
      className="nav-cursor"
      style={{
        position: "absolute",
        zIndex: 0,
        height: "100%",
        borderRadius: "10px",
        pointerEvents: "none",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.28)",
      }}
    />
  );
};

// Type definition for the position state.
type Position = {
  left: number;
  width: number;
  opacity: number;
};

export default Navbar;
