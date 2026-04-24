import { Skeleton } from "~/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-lg" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-2 rounded-lg" />
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
      </div>
      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  );
}
