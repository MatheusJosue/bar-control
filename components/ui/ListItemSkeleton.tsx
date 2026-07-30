import { glassCard } from "@/lib/glass";
import { Skeleton } from "@/components/ui/Skeleton";

export function ListItemSkeleton({ withProgress = false }: { withProgress?: boolean }) {
  return (
    <div className={`p-4 ${glassCard}`}>
      <div className="flex items-start gap-3">
        <Skeleton className="size-11 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-6 w-20 shrink-0 rounded-lg" />
          </div>
          {withProgress ? (
            <>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="space-y-3 border-t border-white/10 pt-3">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </>
          ) : (
            <Skeleton className="h-3 w-3/4" />
          )}
        </div>
      </div>
    </div>
  );
}
