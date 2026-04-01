import type { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Login } from "./account-components/Login";
import { Logout } from "./account-components/Logout";
import { useAccount } from "../../../hooks/useAccount";

type AccountMenuProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export const AccountMenu = ({ isOpen, menuRef, onClose }: AccountMenuProps) => {
  const { data } = useAccount();
  const isLoggedIn = data !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="sign-in"
          id="toggle-div"
          ref={menuRef}
          initial={{ opacity: 0, y: -10, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -10, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isLoggedIn ? (
            <Logout onClose={onClose} />
          ) : (
            <Login onClose={onClose} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
