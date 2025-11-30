import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Layers, FileText, Hash, Tag } from "lucide-react";

export type Area = {
    name: string;
    cantidad_fases: number;
    descripcion: string;
    nivel: string,
    sigla: string,
};

export const columns: ColumnDef<Area>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Tag className="h-4 w-4" />
        Nombre
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-semibold">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "cantidad_fases",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Layers className="h-4 w-4" />
        Cantidad de Fases
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="secondary" 
          className="font-bold text-lg bg-primary/10 text-primary border-primary/20 px-4 py-1"
        >
          {row.original.cantidad_fases}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "descripcion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <FileText className="h-4 w-4" />
        Descripción
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center max-w-md mx-auto text-sm text-muted-foreground">
        {row.original.descripcion}
      </div>
    ),
  },
  {
    accessorKey: "sigla",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Hash className="h-4 w-4" />
        Sigla
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="outline"
          className="uppercase font-bold tracking-wider bg-muted/50 border-border/50 px-3"
        >
          {row.original.sigla}
        </Badge>
      </div>
    ),
  },
]
