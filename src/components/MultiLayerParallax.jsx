import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function MultiLayerParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "200%"]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "grid",
        placeItems: "center",
      }}
    >
      <motion.h1
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: "7rem",
          position: "relative",
          zIndex: 20,
          y: textY,
        }}
      >
        PARALLAX
      </motion.h1>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          backgroundImage: `url('https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
    </div>
  );
}
