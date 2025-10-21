import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CheckCircle, CircleAlert, CircleX, NotebookPen, SaveAll, ZoomIn, ZoomOut } from "lucide-react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Spinner } from "../ui/spinner";
import { Combobox } from "../Combobox";

interface DataTableProps<TData, TValue, TFormValues extends FieldValues> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  fechaCalificacion: string,
  fechaFin: string,
  handleSubmit: () => void,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  apiError: string,
  setApiError: React.Dispatch<React.SetStateAction<string>>,
  success: boolean,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<TFormValues>,
  handleToggleEdicion: (edicion: boolean) => void
};

const nivelesItems = [
  {
    id: "todos",
    value: "todos",
    label: "Todos los niveles",
  },
  {
    id: "primaria",
    value: "primaria",
    label: "Primaria",
  },
  {
    id: "secundaria",
    value: "secundaria",
    label: "Secundaria",
  },
];

export function DataTableCalificaciones<TData, TValue, TFormValues extends FieldValues>({
  columns,
  data,
  fechaCalificacion,
  fechaFin,
  handleSubmit,
  isLoading,
  setIsLoading,
  apiError,
  setApiError,
  success,
  setSuccess,
  reset,
  handleToggleEdicion
}: DataTableProps<TData, TValue, TFormValues>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    nota_olimpista_id: false,
    nota_fase_id: false,
    edicion: false,
  });
  const [openToEdition, setOpenToEdition] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const [selectedNivel, setSelectedNivel] = React.useState<(string | number)[]>([]);

  const currentDate = new Date();
  const fin = new Date(fechaFin);
  const calificacion = new Date(fechaCalificacion);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: () => {},
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  React.useEffect(() => {
    if (isLoading || apiError !== '') {
      setDialogOpen(true);
    }
    if (success) {
      const timer = setTimeout(() => {
        setDialogOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    console.log('Datos de calificaciones: ', data);

  }, [isLoading, dialogOpen]);

  const handleConfirmSave = () => {
    setIsLoading(true);
    handleSubmit();
    if (success) {
      setDialogOpen(true);
      setOpenToEdition(false);
      handleToggleEdicion(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setApiError('');
    setIsLoading(false);
    setSuccess(false)
  };

  const handleNivelChange = (values: (string | number)[]) => {
    setSelectedNivel(values);
    
    // Si selecciona "todos" o no hay selección, limpiar el filtro
    if (values.length === 0 || values.includes("todos")) {
      table.getColumn("nivel")?.setFilterValue("");
      setSelectedNivel([]);
    } else {
      // Si hay un valor seleccionado, aplicar el filtro
      table.getColumn("nivel")?.setFilterValue(values[0]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        {
          !openSearch && (
            <>
              <Button
                variant="outline"
                onClick={() => setOpenSearch(true)}
              >
                <ZoomIn />
              </Button>
              
              {/* Combobox para filtrar por nivel */}
              <Combobox
                items={nivelesItems}
                value={selectedNivel}
                onChange={handleNivelChange}
                placeholder="Filtrar por nivel..."
                searchPlaceholder="Buscar nivel..."
                emptyMessage="No se encontró el nivel."
                multiple={false}
                className="w-[200px]"
              />
            </>
          )
        }
        {
          openSearch && (
            <>
              <Input
                placeholder="Buscar por nombre del olimpista..."
                value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("nombre")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Button
                variant="outline"
                onClick={() => setOpenSearch(false)}
              >
                <ZoomOut />
              </Button>
            </>
          )
        }
          
        <div className="ml-auto flex flex-row items-center gap-2">
          { (calificacion < fin && fin < currentDate) ? (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                <CircleAlert className="h-4 w-4 flex-shrink-0" />
                <span>Se terminó la fase.</span>
              </div>
            ) : (
              <Alert className="border-green-200 bg-green-50 items-center py-2 px-3 w-fit">
                <CircleAlert className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 ml-2">
                  Esperando avalación ...
                </AlertDescription>
              </Alert>
            )
          }

          { openToEdition ? 
            (<AlertDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              defaultOpen={dialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <SaveAll className="mr-2 h-4 w-4" />
                  Guardar
                </Button>
              </AlertDialogTrigger>
              
              <AlertDialogContent>
                
                {isLoading && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        Guardando calificaciones...
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-center items-center py-8">
                      <Spinner className="h-12 w-12" />
                    </div>
                    <AlertDialogDescription className="text-center text-muted-foreground">
                      Por favor espera mientras se guardan los cambios
                    </AlertDialogDescription>
                  </>
                )}

                { (apiError !== '') && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500 text-center">
                        Ocurrió un error
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <Alert variant="destructive">
                      <CircleAlert className="h-4 w-4" />
                      <AlertTitle>Error al guardar</AlertTitle>
                      <AlertDescription>
                        {apiError}
                      </AlertDescription>
                    </Alert>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={handleCloseDialog}>
                        Entendido
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                )}

                { success && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-green-600 text-center">
                        ¡Éxito en la acción!
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Guardado exitoso</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Las calificaciones se guardaron correctamente
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                {!isLoading && !apiError && !success && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        ¿Estás seguro de guardar estas calificaciones?
                      </AlertDialogTitle>
                      <AlertDialogDescription />
                    </AlertDialogHeader>
                    <Alert variant="destructive">
                      <CircleAlert className="h-4 w-4" />
                      <AlertTitle>Atención</AlertTitle>
                      <AlertDescription>
                        Esta acción solo se puede realizar antes de que la fecha de cierre de la fase haya terminado.
                      </AlertDescription>
                    </Alert>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleConfirmSave}
                      >
                        Sí, guardar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                )}
              </AlertDialogContent>
            </AlertDialog>)
            :
            (<Button 
              onClick={() => {
                setOpenToEdition(true)
                handleToggleEdicion(true)
              }}
              disabled={fin < currentDate && calificacion < fin}
            >
              <NotebookPen className="mr-2 h-4 w-4" />
              Calificar
            </Button>)
          }
          {
            openToEdition && (
            <Button
              variant="destructive"
              onClick={() => {
                reset()
                setOpenToEdition(false)
                handleToggleEdicion(false)
              }}>
              <CircleX className="mr-2 h-4 w-4" />
              Cancelar
            </Button>)
          }
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}