import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Area = {
    name: string;
    cantidad_fases: number;
    descripcion: string;
    nivel: string,
    sigla: string,
};

export const columns: ColumnDef<Area>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="text-center">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "cantidad_fases",
    header: "Cantidad de fases",
    cell: ({ row }) => (
      <div className="text-center">{row.original.cantidad_fases}</div>
    ),
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-center">{row.original.descripcion}</div>
    ),
  },
  // {
  //   accessorKey: "nivel",
  //   header: "Nivel",
  //   cell: ({ row }) => (
  //     <div className="text-center capitalize">{row.original.nivel}</div>
  //   ),
  // },
  {
    accessorKey: "sigla",
    header: "Sigla",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.sigla}</div>
    ),
  },
]