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
import { CheckCircle, CircleAlert, CircleX, Clock, NotebookPen, SaveAll } from "lucide-react";
import { FieldValues, UseFormReset, UseFormSetValue } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Spinner } from "../ui/spinner";
import { UserData } from "@/hooks/use-context";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";

interface DataTableProps<TData, TValue> {
  user: UserData,
  columns: ColumnDef<TData, TValue>[],
  otherData: TData[],
  fechaFin: Date,
  handleSubmit: () => void,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  apiError: string,
  setApiError: React.Dispatch<React.SetStateAction<string>>,
  success: boolean,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: UseFormSetValue<FormCierreFase | FormGetupFase>,
};

export function DataTableCierrresFases<TData, TValue>({
  user,
  columns,
  otherData,
  fechaFin,
  isLoading,
  handleSubmit,
  setIsLoading,
  apiError,
  setApiError,
  success,
  setSuccess,
  dialogOpen,
  setDialogOpen,
  setValue,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    usuario_encargado_id: false,
    usuario_evaluador_id: false,
    fase_id: false,
  });

  const table = useReactTable({
    data: otherData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: () => { },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const [minutes, setMinutes] = React.useState(15);

  // Calcular la hora resultante
  const calculateResultTime = () => {
    const resultTime = new Date(fechaFin.getTime() + minutes * 60000);

    const hours = resultTime.getHours().toString().padStart(2, '0');
    const mins = resultTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${mins}`;
  };

  const getCurrentTime = () => {
    return `${fechaFin.getHours().toString().padStart(2, '0')}:${fechaFin.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDuration = (mins: number) => {
    if (mins < 60) {
      return `${mins} minutos`;
    }
    return '1 hora';
  };

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
  }, [isLoading, dialogOpen]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setApiError('');
    setIsLoading(false);
    setSuccess(false)
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto" />

          <div className="flex flex-row content-between">
            <AlertDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              defaultOpen={dialogOpen}>
              <AlertDialogTrigger asChild />

              {
                <AlertDialogContent>

                  {isLoading && (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Guardando cierre...
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

                  {(apiError !== '') && (
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

                  {success && (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-green-600 text-center">
                          ¡Éxito en la accion!
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Guardado exitoso</AlertTitle>
                        <AlertDescription className="text-green-700">
                          {
                            user.rol.sigla === 'EVA' || user.rol.sigla === 'EDA' ?
                              "Las calificaciones se guardaron correctamente" :
                              "La fecha de modificación calificaciones se actualizo correctamente."
                          }
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  {!isLoading && !apiError && !success && (
                    user.rol.sigla === 'EVA' || user.rol.sigla === 'EDA' ? (
                      <>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">
                            ¿Está seguro de realizar el cierre?
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
                            onClick={handleSubmit}
                          >
                            Sí, guardar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </>
                    ) : (
                      <>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">
                            ¿Está seguro de cambiar la fecha?
                          </AlertDialogTitle>
                          <AlertDialogDescription />
                        </AlertDialogHeader>

                        <Alert variant="destructive">
                          <CircleAlert className="h-4 w-4" />
                          <AlertTitle>Atención</AlertTitle>
                          <AlertDescription>
                            <li>Solo se puede agregar hasta una hora.</li>
                            <li>Esta acción no cambiará los proximos eventos de otras áreas.</li>
                          </AlertDescription>
                        </Alert>

                        {/* Time Picker Section */}
                        <div className="px-2">
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Agregar tiempo (minutos):
                            </label>
                            {/* Atajos rápidos */}
                            <div className="grid grid-cols-4 gap-2 mt-3">
                              {[15, 30, 45, 60].map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => {
                                    setMinutes(val);
                                    setValue('aumento_fin', String(val))
                                  }}
                                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${minutes === val
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                  {val} min
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Preview de la hora resultante */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-blue-900">Hora actual:</span>
                                <span className="font-semibold text-blue-900">{getCurrentTime()}</span>
                              </div>
                              <div className="text-blue-600 text-lg font-bold">→</div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-900">Nueva hora:</span>
                                <span className="text-lg font-bold text-blue-600">{calculateResultTime()}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-blue-700 text-center">
                              Se agregará {formatDuration(minutes)}
                            </div>
                          </div>
                        </div>

                        <AlertDialogFooter>
                          <AlertDialogCancel>No</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleSubmit}
                          >
                            Sí, guardar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </>
                    )
                  )}
                </AlertDialogContent>
              }
            </AlertDialog>
          </div>
          <DropdownMenuContent align="end">
            {table?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
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
                  No se encontraron resultados.
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