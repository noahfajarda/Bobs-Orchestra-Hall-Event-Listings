import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface Props {
  children: JSX.Element;
  delay: number;
  right?: boolean;
  left?: boolean;
}

export default function Reveal({ children, delay, right, left }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: right || left ? 0 : 75,
            x: right ? 75 : left ? -75 : 0,
          },
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay }}
        ref={ref}
      >
        {children}
      </motion.div>
    </div>
  );
}
