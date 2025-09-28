import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Olimpista = {
  nombre: string;
  ci: number;
  colegio: string;
  departamento: string;
  tutor: string;
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
    header: "U.E.",
  },
  {
    accessorKey: "departamento",
    header: "Departamento",
  },
  {
    accessorKey: "tutor",
    header: "Tutor",
  },
  {
    accessorKey: "fase",
    header: "Fase",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
]