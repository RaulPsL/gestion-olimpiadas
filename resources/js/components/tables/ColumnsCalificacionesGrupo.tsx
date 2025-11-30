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
    MessageSquare,
    Edit3,
    Lock,
    CheckCircle,
    XCircle,
    CircleDashed,
    ArrowUpDown,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormNotasGrupo } from "@/forms/interfaces/NotasGrupos";
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

export const createColumnsCalificacionesGrupo = (
    register: UseFormRegister<FormNotasGrupo>,
    setValue: UseFormSetValue<FormNotasGrupo>,
    fechaCalificacion: Date,
): ColumnDef<CalificacionGrupo>[] => [
        {
            accessorKey: "nombre",
            header: () => (
                <div className="flex items-center justify-center gap-2 font-bold">
                    <Users className="h-4 w-4" />
                    Nombre del Grupo
                </div>
            ),
            cell: ({ row }) => (
                <div className="text-center font-semibold capitalize">{row.getValue("nombre")}</div>
            ),
        },
        {
            accessorKey: "nota_olimpista_id",
            cell: ({ row }) => {
                const grupoId = Number(row.original.nota_grupo_id);
                return (
                    <Input
                        type="number"
                        defaultValue={grupoId}
                        {...register(`notas.${row.index}.nota_grupo_id`, { valueAsNumber: true })}
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
                <div className="text-center text-sm font-medium">{row.getValue("colegio")}</div>
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
