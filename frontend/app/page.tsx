'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';
import LoadMoreButton from '@/components/LoadMoreButton';
import CursorGlow from '@/components/CursorGlow';
import { useProducts } from '@/hooks/useProducts';

// Lazy-load Three.js scene (client-only, no SSR)
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => null,
});

/* ─── Animated mesh gradient blobs ──────────────────────── */
function AmbientBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[5]" aria-hidden>
      <div
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          animation: 'meshFloat1 16s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          animation: 'meshFloat2 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-48 left-1/3 w-[800px] h-[800px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          animation: 'meshFloat3 24s ease-in-out infinite',
        }}
      />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    products,
    nextCursor,
    loading,
    loadingMore,
    error,
    loadMore,
  } = useProducts(selectedCategory);

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
  };

  const SKELETON_COUNT = 8;

  return (
    <main className="relative min-h-screen bg-[#050508] overflow-x-hidden">
      {/* Ambient effects */}
      <CursorGlow />
      <ThreeBackground />
      <AmbientBlobs />

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero />

      {/* ── Products section ─────────────────────────────── */}
      <section id="products" className="relative z-10">

        {/* Thin separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-40">

          {/* Section heading */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Browse Collection
            </h2>
            <p className="text-white/35 text-lg">
              {selectedCategory ?? 'All categories'}
              {!loading && products.length > 0 && (
                <span className="ml-2 text-white/20 text-base">
                  — {products.length} shown
                </span>
              )}
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <CategoryFilter selected={selectedCategory} onSelect={handleCategoryChange} />
          </motion.div>

          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 px-5 py-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-sm mb-10"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {loading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                    >
                      <SkeletonCard />
                    </motion.div>
                  ))
                : products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          <AnimatePresence>
            {!loading && !error && products.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-32 text-center"
              >
                <div className="text-5xl opacity-30">✦</div>
                <p className="text-white/30 text-xl font-light">
                  No products found in{' '}
                  <span className="text-white/50">{selectedCategory ?? 'this category'}</span>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More */}
          <LoadMoreButton
            loading={loadingMore}
            hasMore={!!nextCursor}
            onClick={loadMore}
          />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Product Explorer
          </span>
          <p className="text-white/20 text-sm">
            Discover products instantly.
          </p>
        </div>
      </footer>
    </main>
  );
}
