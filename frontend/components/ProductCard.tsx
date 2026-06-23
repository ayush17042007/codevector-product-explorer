"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Tag, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";

/* ─── Category colour map ─────────────────────────────────── */
const CATEGORY_STYLES: Record<
  string,
  { badge: string; glow: string; accent: string }
> = {
  Electronics: {
    badge: "bg-blue-500/15  border-blue-500/25  text-blue-300",
    glow: "rgba(59,130,246,0.12)",
    accent: "#3b82f6",
  },
  Books: {
    badge: "bg-amber-500/15  border-amber-500/25  text-amber-300",
    glow: "rgba(245,158,11,0.12)",
    accent: "#f59e0b",
  },
  Fashion: {
    badge: "bg-pink-500/15   border-pink-500/25   text-pink-300",
    glow: "rgba(236,72,153,0.12)",
    accent: "#ec4899",
  },
  Sports: {
    badge: "bg-emerald-500/15 border-emerald-500/25 text-emerald-300",
    glow: "rgba(16,185,129,0.12)",
    accent: "#10b981",
  },
  Home: {
    badge: "bg-violet-500/15  border-violet-500/25  text-violet-300",
    glow: "rgba(139,92,246,0.12)",
    accent: "#8b5cf6",
  },
  Toys: {
    badge: "bg-yellow-500/15  border-yellow-500/25  text-yellow-300",
    glow: "rgba(234,179,8,0.12)",
    accent: "#eab308",
  },
};

const DEFAULT_STYLE = {
  badge: "bg-indigo-500/15 border-indigo-500/25 text-indigo-300",
  glow: "rgba(99,102,241,0.12)",
  accent: "#6366f1",
};

/* ─── Component ───────────────────────────────────────────── */
interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = CATEGORY_STYLES[product.category] ?? DEFAULT_STYLE;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: (index % 12) * 0.045,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
        style={{ background: style.glow }}
      />

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-6 flex flex-col gap-4 h-full transition-all duration-300 group-hover:border-white/[0.16] group-hover:bg-white/[0.07]">
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)`,
          }}
        />

        {/* Category badge */}
        <div
          className={`inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full border text-xs font-medium ${style.badge}`}
        >
          <Tag className="w-3 h-3" />
          {product.category}
        </div>

        {/* Product name */}
        <h3 className="text-white/90 font-semibold text-[1.05rem] leading-snug flex-1 group-hover:text-white transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.06]">
          <span
            className="text-2xl font-bold"
            style={{
              background: `linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.65) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </span>

          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/[0.08] bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-white/[0.2]">
            <ArrowUpRight className="w-4 h-4 text-white/60" />
          </div>
        </div>

        {/* Bottom gradient band */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-2xl"
          style={{
            background: `linear-gradient(to top, ${style.glow}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
