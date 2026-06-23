'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react';

interface LoadMoreButtonProps {
  loading: boolean;
  hasMore: boolean;
  onClick: () => void;
}

export default function LoadMoreButton({ loading, hasMore, onClick }: LoadMoreButtonProps) {
  return (
    <AnimatePresence>
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5 mt-20"
        >
          <motion.button
            onClick={onClick}
            disabled={loading}
            whileHover={loading ? {} : { scale: 1.06 }}
            whileTap={loading ? {}  : { scale: 0.95 }}
            className="relative group px-12 py-4 rounded-full font-semibold text-white overflow-hidden disabled:cursor-not-allowed"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%] group-hover:bg-[position:100%] transition-[background-position] duration-700" />

            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 rounded-full bg-indigo-600/80 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}

            <span className={`relative z-10 flex items-center gap-2 transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              Load More
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            </span>
          </motion.button>

          {loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/30 text-sm tracking-wider"
            >
              Fetching more products…
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
