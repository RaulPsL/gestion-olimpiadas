import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";
import { Dispatch } from "react";

export type CierreFases = {
  encargado: string;
  evaluador: string;
  fase: string;
  estado: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  fecha_inicio_fase: string;
  fecha_fin_fase: string;
  fecha_calificacion_fase: string;
  usuario_encargado_id?: string;
  usuario_evaluador_id?: string;
  fase_id: number;
};

const formatDate = (fecha: string | null | undefined): string => {
  if (!fecha) return '-';
  
  const date = new Date(fecha);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const createColumnsCierres = (
  register: UseFormRegister<FormCierreFase | FormGetupFase>,
  setValue: UseFormSetValue<FormCierreFase | FormGetupFase>,
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>,
  data: any,
  setFechaFin: Dispatch<React.SetStateAction<Date>>,
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
      const className =
        estado === "pendiente"
          ? "capitalize text-white bg-blue-500"
          : estado === "finalizada"
          ? "capitalize text-white bg-red-700"
          : "capitalize text-white bg-green-600";
      return <Badge className={className}>{estado}</Badge>;
    },
  },
  {
    accessorKey: "area",
    header: "Área",
  },
  {
    accessorKey: "fase",
    header: "Fase",
  },
  // {
  //   accessorKey: 'fecha_inicio_fase',
  //   header: 'Fecha inicio',
  // },
  {
    accessorKey: 'fecha_calificacion_fase',
    header: 'Fecha calificación',
    cell: ({ row }) => formatDate(row.original.fecha_calificacion_fase)
  },
  {
    accessorKey: 'fecha_fin_fase',
    header: 'Fecha fin',
    cell: ({ row }) => formatDate(row.original.fecha_fin_fase)
  },
  {
    accessorKey: "fase_id",
    cell: ({ row }) => (
      <Input
        type="text"
        defaultValue={row.original.fase_id}
        {...register(`fase_id`, { valueAsNumber: true })}
      />
    ),
  },
  {
    accessorKey: "confirmacion",
    header: "Confirmación",
    cell: ({ row }) => {
      const fila = row.original;
      const now = new Date();

      const usuarioRol = data?.rol?.sigla || "";
      const ciUsuario = data?.data?.ci || "";

      const fechaFin = new Date(fila.fecha_fin_fase);
      const fechaCalificacion = new Date(fila.fecha_calificacion_fase);

      // --- Condición para CERRAR fase ---
      const puedeCerrar =
        fila.estado !== "finalizada" &&
        now >= fechaCalificacion &&
        now <= fechaFin;

      const paraEva = (fila.usuario_evaluador_id && fila.usuario_evaluador_id !== "") as boolean;
      const paraEda = (fila.usuario_encargado_id && fila.usuario_encargado_id !== "") as boolean;

      // --- Condición para REVERTIR cierre ---
      const tiempoLimite = new Date(fechaFin.getTime() + 15 * 60000);
      const puedeRevertir =
        usuarioRol === "ADM" &&
        fila.estado === "finalizada" &&
        now <= tiempoLimite &&
        fila.usuario_encargado_id &&
        fila.usuario_evaluador_id &&
        fila.usuario_encargado_id !== "" &&
        fila.usuario_evaluador_id !== "";

      if (usuarioRol === "ADM") {
        return (
          <Button
            variant={puedeRevertir ? "default" : "ghost"}
            disabled={!puedeRevertir}
            onClick={() => {
              setValue("fase_id", fila.fase_id);
              setFechaFin(fechaFin);
              setDialogOpen((prev) => !prev);
            }}
          >
            Revertir cierre
          </Button>
        );
      }

      return (
        <Button
          variant={puedeCerrar ? "default" : "ghost"}
          disabled={ !puedeCerrar && data?.rol?.sigla === "EDA" ? paraEda : paraEva }
          onClick={() => {
            setValue("fase_id", fila.fase_id);
            setValue(
              "usuario_encargado_id",
              usuarioRol === "EDA" ? ciUsuario : 0
            );
            setValue(
              "usuario_evaluador_id",
              usuarioRol === "EVA" ? ciUsuario : 0
            );
            setDialogOpen((prev) => !prev);
          }}
        >
          Confirmar cierre
        </Button>
      );
    },
  },
];
