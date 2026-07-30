export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-white/10 theme-light:bg-black/10 ${className}`} />;
}
