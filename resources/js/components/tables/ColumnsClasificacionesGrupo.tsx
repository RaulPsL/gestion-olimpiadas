import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
    Award,
    Medal,
    Trophy,
    User,
    IdCard,
    Mail,
    GraduationCap,
    Users,
    School,
    MapPin,
    Star,
    CheckCircle,
    XCircle,
    CircleDashed,
    ArrowUpDown,
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

export const columns: ColumnDef<GrupoOlimpista>[] = [
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
        accessorKey: "ci",
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                <IdCard className="h-4 w-4" />
                CI
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge variant="outline" className="font-mono bg-muted/50">
                    {row.original.ci}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                <Mail className="h-4 w-4" />
                Email
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-center text-sm text-muted-foreground">{row.original.email}</div>
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
        },
    },
    {
        accessorKey: "grado",
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
                    {row.original.grado}
                </Badge>
            </div>
        ),
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
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                <Users className="h-4 w-4" />
                Nombre del Grupo
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
                <Star className="h-4 w-4" />
                Estado
            </div>
        ),
        cell: ({ row }) => {
            const estadoActual = row.original.estado.toLowerCase();
            const config = estadoConfig[estadoActual] || estadoConfig["no clasificado"];
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
        },
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
                    Colegio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-center text-sm font-medium">{row.original.colegio}</div>
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
            <div className="flex justify-center">
                <Badge 
                    variant="secondary"
                    className="capitalize bg-primary/10 text-primary border-primary/20"
                >
                    {row.original.departamento}
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
                Edición
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-center">{row.original.edicion ? "Sí" : "No"}</div>
        ),
    },
    {
        accessorKey: "integrantes",
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                <Users className="h-4 w-4" />
                Integrantes
            </div>
        ),
        cell: ({ row }) => {
            const integrantes = row.original.integrantes;
            const count = Array.isArray(integrantes) ? integrantes.length : 0;

            return (
                <div className="flex justify-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Badge
                                className="cursor-pointer hover:scale-105 transition-all bg-primary/15 text-primary border-primary/30 hover:bg-primary/25 px-4 py-1.5 font-semibold"
                            >
                                <Users className="h-3.5 w-3.5 mr-1.5" />
                                {count} {count === 1 ? 'Integrante' : 'Integrantes'}
                            </Badge>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] w-full max-h-[90vh] h-fit flex flex-col">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Lista de Integrantes
                                </DialogTitle>
                                <DialogDescription>
                                    Detalles de todos los integrantes del grupo
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex-1 overflow-y-auto overflow-x-hidden mt-4 pr-2">
                                <DataTable columns={columns} data={integrantes} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        }
    },
]
