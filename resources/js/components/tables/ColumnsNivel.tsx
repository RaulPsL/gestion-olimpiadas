import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Layers, Tag, Pencil, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Nivel = {
    nombre: string;
    grados: string[]; // IDs para el backend
    gradosInfo?: { id: string; label: string }[]; // Info completa para la tabla
};

interface ColumnsProps {
    onEdit?: (index: number, nivel: Nivel) => void;
    onDelete?: (index: number) => void;
}

export const createColumns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Nivel>[] => [
    {
        accessorKey: "nombre",
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                <Tag className="h-4 w-4" />
                Nombre del Nivel
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-center font-semibold">{row.original.nombre}</div>
        ),
    },
    {
        accessorKey: "grados",
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                <Layers className="h-4 w-4" />
                Grados Asociados
            </div>
        ),
        cell: ({ row }) => {
            const gradosInfo = row.original.gradosInfo || [];
            return (
                <div className="flex justify-center gap-1 flex-wrap">
                    {gradosInfo && gradosInfo.length > 0 ? (
                        gradosInfo.map((grado, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="font-medium text-sm bg-primary/10 text-primary border-primary/20 px-3 py-1"
                            >
                                {grado.label}
                            </Badge>
                        ))
                    ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                            Sin grados
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        id: "acciones",
        header: () => (
            <div className="flex items-center justify-center gap-2 font-bold">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const index = row.index;
            const nivel = row.original;

            return (
                <div className="flex justify-center gap-2">
                    {/* Botón Editar */}
                    {onEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(index, nivel)}
                            className="h-8 w-8 p-0"
                            title="Editar nivel"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Botón Eliminar con confirmación */}
                    {onDelete && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    title="Eliminar nivel"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción eliminará el nivel "{nivel.nombre}" y no se puede deshacer.
                                        {nivel.grados && nivel.grados.length > 0 && (
                                            <span className="block mt-2 font-medium">
                                                Este nivel tiene {nivel.grados.length} grado(s) asociado(s).
                                            </span>
                                        )}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => onDelete(index)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            );
        },
    },
];

// Columnas por defecto sin acciones (retrocompatibilidad)
export const columns = createColumns({});
