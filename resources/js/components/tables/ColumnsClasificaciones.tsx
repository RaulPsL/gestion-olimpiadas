import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Award, Medal, Trophy, GraduationCap, User, CheckCircle, XCircle, CircleDashed, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

export type Clasificacion = {
  fase: string,
  nombre: string,
  ci: number,
  estado: string,
  grado_escolar: string,
  nivel: string,
  nota: number
};

// Configuración de colores por estado
const estadoConfig: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  "clasificado": { 
    bg: "bg-green-500/15", 
    text: "text-green-700 dark:text-green-300", 
    border: "border-green-500/30",
    icon: CheckCircle
  },
  "no clasificado": { 
    bg: "bg-gray-500/15", 
    text: "text-gray-700 dark:text-gray-300", 
    border: "border-gray-500/30",
    icon: CircleDashed
  },
  "desclasificado": { 
    bg: "bg-red-500/15", 
    text: "text-red-700 dark:text-red-300", 
    border: "border-red-500/30",
    icon: XCircle
  },
};

export const columns: ColumnDef<Clasificacion>[] = [
  {
    accessorKey: "fase",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Star className="h-4 w-4" />
        Fase
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium capitalize">{row.original.fase}</div>
    ),
  },
  {
    accessorKey: "nombre",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <User className="h-4 w-4" />
        Nombre
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-semibold capitalize">{row.original.nombre}</div>
    ),
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
      const config = estadoConfig[estado] || estadoConfig["no clasificado"];
      const Icon = config.icon;
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1`}
          >
            <Icon className="h-3.5 w-3.5 mr-1.5" />
            {row.original.estado}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "grado_escolar",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <GraduationCap className="h-4 w-4" />
        Grado
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge 
          variant="secondary"
          className="capitalize font-medium bg-muted/70 border-border/50"
        >
          {row.original.grado_escolar}
        </Badge>
      </div>
    )
  },
  {
    accessorKey: "posicion",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Trophy className="h-4 w-4" />
        Posición
      </div>
    ),
    cell: ({ row }) => {
      const posicion = Number(row.id) + 1;
      
      if (row.original.nota > 0) {
        if (posicion === 1)
          return (
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0 shadow-lg px-4 py-1.5 text-base font-bold">
                <Trophy className="h-4 w-4 mr-1.5" />
                {posicion}°
              </Badge>
            </div>
          );
        if (posicion === 2)
          return (
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 border-0 shadow-lg px-4 py-1.5 text-base font-bold">
                <Medal className="h-4 w-4 mr-1.5" />
                {posicion}°
              </Badge>
            </div>
          );
        if (posicion === 3)
          return (
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-orange-400 to-orange-600 text-white border-0 shadow-lg px-4 py-1.5 text-base font-bold">
                <Medal className="h-4 w-4 mr-1.5" />
                {posicion}°
              </Badge>
            </div>
          );
      }
      
      return (
        <div className="flex justify-center">
          <Badge
            variant="secondary"
            className="bg-muted/50 border-border/50 px-3 py-1 font-semibold"
          >
            {row.original.nota > 0 ? `${posicion}°` : "-"}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "nota",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <Award className="h-4 w-4" />
        Nota
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
            variant="outline"
            className={`font-bold text-lg ${bgClass} ${textClass} border ${borderClass} px-4 py-1`}
          >
            {nota.toFixed(2)}
          </Badge>
        </div>
      );
    }
  },
]
