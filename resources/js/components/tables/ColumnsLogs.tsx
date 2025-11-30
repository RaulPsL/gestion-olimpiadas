import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { useFormatDate } from "@/hooks/use-format-date";
import { 
  User, 
  Shield, 
  IdCard, 
  Layers, 
  Flag, 
  Activity, 
  Calendar,
  Edit,
  Award,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

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
  usuario: string,
  rol: string,
  fase: string,
  estado_fase: string,
  area: string,
  fecha_creacion: string,
  fecha_modificacion: string,
};

// Configuración de colores por tipo de fase
const tipoFaseColors: Record<string, { bg: string; text: string; border: string }> = {
  "preliminares": { 
    bg: "bg-slate-500/15", 
    text: "text-slate-700 dark:text-slate-300", 
    border: "border-slate-500/30"
  },
  "clasificatorias": { 
    bg: "bg-indigo-500/15", 
    text: "text-indigo-700 dark:text-indigo-300", 
    border: "border-indigo-500/30"
  },
  "finales": { 
    bg: "bg-yellow-500/15", 
    text: "text-yellow-700 dark:text-yellow-300", 
    border: "border-yellow-500/30"
  },
};

// Configuración de colores por estado
const estadoFaseColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
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

export const columnsLogCalificaciones: ColumnDef<LogsCalificaciones>[] = [
  {
    accessorKey: "usuario",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <User className="h-4 w-4" />
        Usuario
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium capitalize">{row.original.usuario}</div>
    ),
  },
  {
    accessorKey: "rol_usuario",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Shield className="h-4 w-4" />
        Rol
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="secondary"
          className="uppercase font-semibold bg-primary/10 text-primary border-primary/20 px-3"
        >
          {row.original.rol_usuario}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "ci_olimpista",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <IdCard className="h-4 w-4" />
        CI Afectado
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="outline"
          className="font-mono bg-muted/50 border-border/50"
        >
          {row.original.ci_olimpista}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Layers className="h-4 w-4" />
        Fase
      </div>
    ),
    cell: ({ row }) => {
      const tipo_fase = row.original.fase.toLowerCase();
      const config = tipoFaseColors[tipo_fase] || tipoFaseColors["preliminares"];
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1`}
          >
            {row.original.fase}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "area",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Flag className="h-4 w-4" />
        Área
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize font-medium">{row.original.area}</div>
    ),
  },
  {
    accessorKey: "accion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Activity className="h-4 w-4" />
        Acción
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="outline"
          className="capitalize bg-accent/10 text-accent-foreground border-accent/30"
        >
          <Edit className="h-3.5 w-3.5 mr-1.5" />
          {row.original.accion}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fecha_creacion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Fecha Creación
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono text-xs bg-muted/50">
          {row.original.fecha_creacion}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fecha_modificacion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Última Modificación
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono text-xs bg-muted/50">
          {row.original.fecha_modificacion}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "nota",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Award className="h-4 w-4" />
        Nota Actual
      </div>
    ),
    cell: ({ row }) => {
      const nota = Number(row.original.nota);
      let bgClass = "bg-muted/50";
      let textClass = "text-foreground";
      let borderClass = "border-border/50";
      
      if (nota >= 90) {
        bgClass = "bg-green-500/15";
        textClass = "text-green-700 dark:text-green-400";
        borderClass = "border-green-500/30";
      } else if (nota >= 70) {
        bgClass = "bg-blue-500/15";
        textClass = "text-blue-700 dark:text-blue-400";
        borderClass = "border-blue-500/30";
      } else if (nota >= 51) {
        bgClass = "bg-yellow-500/15";
        textClass = "text-yellow-700 dark:text-yellow-400";
        borderClass = "border-yellow-500/30";
      } else if (nota > 0) {
        bgClass = "bg-red-500/15";
        textClass = "text-red-700 dark:text-red-400";
        borderClass = "border-red-500/30";
      }
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`font-bold text-base ${bgClass} ${textClass} border ${borderClass} px-4 py-1`}
          >
            {nota.toFixed(2)}
          </Badge>
        </div>
      );
    },
  },
];

export const columnsLogCierreFases: ColumnDef<LogsCierreFase>[] = [
  {
    accessorKey: "usuario",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <User className="h-4 w-4" />
        Usuario
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium capitalize">{row.original.usuario}</div>
    ),
  },
  {
    accessorKey: "rol",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Shield className="h-4 w-4" />
        Rol
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="secondary"
          className="uppercase font-semibold bg-primary/10 text-primary border-primary/20 px-3"
        >
          {row.original.rol}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Layers className="h-4 w-4" />
        Fase
      </div>
    ),
    cell: ({ row }) => {
      const tipo_fase = row.original.fase.toLowerCase();
      const config = tipoFaseColors[tipo_fase] || tipoFaseColors["preliminares"];
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1`}
          >
            {row.original.fase}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "estado_fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <CheckCircle className="h-4 w-4" />
        Estado Fase
      </div>
    ),
    cell: ({ row }) => {
      const estado = row.original.estado_fase.toLowerCase();
      const config = estadoFaseColors[estado] || estadoFaseColors["pendiente"];
      const Icon = config.icon;
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1`}
          >
            <Icon className="h-3.5 w-3.5 mr-1.5" />
            {row.original.estado_fase}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "area",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Flag className="h-4 w-4" />
        Área de Fase
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize font-medium">{row.original.area}</div>
    ),
  },
  {
    accessorKey: "fecha_creacion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Fecha Creación
      </div>
    ),
    cell: ({ row }) => {
      const formatted = useFormatDate(row.original.fecha_creacion);
      return (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-xs bg-muted/50">
            {formatted}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "fecha_modificacion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Calendar className="h-4 w-4" />
        Última Modificación
      </div>
    ),
    cell: ({ row }) => {
      const formatted = useFormatDate(row.original.fecha_modificacion);
      return (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-xs bg-muted/50">
            {formatted}
          </Badge>
        </div>
      );
    },
  },
];
