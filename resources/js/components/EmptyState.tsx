import { Search, Inbox, FileQuestion } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "search" | "inbox" | "question";
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No se encontraron resultados",
  description = "Intenta ajustar los filtros o realizar una búsqueda diferente",
  icon = "search",
  actionLabel,
  onAction
}: EmptyStateProps) {
  const icons = {
    search: Search,
    inbox: Inbox,
    question: FileQuestion
  };

  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative">
        {/* Círculo de fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl opacity-30 animate-pulse" />
        
        {/* Icono */}
        <div className="relative bg-muted/50 rounded-full p-6 mb-4 backdrop-blur-sm border border-border/50">
          <Icon className="h-12 w-12 text-muted-foreground opacity-50" />
        </div>
      </div>

      {/* Texto */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>

      {/* Acción opcional */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="outline"
          className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
