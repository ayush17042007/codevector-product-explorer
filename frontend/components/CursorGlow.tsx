'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  const x = useSpring(rawX, { damping: 22, stiffness: 280 });
  const y = useSpring(rawY, { damping: 22, stiffness: 280 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX - 200);
      rawY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [rawX, rawY]);

  return (
    <>
      {/* Large soft halo */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-20"
        style={{
          x,
          y,
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Tight inner glow */}
      <motion.div
        className="fixed top-0 left-0 w-[160px] h-[160px] rounded-full pointer-events-none z-20"
        style={{
          x: useSpring(rawX.get() + 120, { damping: 30, stiffness: 350 }),
          y: useSpring(rawY.get() + 120, { damping: 30, stiffness: 350 }),
          background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
        }}
      />
    </>
  );
}
