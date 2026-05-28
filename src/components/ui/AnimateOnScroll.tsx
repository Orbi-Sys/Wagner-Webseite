'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Direction = 'up' | 'left' | 'right' | 'fade';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const MAX_DELAY = 0.4;
const DURATION = 0.6;

function getVariants(direction: Direction): Variants {
  return {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: DURATION, ease: 'easeOut' },
    },
  };
}

export default function AnimateOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: AnimateOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const cappedDelay = Math.min(delay, MAX_DELAY);

  return (
    <motion.div
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: cappedDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
