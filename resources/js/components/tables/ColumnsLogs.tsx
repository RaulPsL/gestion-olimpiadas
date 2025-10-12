import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

export type LogsCalificaciones = {
  usuario: string,
  rol_usuario: string,
  ci_olimpista: string,
  fase: string,
  area: string,
  accion: string,
  fecha_creacion: string,
  fecha_modificacion: string,
  nota: number,
};

export type LogsCierreFase = {
  sup_usuario_and_rol: string,
  sub_usuario_and_rol: string,
  fase: string,
  estado_fase: string,
  area: string,
  fecha_creacion: string,
  fecha_modificacion: string,
};

export const columnsLogCalificaciones: ColumnDef<LogsCalificaciones>[] = [
  {
    accessorKey: "usuario",
    header: "Nombre Accionario",
  },
  {
    accessorKey: "rol_usuario",
    header: "Rol Accionario",
  },
  {
    accessorKey: "ci_olimpista",
    header: "CI Afectado",
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
    accessorKey: "fecha_creacion",
    header: "Fecha de acción",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.fecha_creacion}</div>
    ),
  },
  {
    accessorKey: "fecha_modificacion",
    header: "Fecha de acción",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.fecha_modificacion}</div>
    ),
  },
  {
    accessorKey: "nota",
    header: "Nota actual",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.nota}</div>
    ),
  },
];

export const columnsLogCierreFases: ColumnDef<LogsCierreFase>[] = [
  {
    accessorKey: "sup_usuario_and_rol",
    header: "Encargado",
  },
  {
    accessorKey: "sub_usuario_and_rol",
    header: "Evaluador",
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
    accessorKey: "estado_fase",
    header: "Estado Fase",
    cell: ({ row }) => {
      const tipo_fase = row.original.estado_fase;
      let className = "capitalize text-white bg-green-700";
      if (tipo_fase === "finalizada")
        className = "text-white bg-red-500 text-sm";
      if (tipo_fase === "pendiente") 
        className = "text-white bg-blue-600 text-sm";
      return (<Badge className={`${className} capitalize`}>{row.original.estado_fase}</Badge>)
    }
  },
  {
    accessorKey: "area",
    header: "Area de fase",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.area}</div>
    ),
  },
  {
    accessorKey: "fecha_creacion",
    header: "Fecha de acción",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.fecha_creacion}</div>
    ),
  },
  {
    accessorKey: "fecha_modificacion",
    header: "Fecha de acción",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.fecha_modificacion}</div>
    ),
  },
];
