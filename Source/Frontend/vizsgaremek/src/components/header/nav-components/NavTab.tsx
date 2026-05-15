import { useRef } from "react";
import { NavLink } from "react-router-dom";

type NavTabProps = {
  children: string;
  to: string;
  onClick: () => void;
};

export const NavTab = ({ children, to, onClick }: NavTabProps) => {
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
