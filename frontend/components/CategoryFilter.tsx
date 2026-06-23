'use client';

import { motion, LayoutGroup } from 'framer-motion';

const CATEGORIES = ['All', 'Electronics', 'Books', 'Fashion', 'Sports', 'Home', 'Toys'];

const CATEGORY_ICONS: Record<string, string> = {
  All: '✦',
  Electronics: '⚡',
  Books: '📖',
  Fashion: '✨',
  Sports: '🏆',
  Home: '🏠',
  Toys: '🎮',
};

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <LayoutGroup>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = (cat === 'All' && selected === null) || cat === selected;

          return (
            <motion.button
              key={cat}
              onClick={() => onSelect(cat === 'All' ? null : cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            >
              {/* Background — shared animated element */}
              {isActive ? (
                <motion.div
                  layoutId="category-pill-bg"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              ) : (
                <div className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-200" />
              )}

              {/* Label */}
              <span
                className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/45 hover:text-white/75'
                }`}
              >
                <span className="text-[0.7rem] leading-none">{CATEGORY_ICONS[cat]}</span>
                {cat}
              </span>
            </motion.button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
