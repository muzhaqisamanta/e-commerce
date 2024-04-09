import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Reveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start({ opacity: 1, y: 0 });
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={mainControls}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
