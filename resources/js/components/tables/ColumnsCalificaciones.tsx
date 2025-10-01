import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "../ui/input";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Calificacion = {
    nombre: string,
    estado: string,
    colegio: string,
    departamento: string,
    area: string,
    nivel: string,
    nota: number,
    comentarios: string
};

export const columns: ColumnDef<Calificacion>[] = [
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
    accessorKey: "departamento",
    header: "Departamento",
  },
  {
    accessorKey: "area",
    header: "Área"
  },
  {
    accessorKey: "fase",
    header: "Fase"
  },
  {
    accessorKey: "nivel",
    header: "Nivel",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.nivel}</div>
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
    cell: ({ row }) => {
      const nota = Number(row.original.nota).toFixed(2);
      return (
        <Input
          type="text"
          defaultValue={nota}
          onChange={(e) => {
            row.original.nota = Number(e.target.value);
          }}
        />
      )
    }
  },
  {
    accessorKey: "comentarios",
    header: "Comentarios",
    cell: ({ row }) => {
      return (
        <Input
          type="text"
          defaultValue={row.original.comentarios}
          onChange={(e) => {
            row.original.comentarios = e.target.value;
          }}
        />
      )
    }
  },
]