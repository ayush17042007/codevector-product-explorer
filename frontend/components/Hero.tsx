'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const handleExplore = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none">

      {/* Central glow orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, #8b5cf6 40%, transparent 70%)' }}
        />
      </div>

      {/* Grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm text-white/50 text-sm tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>New Collection</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold tracking-tighter leading-none mb-6"
        >
          <span className="block text-[clamp(4rem,12vw,9rem)] text-white">
            Product
          </span>
          <span
            className="block text-[clamp(4rem,12vw,9rem)]"
            style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Explorer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white/35 font-light tracking-wide max-w-sm mx-auto mb-14"
        >
          Discover products instantly.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center gap-4"
        >
          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative group px-9 py-4 rounded-full font-medium text-white overflow-hidden"
          >
            {/* Gradient fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%] group-hover:bg-[position:100%] transition-[background-position] duration-700 rounded-full" />
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            <span className="relative z-10">Explore Now</span>
          </motion.button>

          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full font-medium text-white/60 border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/20 hover:text-white/80 transition-all duration-300"
          >
            Browse All
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
