export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6 flex flex-col gap-4 h-full overflow-hidden">
      {/* Category badge skeleton */}
      <div
        className="h-6 w-24 rounded-full"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.2s linear infinite',
        }}
      />

      {/* Name skeleton — two lines */}
      <div className="flex flex-col gap-2 flex-1">
        <div
          className="h-4 w-full rounded-md"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.2s linear infinite 0.1s',
          }}
        />
        <div
          className="h-4 w-3/4 rounded-md"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.2s linear infinite 0.2s',
          }}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.05]" />

      {/* Price skeleton */}
      <div
        className="h-7 w-20 rounded-md"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.2s linear infinite 0.15s',
        }}
      />
    </div>
  );
}
