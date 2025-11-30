import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  Award,
  Medal,
  Trophy,
  MapPin,
  User,
  Star,
  MessageSquare,
  Edit3,
  Lock,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormNotas } from "@/forms/interfaces/Notas";

export type Calificacion = {
  nombre: string,
  nota_olimpista_id: number,
  nota_fase_id: number,
  estado: string,
  edicion: boolean,
  colegio: string,
  departamento: string,
  area: string,
  nivel: string,
  nota: number,
  comentarios: string
};

// Configuración de colores por estado
const estadoConfig: Record<string, { bg: string; text: string; border: string }> = {
  "clasificado": { 
    bg: "bg-green-500/15", 
    text: "text-green-700 dark:text-green-300", 
    border: "border-green-500/30"
  },
  "no clasificado": { 
    bg: "bg-gray-500/15", 
    text: "text-gray-700 dark:text-gray-300", 
    border: "border-gray-500/30"
  },
  "desclasificado": { 
    bg: "bg-red-500/15", 
    text: "text-red-700 dark:text-red-300", 
    border: "border-red-500/30"
  },
};

export const createColumnsCalificaciones = (
  register: UseFormRegister<FormNotas>,
  setValue: UseFormSetValue<FormNotas>,
): ColumnDef<Calificacion>[] => [
    {
      accessorKey: "nombre",
      header: () => (
        <div className="flex items-center justify-center gap-2 font-bold">
          <User className="h-4 w-4" />
          Nombre
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center font-semibold capitalize">{row.getValue("nombre")}</div>
      ),
    },
    {
      accessorKey: "nota_olimpista_id",
      cell: ({ row }) => {
        const olimpistaId = Number(row.original.nota_olimpista_id);
        return (
          <Input
            type="number"
            defaultValue={olimpistaId}
            {...register(`notas.${row.index}.nota_olimpista_id`, { valueAsNumber: true })}
            className="hidden"
          />
        )
      }
    },
    {
      accessorKey: "estado",
      header: () => (
        <div className="flex items-center justify-center gap-2 font-bold">
          <Star className="h-4 w-4" />
          Estado
        </div>
      ),
      cell: ({ row }) => {
        const estadoActual = row.original.estado.toLowerCase();
        const config = estadoConfig[estadoActual] || estadoConfig["no clasificado"];

        return (
          <div className="flex justify-center">
            <Badge 
              className={`capitalize font-semibold ${config.bg} ${config.text} border ${config.border} px-3 py-1`}
            >
              {row.original.estado}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "departamento",
      header: () => (
        <div className="flex items-center justify-center gap-2 font-bold">
          <MapPin className="h-4 w-4" />
          Departamento
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge 
            variant="secondary"
            className="capitalize bg-primary/10 text-primary border-primary/20"
          >
            {row.getValue("departamento")}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "fase",
      header: () => (
        <div className="flex items-center justify-center gap-2 font-bold">
          <Star className="h-4 w-4" />
          Fase
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium capitalize">{row.getValue("fase")}</div>
      ),
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
      accessorKey: "edicion",
      header: () => (
        <div className="flex items-center justify-center gap-2 font-bold">
          <Edit3 className="h-4 w-4" />
          Edición
        </div>
      ),
      cell: ({ row }) => {
        const editable = row.getValue("edicion") as boolean;
        return (
          <div className="flex justify-center">
            <Badge 
              variant={editable ? "default" : "secondary"}
              className={editable 
                ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30" 
                : "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30"
              }
            >
              {editable ? <Edit3 className="h-3.5 w-3.5 mr-1" /> : <Lock className="h-3.5 w-3.5 mr-1" />}
              {editable ? "Activo" : "Bloqueado"}
            </Badge>
          </div>
        );
      },
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
        const estadoEdicion = row.getValue("edicion") as boolean;
        const path = `notas.${row.index}.nota` as const;
        const nota = Number(row.original.nota);

        let bgClass = "bg-muted/50";
        let textClass = "text-foreground";
        let borderClass = "border-border/50";
        
        if (nota >= 90) {
          bgClass = "bg-green-500/10";
          textClass = "text-green-700 dark:text-green-400";
          borderClass = "border-green-500/30";
        } else if (nota >= 70) {
          bgClass = "bg-blue-500/10";
          textClass = "text-blue-700 dark:text-blue-400";
          borderClass = "border-blue-500/30";
        } else if (nota >= 51) {
          bgClass = "bg-yellow-500/10";
          textClass = "text-yellow-700 dark:text-yellow-400";
          borderClass = "border-yellow-500/30";
        } else if (nota > 0) {
          bgClass = "bg-red-500/10";
          textClass = "text-red-700 dark:text-red-400";
          borderClass = "border-red-500/30";
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          const allowedControlKeys = [
            "Backspace", "Delete", "Tab", "Escape", "Enter",
            "ArrowLeft", "ArrowRight"
          ];

          if (allowedControlKeys.includes(e.key)) return;

          if (e.ctrlKey && ["c", "v", "x", "a"].includes(e.key.toLowerCase())) {
            return;
          }

          if (!/[\d.]/.test(e.key)) {
            e.preventDefault();
            return;
          }

          const input = e.target as HTMLInputElement;
          const { value, selectionStart, selectionEnd } = input;

          const newValue =
            value.slice(0, selectionStart!) +
            e.key +
            value.slice(selectionEnd!);

          if ((newValue.match(/\./g) || []).length > 1) {
            e.preventDefault();
            return;
          }

          if (/\.\d{2}$/.test(newValue)) {
            e.preventDefault();
            return;
          }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;

          if (Number(val) > 100) {
            e.target.value = "100";
            setValue(path, 100);
            return;
          }

          if (/^\d*\.?\d{0,2}$/.test(val)) {
            setValue(path, val === "" ? 0 : Number(val));
          }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          let value = Number(e.target.value);

          if (isNaN(value)) value = 0;
          if (value > 100) value = 100;
          if (value < 0) value = 0;

          const formatted = value.toFixed(2);

          e.target.value = formatted;
          setValue(path, Number(formatted));
        };

        return (
          <div className="flex justify-center">
            <Input
              type="text"
              className={`w-24 text-center font-bold ${bgClass} ${textClass} border ${borderClass} ${
                !estadoEdicion ? "cursor-not-allowed opacity-60" : ""
              }`}
              defaultValue={Number(row.original.nota).toFixed(2)}
              readOnly={!estadoEdicion}
              disabled={!estadoEdicion}
              {...register(path)}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "comentarios",
      header: () => (
        <div className="flex items-center justify-center gap-2 font-bold">
          <MessageSquare className="h-4 w-4" />
          Comentarios
        </div>
      ),
      cell: ({ row }) => {
        const estadoEdicion = row.getValue("edicion") as boolean;
        return (
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Agregar comentario..."
              defaultValue={row.original.comentarios}
              readOnly={!estadoEdicion}
              disabled={!estadoEdicion}
              {...register(`notas.${row.index}.comentarios`)}
              onChange={(e) => {
                row.original.comentarios = e.target.value;
              }}
              className={`min-w-[200px] ${!estadoEdicion ? "cursor-not-allowed opacity-60" : ""}`}
            />
          </div>
        )
      }
    },
  ]
