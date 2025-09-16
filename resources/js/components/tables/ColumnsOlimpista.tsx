import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Olimpista = {
    name: string;
    email: string;
    fase: "Eliminatorias" | "Clasificatorias" | "Finales";
    area: string;
    puntaje: number;
};

export const columns: ColumnDef<Olimpista>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fase",
    header: "Fase",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "puntaje",
    header: "Puntaje",
  },
]