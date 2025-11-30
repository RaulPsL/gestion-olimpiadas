import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";
import { Dispatch } from "react";
import { useFormatDate } from "@/hooks/use-format-date";
import { useNotification } from "@/hooks/use-notifications";
import { UserData } from "@/hooks/use-context";
import { 
  User, 
  Shield, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Flag,
  Calendar,
  RotateCcw,
  Lock
} from "lucide-react";

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

// Configuración de colores por estado
const estadoColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  "en curso": { 
    bg: "bg-green-500/15", 
    text: "text-green-700 dark:text-green-300", 
    border: "border-green-500/30",
    icon: CheckCircle
  },
  "pendiente": { 
    bg: "bg-blue-500/15", 
    text: "text-blue-700 dark:text-blue-300", 
    border: "border-blue-500/30",
    icon: Clock
  },
  "finalizada": { 
    bg: "bg-red-500/15", 
    text: "text-red-700 dark:text-red-300", 
    border: "border-red-500/30",
    icon: XCircle
  },
};

export const createColumnsCierres = (
  register: UseFormRegister<FormCierreFase | FormGetupFase>,
  setValue: UseFormSetValue<FormCierreFase | FormGetupFase>,
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>,
  data: UserData,
  setFechaFin: Dispatch<React.SetStateAction<Date>>,
): ColumnDef<CierreFases>[] => [
  {
    accessorKey: "encargado",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <User className="h-4 w-4" />
        Encargado
      </div>
    ),
    cell: ({ row }) => {
      if (row.original.encargado === "" && data.rol.sigla === "ADM") {
        return <Badge className="font-mono text-xs text-center bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30">Aun no cerró un encargado</Badge>
      }
      return <Badge className="text-center font-medium capitalize">{row.original.encargado}</Badge>
    },
  },
  {
    accessorKey: "evaluador",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Shield className="h-4 w-4" />
        Evaluador
      </div>
    ),
    cell: ({ row }) => {
      if (row.original.evaluador === "" && data.rol.sigla === "ADM") {
        return <Badge className="text-center font-mono text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30">Aun no cerró el evaluador</Badge>
      }
      return <Badge className="text-center font-medium capitalize">{row.original.evaluador}</Badge>
    },
  },
  {
    accessorKey: "estado",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <CheckCircle className="h-4 w-4" />
        Estado
      </div>
    ),
    cell: ({ row }) => {
      const estado = row.original.estado.toLowerCase();
      const config = estadoColors[estado] || estadoColors["pendiente"];
      const Icon = config.icon;
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1 ${
              estado === "en curso" ? "animate-pulse" : ""
            }`}
          >
            <Icon className="h-3.5 w-3.5 mr-1.5" />
            {row.original.estado}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Flag className="h-4 w-4" />
        Fase
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium capitalize">{row.original.fase}</div>
    ),
  },
  {
    accessorKey: 'fecha_calificacion_fase',
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Fecha Calificación
      </div>
    ),
    cell: ({ row }) => {
      const formatted = useFormatDate(row.original.fecha_calificacion_fase);
      return (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30">
            {formatted}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'fecha_fin_fase',
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Fecha Fin
      </div>
    ),
    cell: ({ row }) => {
      const formatted = useFormatDate(row.original.fecha_fin_fase);
      return (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-xs bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30">
            {formatted}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "fase_id",
    cell: ({ row }) => (
      <Input
        type="text"
        defaultValue={row.original.fase_id}
        {...register(`fase_id`, { valueAsNumber: true })}
        className="hidden"
      />
    ),
  },
  {
    accessorKey: "confirmacion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Lock className="h-4 w-4" />
        Acciones
      </div>
    ),
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
          <div className="flex justify-center">
            <Button
              size="sm"
              variant={puedeRevertir ? "default" : "ghost"}
              disabled={!puedeRevertir}
              onClick={() => {
                setValue("fase_id", fila.fase_id);
                setFechaFin(fechaFin);
                setDialogOpen((prev) => !prev);
              }}
              className={puedeRevertir 
                ? "bg-orange-500/15 hover:bg-orange-500/25 text-orange-700 dark:text-orange-400 border-orange-500/30 hover:border-orange-500/50" 
                : ""
              }
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Revertir cierre
            </Button>
          </div>
        );
      }

      return (
        <div className="flex justify-center">
          <Button
            size="sm"
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
              if (fila.usuario_encargado_id !== "" && fila.usuario_evaluador_id !== "") {
                useNotification(`${data.data.ci}`);
              }
              setDialogOpen((prev) => !prev);
            }}
            className={puedeCerrar 
              ? "bg-green-500/15 hover:bg-green-500/25 text-green-700 dark:text-green-400 border-green-500/30 hover:border-green-500/50" 
              : ""
            }
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirmar cierre
          </Button>
        </div>
      );
    },
  },
];
