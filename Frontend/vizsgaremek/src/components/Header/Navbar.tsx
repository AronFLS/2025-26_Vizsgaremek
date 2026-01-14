import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";


function Navbar() {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const snapToActive = () => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(".nav-link.active") as HTMLElement;

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

  useEffect(() => {
    snapToActive();
  }, [location.pathname]);

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

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

  return (
    <>
      {/* Blur overlay */}
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

      <header className={`navbar ${isSearchOpen ? "navbar-expanded" : ""}`}>
        <div className="navbar-main">
          <nav
            ref={navRef}
            style={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <NavTab to="/phones">
              iPhones
            </NavTab>
            <NavTab to="/notebooks">
              MacBooks
            </NavTab>
            <NavTab to="/accessories">
              Accessories
            </NavTab>

            <Cursor position={position} />
          </nav>

          <NavLink to="/" className="nav-logo">
            <span>Logo</span>
          </NavLink>

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
            <NavLink to="/account" className="nav-account">
              <CiUser />
            </NavLink>
          </div>
        </div>

        {/* Search input area - always rendered, animated via CSS */}
        <div className={`search-container ${isSearchOpen ? "search-container-visible" : ""}`}>
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
    </>
  );
}
 
const NavTab = ({
  children,
  to,
}: {
  children: string;
  to: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <NavLink
      ref={ref}
      to={to}
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      style={{ position: "relative", zIndex: 10 }}
    >
      <span>{children}</span>
    </NavLink>
  );
};

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
        border: "1px solid rgba(255, 255, 255, 0.28)"
      }}
    />
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};


export default Navbar;
