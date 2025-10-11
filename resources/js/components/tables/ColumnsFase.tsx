import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Fase = {
    name: string;
    tipo_fase: string,
    area: string;
    cantidad_participantes: number;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
};

export const columns: ColumnDef<Fase>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "tipo_fase",
    header: "Tipo fase",
    cell: ({ row }) => {
      const tipo_fase = row.original.tipo_fase;
      let className = "capitalize text-white bg-red-700";
      if (tipo_fase === "clasificatorias")
        className = "text-white bg-[#b7bfd6] text-sm";
      if (tipo_fase === "finales") 
        className = "text-white bg-[#ffd30e] text-sm";
      return (<Badge className={className}>{row.original.tipo_fase}</Badge>)
    }
  },
  {
    accessorKey: "cantidad_participantes",
    header: "Cantidad de participantes",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.cantidad_participantes}</div>
    ),
  },
  {
    accessorKey: "fecha_inicio",
    header: "Fecha de inicio",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.fecha_inicio}</div>
    ),
  },
  {
    accessorKey: "fecha_fin",
    header: "Fecha de fin",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.fecha_fin}</div>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.estado;
      let className = 'capitalize text-white bg-green-600';
      if (estado === "pendiente")
        className = "capitalize text-white bg-blue-500";
      if (estado === "finalizada") 
        className="capitalize text-white bg-red-700";
      return (<Badge className={className}>{row.original.estado}</Badge>)
    }
  },
]