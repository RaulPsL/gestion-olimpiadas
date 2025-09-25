import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Olimpista = {
    nombre: string;
    email: number;
    fase: string;
    area: string;
};

export const columns: ColumnDef<Olimpista>[] = [
  {
    accessorKey: "nombre",
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
]