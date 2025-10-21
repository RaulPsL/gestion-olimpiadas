import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister } from "react-hook-form";
import { FormCierreFase } from "@/forms/interfaces/CierreFaseForm";
import { useAuth } from "@/hooks/use-context";

export type CierreFases = {
    encargado: string,
    evaluador: string,
    fase: string,
    estado: string,
    fecha_creacion: string,
    fecha_modificacion: string,
    fecha_fin_fase: string,
    fecha_calificacion_fase: string,
    usuario_encargado_id?: number,
    usuario_evaluador_id?: number,
    fase_id: number,
};

export const createColumnsCierres = (
  register: UseFormRegister<FormCierreFase>,
  data: any
): ColumnDef<CierreFases>[] => [
  {
    accessorKey: "encargado",
    header: "Nombre encargado",
  },
  {
    accessorKey: "evaluador",
    header: "Nombre evaluador",
  },

  {
    accessorKey: "usuario_encargado_id",
    cell: ({ row }) => {
      return (
        <Input
          type="text"
          defaultValue={data?.rol.sigla === 'EDA' ? data?.data.ci : null}
          { ...register(`cierres.${row.index}.usuario_encargado_id`, { valueAsNumber: true }) }
        />
      )
    }
  },
  {
    accessorKey: "usuario_evaluador_id",
    cell: ({ row }) => {
      return (
        <Input
          type="text"
          defaultValue={data?.rol.sigla === 'EVA' ? data?.data.ci : null}
          { ...register(`cierres.${row.index}.usuario_evaluador_id`, { valueAsNumber: true }) }
        />
      )
    }
  },
  {
    accessorKey: "estado",
    header: "Estado fase",
    cell: ({ row }) => {
      const estado = row.original.estado;
      let className = 'capitalize text-white bg-green-600';
      if (estado === "pendiente") 
        className = "capitalize text-white bg-blue-500";
      if (estado === "finalizada")
        className="capitalize text-white bg-red-700";
      return <Badge className={className}>{row.original.estado}</Badge>
    }
  },
  {
    accessorKey: "area",
    header: "Área"
  },
  {
    accessorKey: "fase",
    header: "Fase"
  },
  {
    accessorKey: "fase_id",
    cell: ({ row }) => {
      return (
        <Input
          type="text"
          defaultValue={row.original.fase_id}
          { ...register(`cierres.${row.index}.fase_id`, { valueAsNumber: true }) }
        />
      )
    }
  },
  {
    accessorKey: "confirmacion",
    header: "Confirmación",
    cell: ({ row }) => {
      return (
        <Button variant="ghost">
          Confirmar cierre
        </Button>
      )
    }
  },
]