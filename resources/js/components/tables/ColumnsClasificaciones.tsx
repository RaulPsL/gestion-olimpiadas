import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "../ui/input";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Clasificacion = {
    fase: string,
    area: string,
    nombre: string,
    ci: number,
    estado: string,
    grado_escolar: string,
    colegio: string,
    nivel: string,
    nota: number
};

export const columns: ColumnDef<Clasificacion>[] = [
  {
    accessorKey: "area",
    header: "Área"
  },
  {
    accessorKey: "fase",
    header: "Fase"
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.estado}</div>
    )
  },
  {
    accessorKey: "colegio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          U.E
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "grado_escolar",
    header: "Grado",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.grado_escolar}</div>
    )
  },
  {
    accessorKey: "posicion",
    header: "Posición",
    cell: ({ row }) => (
        <div className="text-center">{Number(row.id)+1}</div>
    )
  },
  {
    accessorKey: "nota",
    header: "Nota",
    cell: ({ row }) => (
        <div className="text-center">{Number(row.original.nota)}</div>
    )
  },
]