import type { RefObject } from "react";
import { NavLink } from "react-router-dom";
import { CiShoppingCart, CiUser } from "react-icons/ci";

type NavIconsProps = {
  onAccountToggle: () => void;
  accountToggleRef: RefObject<HTMLDivElement | null>;
};

export const NavIcons = ({
  onAccountToggle,
  accountToggleRef,
}: NavIconsProps) => {
  return (
    <div className="nav-icons">
      <NavLink to="/cart" className="nav-cart">
        <CiShoppingCart />
      </NavLink>

      <div
        className="nav-account"
        onClick={onAccountToggle}
        ref={accountToggleRef}
      >
        <CiUser id="account-icon" style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};
