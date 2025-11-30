import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {/* Barra de búsqueda skeleton */}
      <Card className="p-4 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Skeleton className="h-10 flex-1 w-full" />
          <Skeleton className="h-10 w-full sm:w-[200px]" />
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <Skeleton className="h-4 w-48" />
        </div>
      </Card>

      {/* Tabla skeleton */}
      <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="border-b border-border/50 bg-muted/50">
              <div className="flex">
                {Array.from({ length: columns }).map((_, i) => (
                  <div key={`header-${i}`} className="flex-1 p-4">
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="border-b border-border/30 hover:bg-muted/30"
              >
                <div className="flex">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 p-4">
                      <Skeleton 
                        className="h-6 w-full mx-auto" 
                        style={{ 
                          width: colIndex === 0 ? '80%' : '60%',
                          animationDelay: `${(rowIndex * columns + colIndex) * 50}ms`
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paginación skeleton */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-muted/20">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </Card>
    </div>
  );
}
