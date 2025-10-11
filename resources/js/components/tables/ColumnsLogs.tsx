import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

export type Logs = {
    name_sup_usuario: string;
    rol_usuario: string;
    name_sub_usuario: string;
    fase: string,
    area: string;
    accion: string;
    cuando_fue: string;
};

export const columns: ColumnDef<Logs>[] = [
  {
    accessorKey: "name_sup_usuario",
    header: "Nombre Accionario",
  },
  {
    accessorKey: "rol_usuario",
    header: "Rol Accionario",
  },
  {
    accessorKey: "name_sub_usuario",
    header: "Nombre Afectado",
  },
  {
    accessorKey: "fase",
    header: "Fase",
    cell: ({ row }) => {
      const tipo_fase = row.original.fase;
      let className = "capitalize text-white bg-red-700";
      if (tipo_fase === "clasificatorias")
        className = "text-white bg-[#b7bfd6] text-sm";
      if (tipo_fase === "finales") 
        className = "text-white bg-[#ffd30e] text-sm";
      return (<Badge className={`${className} capitalize`}>{row.original.fase}</Badge>)
    }
  },
  {
    accessorKey: "area",
    header: "Area de participación",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.area}</div>
    ),
  },
  {
    accessorKey: "accion",
    header: "Acción realizada",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.accion}</div>
    ),
  },
  {
    accessorKey: "cuando_fue",
    header: "Fecha de acción",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.cuando_fue}</div>
    ),
  },
]