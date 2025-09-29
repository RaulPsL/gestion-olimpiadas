import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Olimpista = {
  nombre: string;
  ci: number;
  colegio: string;
  departamento: string;
  tutor_academico: string;
  fase: string;
  area: string;
};

export const columns: ColumnDef<Olimpista>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "ci",
    header: "CI",
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
    accessorKey: "tutor_academico",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tutor Académico
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "fase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fase
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Área
          <ArrowUpDown />
        </Button>
      )
    },
  },
]