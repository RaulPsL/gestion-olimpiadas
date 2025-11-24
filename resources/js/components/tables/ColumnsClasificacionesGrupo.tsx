import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
    ArrowUpDown,
    Award,
    Medal,
    Trophy,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DataTable } from "./DataTableGrupo";

type GrupoOlimpista = {
    nombre: string,
    ci: string,
    email: string,
    estado: string,
    grado: string,
}

export const columns: ColumnDef<GrupoOlimpista>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "ci",
        header: "CI",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.original.estado;
            let className = "capitalize text-white bg-green-600"; // por defecto
            if (estado === "desclasificado") className = "capitalize text-white bg-gray-500";
            if (estado === "no clasificado") className = "capitalize text-white bg-red-700";
            return <Badge className={className}>{estado}</Badge>;
        },
    },
    {
        accessorKey: "grado",
        header: "Grado",
    },
]

export type CalificacionGrupo = {
    nombre: string,
    nota_grupo_id: number,
    edicion: boolean,
    colegio: string,
    departamento: string,
    estado: string,
    area: string,
    nivel: string,
    nota: number,
    integrantes: any[],
    comentarios: string,
};

export const columnsGrupo: ColumnDef<CalificacionGrupo>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estadoActual = row.original.estado;
            const path = `notas.${row.index}.estado_olimpista` as const;

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
    {
        accessorKey: "colegio",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Colegio <ArrowUpDown />
                </Button>
            )
        },
    },
    {
        accessorKey: "departamento",
        header: "Departamento",
    },
    {
        accessorKey: "fase",
        header: "Fase"
    },
    {
        accessorKey: "posicion",
        header: "Posición",
        cell: ({ row }) => {
            const posicion = Number(row.id) + 1;
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
        accessorKey: "integrantes",
        header: "Integrantes",
        cell: ({ row }) => {
            const integrantes = row.original.integrantes;
            const count = Array.isArray(integrantes) ? integrantes.length : 0;

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Badge
                            variant="secondary"
                            className="cursor-pointer hover:bg-secondary/80 transition-colors"
                        >
                            {count} {count === 1 ? 'Integrante' : 'Integrantes'}
                        </Badge>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] w-full max-h-[90vh] h-fit flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Lista de Integrantes</DialogTitle>
                            <DialogDescription>
                                Detalles de todos los integrantes del grupo
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden mt-4 pr-2">
                            <DataTable columns={columns} data={integrantes} />
                        </div>
                    </DialogContent>
                </Dialog>
            );
        }
    },
]