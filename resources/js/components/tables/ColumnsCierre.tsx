import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";
import { Dispatch } from "react";

export type CierreFases = {
  encargado: string,
  evaluador: string,
  fase: string,
  estado: string,
  fecha_creacion: string,
  fecha_modificacion: string,
  fecha_inicio_fase: string,
  fecha_fin_fase: string,
  fecha_calificacion_fase: string,
  usuario_encargado_id?: number,
  usuario_evaluador_id?: number,
  fase_id: number,
};

export const createColumnsCierres = (
  register: UseFormRegister<FormCierreFase | FormGetupFase>,
  setValue: UseFormSetValue<FormCierreFase | FormGetupFase>,
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>,
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
      accessorKey: "estado",
      header: "Estado fase",
      cell: ({ row }) => {
        const estado = row.original.estado;
        let className = 'capitalize text-white bg-green-600';
        if (estado === "pendiente")
          className = "capitalize text-white bg-blue-500";
        if (estado === "finalizada")
          className = "capitalize text-white bg-red-700";
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
            {...register(`fase_id`, { valueAsNumber: true })}
          />
        )
      }
    },
    {
      accessorKey: "confirmacion",
      header: "Confirmación",
      cell: ({ row }) => {
        const fila = row.original;
        const currentDate = new Date();

        const usuarioActual = data?.data?.nombre || "";
        const ciUsuario = data?.data?.ci || "";

        // Fechas
        const fechaFin = new Date(fila.fecha_fin_fase);
        const fechaCalificacion = new Date(fila.fecha_calificacion_fase);

        const siPuedeCerrar =
          fila.estado === "en curso" && // debe estar en curso
          currentDate >= fechaCalificacion && // ya puede calificarse
          currentDate <= fechaFin && // aún no ha terminado la fase
          fila.usuario_encargado_id !== ciUsuario && // el usuario no debe ser el encargado actual
          fila.usuario_evaluador_id !== ciUsuario && // ni el evaluador actual
          fila.encargado !== usuarioActual && // ni su nombre coincida
          fila.evaluador !== usuarioActual; // ni su nombre coincida

        const sePuedeRevertir = 
          new Date(currentDate.setMinutes(currentDate.getMinutes() + 15)) < new Date(fila.fecha_fin_fase) &&
          (fila.encargado !== "" && fila.evaluador !== "");

        return (
          data.rol.sigla !== "ADM" ? 
          <Button
            variant={!siPuedeCerrar ? "ghost" : "default"}
            disabled={!siPuedeCerrar}
            onClick={() => {
              setValue("fase_id", fila.fase_id);
              setValue("usuario_encargado_id", data?.rol.sigla === 'EDA' ? data?.data.ci : 0);
              setValue("usuario_evaluador_id", data?.rol.sigla === 'EVA' ? data?.data.ci : 0);
              setDialogOpen(prev => !prev);
            }}
          >
            Confirmar cierre
          </Button> 
          :
          <Button
            variant={sePuedeRevertir ? "ghost" : "default"}
            disabled={sePuedeRevertir}
            onClick={() => {
              setValue("fase_id", fila.fase_id);
              setValue("aumento_fin", "");
              setDialogOpen(prev => !prev);
            }}
          >
            Revertir cierre
          </Button>
        );
      },
    }
  ]