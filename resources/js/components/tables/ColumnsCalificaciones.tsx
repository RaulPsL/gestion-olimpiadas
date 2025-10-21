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
import { UseFormRegister } from "react-hook-form";
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
  fechaCalificacion: Date,
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
          { ...register(`notas.${row.index}.nota_olimpista_id`, { valueAsNumber: true }) }
        />
      )
    }
  },
  {
    accessorKey: "nota_fase_id",
    cell: ({ row }) => {
      const faseId = Number(row.original.nota_fase_id);
      return (
        <Input
          type="number"
          defaultValue={faseId}
          { ...register(`notas.${row.index}.nota_fase_id`, { valueAsNumber: true }) }
        />
      )
    }
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.estado;
      let className = 'capitalize text-white bg-green-600';
      if (estado === "clasificado") 
        className = "capitalize text-white bg-blue-500";
      if (estado === "no clasificado")
        className = "capitalize text-white bg-gray-500";
      if (estado === "desclasificado") 
        className="capitalize text-white bg-red-700";
      return (
      <>
        <div
          hidden
        >
          <Input
            type="text"
            defaultValue={estado}
            { ...register(`notas.${row.index}.estado_olimpista`) }
          />
        </div>
        <Badge className={className}>{row.original.estado}</Badge>
      </>)
    }
  },
  {
    accessorKey: "colegio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          U.E
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "departamento",
    header: "Departamento",
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
    accessorKey: "nivel",
    header: "Nivel",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.nivel}</div>
    )
  },
  {
    accessorKey: "posicion",
    header: "Posición",
    cell: ({ row }) => {
      const posicion = Number(row.id) + 1;
      const currentDate = new Date();
      if (row.original.nota > 0 && fechaCalificacion >= currentDate) {
        if (posicion === 1) 
          return (
            <Badge
              className="text-white bg-[#ffd30e] text-sm"
            >
              {posicion} <Trophy size={20}/> 
            </Badge>)
        if (posicion === 2) 
          return (
            <Badge
              className="text-#000000 bg-[#b7bfd6] text-sm"
            >
              {posicion} <Medal size={20}/>
            </Badge>)
        if (posicion === 3) 
          return (
            <Badge
              className="text-#000000 bg-[#da944f] text-sm"
            >
              {posicion} <Medal size={20}/> 
            </Badge>)
      }
      return (
        <Badge
          variant="secondary"
          className="text-sm"
        >
          {fechaCalificacion > currentDate ? posicion : ""} <Award size={20}/> 
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
      const nota = Number(row.original.nota).toFixed(2);
      const estadoEdicion = row.getValue("edicion") as boolean;

      const handleNotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);

        // Restringir el valor entre 0 y 100
        if (value > 100) {
          value = 100;
          e.target.value = "100";
        } else if (value < 0) {
          value = 0;
          e.target.value = "0";
        }

        row.original.nota = value;
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedControlKeys = [
        "Backspace", "Delete", "Tab", "Escape", "Enter",
        "ArrowLeft", "ArrowRight"
      ];

      // Permitir teclas de control o atajos
      if (
        allowedControlKeys.includes(e.key) ||
        (e.ctrlKey && ["a", "c", "v", "x", "A", "C", "V", "X"].includes(e.key))
      ) {
        return;
      }

      const input = e.target as HTMLInputElement;
      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;
      const currentValue = input.value;
      const key = e.key;

      // Solo permitir dígitos y punto decimal
      if (!/[\d.]/.test(key)) {
        e.preventDefault();
        return;
      }

      // Construir el nuevo valor
      const newValue =
        currentValue.substring(0, selectionStart) +
        key +
        currentValue.substring(selectionEnd);

      // 1️⃣ Evitar ceros a la izquierda innecesarios
      if (/^0\d+/.test(newValue)) {
        e.preventDefault();
        return;
      }

      // 2️⃣ Evitar más de un punto decimal
      if ((newValue.match(/\./g) || []).length > 1) {
        e.preventDefault();
        return;
      }

      // 3️⃣ Evitar valores mayores a 100
      const numericValue = Number(newValue);
      if (!isNaN(numericValue) && numericValue > 100) {
        e.preventDefault();
      }
    };


      const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);

        // Validar al perder el foco
        if (value > 100) {
          value = 100;
        } else if (value < 0 || isNaN(value)) {
          value = 0;
        }

        // Formatear a 2 decimales
        e.target.value = value.toFixed(2);
        row.original.nota = value;
      };

      return (
        <Input
          type="number"
          step="0.01"
          defaultValue={nota}
          readOnly={!estadoEdicion}
          disabled={!estadoEdicion}
          max={100.0}
          min={0.0}
          {...register(`notas.${row.index}.nota`, {
            valueAsNumber: true,
            min: 0,
            max: 100,
          })}
          onChange={handleNotaChange}
          onKeyDown={handleKeyDown}
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
          { ...register(`notas.${row.index}.comentarios`)}
          onChange={(e) => {
            row.original.comentarios = e.target.value;
          }}
        />
      )
    }
  },
]