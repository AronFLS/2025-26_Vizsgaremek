import type { RefObject } from "react";
import { NavTab } from "./NavTab";
import { Cursor } from "./NavCursor";
import type { Position } from "../nav-hooks/useNavigation";
import { NAV_ITEMS } from "../nav-constants/navItems";

type DesktopNavProps = {
  navRef: RefObject<HTMLElement | null>;
  position: Position;
  onNavClick: () => void;
};

export const DesktopNav = ({
  navRef,
  position,
  onNavClick,
}: DesktopNavProps) => {
  return (
    <nav ref={navRef}>
      {NAV_ITEMS.map((item) => (
        <NavTab key={item.to} to={item.to} onClick={onNavClick}>
          {item.label}
        </NavTab>
      ))}
      <Cursor position={position} />
    </nav>
  );
};

