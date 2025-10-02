import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Interno = {
  ci: number,
  nombre: string,
  celular: number,
  email: string;
  area: string;
  fase: string,
  nivel: string,
  rol: string,
};

export const columnsInterno: ColumnDef<Interno>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "ci",
    header: "C.I",
  },
  {
    accessorKey: "celular",
    header: "Celular",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "fase",
    header: "Fase",
  },
  {
    accessorKey: "nivel",
    header: "Nivel",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.nivel}</div>
    ),
  },
  {
    accessorKey: "rol",
    header: "Rol",
    cell: ({ row }) => (
      <div className="text-center">{row.original.rol}</div>
    ),
  },
]