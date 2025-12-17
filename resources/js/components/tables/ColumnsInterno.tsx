import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import FormAssignArea from "@/forms/FormAssignArea";
import { Button } from "../ui/button";
import { ArrowUpDown, Flag, IdCard, UserCircle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Interno = {
  ci: number,
  nombre: string,
  celular: number,
  email: string;
  sigla_areas: string,
  areas: string;
  // fase: string,
  // nivel: string,
  rol: string,
};

const areaColors: Record<string, { bg: string; text: string; border: string }> = {
  "MATEMÁTICAS": { bg: "bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", border: "border-amber-500/30" },
  "FÍSICA": { bg: "bg-blue-500/10", text: "text-blue-700 dark:text-blue-400", border: "border-blue-500/30" },
  "QUÍMICA": { bg: "bg-orange-500/10", text: "text-orange-700 dark:text-orange-400", border: "border-orange-500/30" },
  "BIOLOGÍA": { bg: "bg-green-500/10", text: "text-green-700 dark:text-green-400", border: "border-green-500/30" },
  "INFORMÁTICA": { bg: "bg-cyan-500/10", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-500/30" },
  "ASTRONOMÍA": { bg: "bg-purple-500/10", text: "text-purple-700 dark:text-purple-400", border: "border-purple-500/30" },
  "ROBÓTICA": { bg: "bg-pink-500/10", text: "text-pink-700 dark:text-pink-400", border: "border-pink-500/30" },
};

const usuariosColors: Record<string, { bg: string; text: string; border: string }> = {
  "EVA": { bg: "bg-purple-500/10", text: "text-purple-700 dark:text-purple-400", border: "border-purple-500/30" },
  "EDA": { bg: "bg-green-500/10", text: "text-green-700 dark:text-green-400", border: "border-green-500/30" },
};

export const columnsInterno: ColumnDef<Interno>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 font-medium">
        <span className="capitalize">{row.getValue("nombre")}</span>
      </div>
    ),
  },
  {
    accessorKey: "ci",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold">
        <IdCard className="h-4 w-4" />
        CI
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline" className="font-mono bg-muted/50">
          {row.getValue("ci")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "areas",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <Flag className="mr-2 h-4 w-4" />
          Área
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const area = String(row.getValue("areas")).toUpperCase();
      const colors = areaColors[area] || areaColors["FÍSICA"];

      return (
        <div className="flex justify-center">
          <Badge
            className={`font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {row.getValue("areas")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "rol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const rol = String(row.getValue("sigla_areas")).toUpperCase();
      const colors = usuariosColors[rol] || usuariosColors["EDA"];

      return (
        <div className="flex justify-center">
          <Badge
            className={`font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {row.getValue("rol")}
          </Badge>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "nivel",
  //   header: "Nivel",
  //   cell: ({ row }) => (
  //     <div className="text-center capitalize">{row.original.nivel}</div>
  //   ),
  // },
  {
    accessorKey: "acciones",
    header: "Edición",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 transition-colors"
            >
              Editar usuario
            </Badge>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] w-full max-h-[90vh] h-fit flex flex-col">
            <FormAssignArea otherData={row.original} />
          </DialogContent>
        </Dialog>
      );
    }
  },
]