import type { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccountMenuProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
};

export const AccountMenu = ({ isOpen, menuRef }: AccountMenuProps) => {
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
          <p className="label">Email address:</p>
          <input type="text" />
          <p className="label" style={{ marginTop: "10px" }}>
            Password:
          </p>
          <input type="password" />
          <button id="signin-button">Sign in</button>
          <p className="p-noaccount">
            Don't have an account? <a href="/account">Sign up</a>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
