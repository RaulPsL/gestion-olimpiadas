import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  Award,
  Medal,
  Trophy,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormNotas } from "@/forms/interfaces/Notas";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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

export const createColumnsCalificaciones = (
  register: UseFormRegister<FormNotas>,
  setValue: UseFormSetValue<FormNotas>,
): ColumnDef<Calificacion>[] => [
    {
      accessorKey: "nombre",
      header: "Nombre",
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
          />
        )
      }
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estadoActual = row.original.estado;

        // Colores según estado
        let className = "capitalize text-white bg-green-600"; // por defecto
        if (estadoActual === "desclasificado") className = "capitalize text-white bg-gray-500";
        if (estadoActual === "no clasificado") className = "capitalize text-white bg-red-700";

        return (
          <Button
            size="sm"
            variant={estadoActual === "desclasificado" ? "destructive" : "outline"}
            className={className}
            disabled={estadoActual === "desclasificado"} // opcional: no permitir deshacer
          >
            {estadoActual}
          </Button>
        );
      },
    },
    // {
    //   accessorKey: "colegio",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         U.E
    //         <ArrowUpDown />
    //       </Button>
    //     )
    //   },
    // },
    {
      accessorKey: "departamento",
      header: "Departamento",
    },
    {
      accessorKey: "fase",
      header: "Fase"
    },
    // {
    //   accessorKey: "nivel",
    //   header: "Nivel",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.original.nivel}</div>
    //   )
    // },
    {
      accessorKey: "posicion",
      header: "Posición",
      cell: ({ row }) => {
        const posicion = Number(row.id) + 1;
        const currentDate = new Date();
        if (row.original.nota > 0) {
          if (posicion === 1)
            return (
              <Badge
                className="text-white bg-[#ffd30e] text-sm"
              >
                {posicion} <Trophy size={20} />
              </Badge>)
          if (posicion === 2)
            return (
              <Badge
                className="text-#000000 bg-[#b7bfd6] text-sm"
              >
                {posicion} <Medal size={20} />
              </Badge>)
          if (posicion === 3)
            return (
              <Badge
                className="text-#000000 bg-[#da944f] text-sm"
              >
                {posicion} <Medal size={20} />
              </Badge>)
        }
        return (
          <Badge
            variant="secondary"
            className="text-sm"
          >
            {row.original.nota > 0 ? posicion : ""} <Award size={20} />
          </Badge>
        )
      }
    },
    {
      accessorKey: "edicion",
      header: "Edición",
    },
    {
      accessorKey: "nota",
      header: "Nota",
      cell: ({ row }) => {
        const estadoEdicion = row.getValue("edicion") as boolean;

        // Path tipado para evitar errores de TS
        const path = `notas.${row.index}.nota` as const;

        // Solo permitir números, 1 punto y máximo 2 decimales
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          const allowedControlKeys = [
            "Backspace", "Delete", "Tab", "Escape", "Enter",
            "ArrowLeft", "ArrowRight"
          ];

          if (allowedControlKeys.includes(e.key)) return;

          // ctrl + (c,v,x,a)
          if (e.ctrlKey && ["c", "v", "x", "a"].includes(e.key.toLowerCase())) {
            return;
          }

          // Permitir solo números o punto
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

          // No más de un punto
          if ((newValue.match(/\./g) || []).length > 1) {
            e.preventDefault();
            return;
          }

          // Máximo 2 decimales
          if (/\.\d{2}$/.test(newValue)) {
            e.preventDefault();
            return;
          }
        };

        // Mientras escribe: permitir valores válidos
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;

          // Si el usuario intenta escribir más de 100
          if (Number(val) > 100) {
            e.target.value = "100";
            setValue(path, 100);
            return;
          }

          // Permitir escritura progresiva
          if (/^\d*\.?\d{0,2}$/.test(val)) {
            setValue(path, val === "" ? 0 : Number(val));
          }
        };

        // Al salir del input: corregir valor final
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
          <Input
            type="text" // IMPORTANTE para validar correctamente
            className="w-24"
            defaultValue={Number(row.original.nota).toFixed(2)}
            readOnly={!estadoEdicion}
            disabled={!estadoEdicion}
            {...register(path)}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        );
      },
    },
    {
      accessorKey: "comentarios",
      header: "Comentarios",
      cell: ({ row }) => {
        const estadoEdicion = row.getValue("edicion") as boolean;
        return (
          <Input
            type="text"
            defaultValue={row.original.comentarios}
            readOnly={!estadoEdicion}
            disabled={!estadoEdicion}
            {...register(`notas.${row.index}.comentarios`)}
            onChange={(e) => {
              row.original.comentarios = e.target.value;
            }}
          />
        )
      }
    },
  ]