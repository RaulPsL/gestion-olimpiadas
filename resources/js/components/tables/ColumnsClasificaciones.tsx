import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Award, Medal, Trophy } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Clasificacion = {
  fase: string,
  nombre: string,
  ci: number,
  estado: string,
  grado_escolar: string,
  nivel: string,
  nota: number
};

export const columns: ColumnDef<Clasificacion>[] = [
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
    cell: ({ row }) => {
      const estado = row.original.estado;
      let className = "capitalize text-white bg-green-600";
      if (estado === "no clasificado")
        className = "capitalize text-white bg-gray-500";
      if (estado === "desclasificado") 
        className="capitalize text-white bg-red-700";
      return (
        <Badge className={className}>{row.original.estado}</Badge>
      )
    }
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
    cell: ({ row }) => {
      const posicion = Number(row.id) + 1;
      if (row.original.nota > 0) {
        if (posicion === 1)
          return (
            <Badge
              className="text-white bg-[#ffd30e] text-sm"
            >
              {posicion} <Trophy size={20} />
            </Badge>)
        if (posicion === 2)
          return (
            <Badge
              className="text-#000000 bg-[#b7bfd6] text-sm"
            >
              {posicion} <Medal size={20} />
            </Badge>)
        if (posicion === 3)
          return (
            <Badge
              className="text-#000000 bg-[#da944f] text-sm"
            >
              {posicion} <Medal size={20} />
            </Badge>)
      }
      return (
        <Badge
          variant="secondary"
          className="text-sm"
        >
          {row.original.nota > 0 ? posicion : ''} <Award size={20} />
        </Badge>
      )
    }
  },
  {
    accessorKey: "nota",
    header: "Nota",
    cell: ({ row }) => (
      <div className="text-center">{Number(row.original.nota)}</div>
    )
  },
]