import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, GraduationCap, IdCard, School, MapPin, User, Layers, Flag } from "lucide-react";
import { Badge } from "../ui/badge";

export type Olimpista = {
  nombre: string;
  ci: number;
  colegio: string;
  departamento: string;
  tutor_academico: string;
  fase: string;
  area: string;
  nivel?: string;
};

// Colores por área
const areaColors: Record<string, { bg: string; text: string; border: string }> = {
  "MATEMÁTICAS": { bg: "bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", border: "border-amber-500/30" },
  "FÍSICA": { bg: "bg-blue-500/10", text: "text-blue-700 dark:text-blue-400", border: "border-blue-500/30" },
  "QUÍMICA": { bg: "bg-orange-500/10", text: "text-orange-700 dark:text-orange-400", border: "border-orange-500/30" },
  "BIOLOGÍA": { bg: "bg-green-500/10", text: "text-green-700 dark:text-green-400", border: "border-green-500/30" },
  "INFORMÁTICA": { bg: "bg-cyan-500/10", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-500/30" },
  "ASTRONOMÍA": { bg: "bg-purple-500/10", text: "text-purple-700 dark:text-purple-400", border: "border-purple-500/30" },
  "ROBÓTICA": { bg: "bg-pink-500/10", text: "text-pink-700 dark:text-pink-400", border: "border-pink-500/30" },
};

// Colores por fase
const faseColors: Record<string, { bg: string; text: string; border: string }> = {
  "preliminares": { bg: "bg-slate-500/10", text: "text-slate-700 dark:text-slate-400", border: "border-slate-500/30" },
  "clasificatorias": { bg: "bg-indigo-500/10", text: "text-indigo-700 dark:text-indigo-400", border: "border-indigo-500/30" },
  "finales": { bg: "bg-yellow-500/10", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-500/30" },
};

export const columns: ColumnDef<Olimpista>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <GraduationCap className="mr-2 h-4 w-4" />
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
    accessorKey: "nivel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <Layers className="mr-2 h-4 w-4" />
          Nivel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const nivel = row.getValue("nivel") as string;
      if (!nivel) return <div className="text-center text-muted-foreground">-</div>;
      
      return (
        <div className="text-center">
          <Badge variant="secondary" className="capitalize bg-violet-500/10 text-violet-700 border-violet-500/30">
            {nivel}
          </Badge>
        </div>
      );
    },
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
    accessorKey: "colegio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <School className="mr-2 h-4 w-4" />
          Unidad Educativa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center max-w-xs mx-auto">
        <p className="text-sm font-medium truncate">{row.getValue("colegio")}</p>
      </div>
    ),
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
      <div className="text-center">
        <Badge variant="secondary" className="capitalize bg-primary/10 text-primary border-primary/20">
          {row.getValue("departamento")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "tutor_academico",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <User className="mr-2 h-4 w-4" />
          Tutor Académico
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.getValue("tutor_academico")}
      </div>
    ),
  },
  {
    accessorKey: "fase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center font-bold hover:bg-transparent"
        >
          <Layers className="mr-2 h-4 w-4" />
          Fase
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fase = String(row.getValue("fase")).toLowerCase();
      const colors = faseColors[fase] || faseColors["preliminares"];
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`capitalize font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {row.getValue("fase")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "area",
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
      const area = String(row.getValue("area")).toUpperCase();
      const colors = areaColors[area] || areaColors["FÍSICA"];
      
      return (
        <div className="flex justify-center">
          <Badge 
            className={`font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {row.getValue("area")}
          </Badge>
        </div>
      );
    },
  },
]
