import { motion } from "framer-motion";
import type { Position } from "../nav-hooks/useNavigation";

type CursorProps = {
  position: Position;
};

export const Cursor = ({ position }: CursorProps) => {
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
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.28)",
      }}
    />
  );
};
