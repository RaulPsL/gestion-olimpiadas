import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Interno = {
    name: string;
    email: string;
    area: string;
};

export const columns: ColumnDef<Interno>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
]