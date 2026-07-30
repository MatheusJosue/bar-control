import { glassCard } from "@/lib/glass";
import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardCardSkeleton() {
  return (
    <div className={`min-w-[210px] snap-start p-4 ${glassCard}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="size-10 rounded-xl" />
      </div>
      <Skeleton className="mt-4 h-3 w-24" />
    </div>
  );
}
