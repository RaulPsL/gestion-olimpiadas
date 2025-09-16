import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Fase = {
    name: string;
    area: string;
    cantidad_participantes: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: string;
};

export const columns: ColumnDef<Fase>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "cantidad_participantes",
    header: "Cantidad de participantes",
  },
  {
    accessorKey: "fecha_inicio",
    header: "Fecha de inicio",
  },
  {
    accessorKey: "fecha_fin",
    header: "Fecha de fin",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
]