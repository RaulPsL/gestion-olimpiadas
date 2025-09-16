import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Area = {
    name: string;
    cantidad_fases: number;
    estado: string;
};

export const columns: ColumnDef<Area>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "cantidad_fases",
    header: "Cantidad de fases",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
]