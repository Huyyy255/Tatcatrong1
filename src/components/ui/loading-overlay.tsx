
"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
}

export default function LoadingOverlay({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
