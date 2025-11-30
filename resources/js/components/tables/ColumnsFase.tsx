import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import FormEditFase from "@/forms/FormEditFase";
import { Button } from "../ui/button";
import { Edit, Users, Calendar, Flag, Layers, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useFormatDate } from "@/hooks/use-format-date";

export type Fase = {
  name: string;
  tipo_fase: string,
  area: string;
  cantidad_participantes: number;
  cantidad_ganadores: number;
  fecha_inicio: string;
  fecha_calificacion: string;
  fecha_fin: string;
  estado: string;
  nivel: string;
  fase_id: number;
};

// Configuración de colores por tipo de fase
const tipoFaseColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  "preliminares": { 
    bg: "bg-slate-500/15", 
    text: "text-slate-700 dark:text-slate-300", 
    border: "border-slate-500/30",
    icon: Layers
  },
  "clasificatorias": { 
    bg: "bg-indigo-500/15", 
    text: "text-indigo-700 dark:text-indigo-300", 
    border: "border-indigo-500/30",
    icon: Flag
  },
  "finales": { 
    bg: "bg-yellow-500/15", 
    text: "text-yellow-700 dark:text-yellow-300", 
    border: "border-yellow-500/30",
    icon: Flag
  },
};

// Configuración de colores por estado
const estadoColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  "en curso": { 
    bg: "bg-green-500/15", 
    text: "text-green-700 dark:text-green-300", 
    border: "border-green-500/30",
    icon: CheckCircle2
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

export const columns: ColumnDef<Fase>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Flag className="h-4 w-4" />
        Nombre
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-semibold capitalize">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "tipo_fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Layers className="h-4 w-4" />
        Tipo de Fase
      </div>
    ),
    cell: ({ row }) => {
      const tipo_fase = row.original.tipo_fase.toLowerCase();
      const config = tipoFaseColors[tipo_fase] || tipoFaseColors["preliminares"];
      const Icon = config.icon;
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1`}
          >
            <Icon className="h-3.5 w-3.5 mr-1.5" />
            {row.original.tipo_fase}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "cantidad_participantes",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Users className="h-4 w-4" />
        Participantes
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="secondary"
          className="font-bold text-base bg-primary/10 text-primary border-primary/20 px-4 py-1"
        >
          {row.original.cantidad_participantes}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fecha_inicio",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Fecha Inicio
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono bg-muted/50 border-border/50">
          {useFormatDate(row.original.fecha_inicio)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fecha_fin",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Fecha Fin
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono bg-muted/50 border-border/50">
          {useFormatDate(row.original.fecha_fin)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "estado",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <CheckCircle2 className="h-4 w-4" />
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
    }
  },
  {
    accessorKey: "editar_fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Edit className="h-4 w-4" />
        Acciones
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30 hover:border-primary/50 transition-all"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-full max-h-[90vh] h-fit flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Edición de Fase
                </DialogTitle>
                <DialogDescription>
                  Modifica los detalles de la información de la fase
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto overflow-x-hidden mt-4 pr-2">
                <FormEditFase otherData={row.original}/>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  },
]
