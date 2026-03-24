import type { RefObject } from "react";
import { NavLink } from "react-router-dom";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { useAccount } from "../../../hooks/useAccount";
import * as React from "react";
import { IoCloseOutline } from "react-icons/io5";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Portal from "@mui/material/Portal";

type NavIconsProps = {
  onAccountToggle: () => void;
  accountToggleRef: RefObject<HTMLDivElement | null>;
};
export const NavIcons = ({
  onAccountToggle,
  accountToggleRef,
}: NavIconsProps) => {
  const { data } = useAccount();
  const isLoggedIn = data !== null;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    void event;

    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="medium"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoCloseOutline />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className="nav-icons">
        {isLoggedIn ? (
          <NavLink to="/cart" className="nav-cart">
            <CiShoppingCart />
          </NavLink>
        ) : (
          <CiShoppingCart onClick={handleClick} id="nav-cart-login" />
        )}

        <div
          className="nav-account"
          onClick={onAccountToggle}
          ref={accountToggleRef}
        >
          <CiUser id="account-icon" style={{ cursor: "pointer" }} />
        </div>
      </div>
      <Portal>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Please log in to add products to your cart."
          action={action}
        />
      </Portal>
    </>
  );
};
