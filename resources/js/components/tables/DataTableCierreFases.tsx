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
import React, { Dispatch } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CheckCircle, CircleAlert, Clock, Search, X } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Spinner } from "../ui/spinner";
import { Combobox } from "../Combobox";
import { UserData } from "@/hooks/use-context";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";

interface DataTableProps<TData, TValue> {
  user: UserData,
  columns: ColumnDef<TData, TValue>[],
  otherData: TData[],
  fechaFin: Date,
  setUpdate: Dispatch<React.SetStateAction<boolean>>,
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
  setUpdate,
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
    tipo_fase: false,
    fase_id: false,
  });
  const [selectedEstado, setSelectedEstado] = React.useState<(string | number)[]>([]);
  const [selectedFase, setSelectedFase] = React.useState<(string | number)[]>([]);

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

  const estadosItems = [
    { id: 1, value: "en curso", label: "En Curso" },
    { id: 2, value: "pendiente", label: "Pendiente" },
    { id: 3, value: "finalizada", label: "Finalizada" },
  ];

  const fasesItems = [
    { id: 1, value: "preliminares", label: "Preliminares" },
    { id: 2, value: "clasificatorias", label: "Clasificatorias" },
    { id: 3, value: "finales", label: "Finales" },
  ];

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

  const handleEstadoChange = (values: (string | number)[]) => {
    setSelectedEstado(values);
    
    if (values.length === 0 || values.includes("todos")) {
      table.getColumn("estado")?.setFilterValue("");
      setSelectedEstado([]);
    } else {
      table.getColumn("estado")?.setFilterValue(values[0]);
    }
  };

  const handleFaseChange = (values: (string | number)[]) => {
    setSelectedFase(values);
    
    if (values.length === 0 || values.includes("todos")) {
      table.getColumn("tipo_fase")?.setFilterValue("");
      setSelectedFase([]);
    } else {
      table.getColumn("tipo_fase")?.setFilterValue(values[0]);
    }
  };

  const clearFilters = () => {
    table.resetColumnFilters();
    setSelectedEstado([]);
    setSelectedFase([]);
  };

  React.useEffect(() => {
    if (isLoading || apiError !== '') {
      setDialogOpen(true);
    }
    if (success) {
      const timer = setTimeout(() => {
        setUpdate(prev => !prev);
        setDialogOpen(false);
        setSuccess(false);
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
      {/* Barra de filtros */}
      <div className="mb-4 p-3 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border border-border/50 shadow-lg rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Buscar por encargado */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por encargado..."
              value={(table.getColumn("encargado")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("encargado")?.setFilterValue(event.target.value)
              }
              className="pl-10 bg-background/60 border-border/50 focus:border-primary/50 transition-all"
            />
          </div>

          {/* Filtro por Estado */}
          <Combobox
            items={estadosItems}
            value={selectedEstado}
            onChange={handleEstadoChange}
            placeholder="Estado..."
            searchPlaceholder="Buscar estado..."
            emptyMessage="No se encontró el estado."
            multiple={false}
            className="w-full sm:w-[180px]"
          />

          {/* Filtro por Fase */}
          <Combobox
            items={fasesItems}
            value={selectedFase}
            onChange={handleFaseChange}
            placeholder="Tipo fase..."
            searchPlaceholder="Buscar fase..."
            emptyMessage="No se encontró la fase."
            multiple={false}
            className="w-full sm:w-[180px]"
          />

          {/* Botón para limpiar filtros */}
          {(table.getState().columnFilters.length > 0 || selectedEstado.length > 0 || selectedFase.length > 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="whitespace-nowrap"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>

        {/* Información de resultados */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{table.getRowModel().rows.length}</span> de{" "}
            <span className="font-semibold text-foreground">{table.getFilteredRowModel().rows.length}</span> resultado(s)
          </p>
        </div>
      </div>

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
                          Procesando operación...
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <div className="flex justify-center items-center py-8">
                        <Spinner className="h-12 w-12" />
                      </div>
                      <AlertDialogDescription className="text-center text-muted-foreground">
                        Por favor espere mientras se completa la operación. Este proceso puede tomar unos momentos.
                      </AlertDialogDescription>
                    </>
                  )}

                  {(apiError !== '') && (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500 text-center">
                          Error al procesar la solicitud
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Alert variant="destructive">
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>No se pudo completar la operación</AlertTitle>
                        <AlertDescription>
                          {apiError}
                        </AlertDescription>
                      </Alert>
                      <AlertDialogFooter>
                        <AlertDialogAction onClick={handleCloseDialog}>
                          Aceptar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </>
                  )}

                  {success && (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-green-600 text-center">
                          ¡Operación exitosa!
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Cambios guardados correctamente</AlertTitle>
                        <AlertDescription className="text-green-700">
                          {
                            user.rol.sigla === 'EVA' || user.rol.sigla === 'EDA' ?
                              "Las calificaciones de la fase han sido registradas exitosamente en el sistema." :
                              "La fecha límite para modificar calificaciones ha sido extendida correctamente."
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
                            Confirmar cierre de fase
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Está a punto de cerrar esta fase y guardar las calificaciones
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Alert className="border-amber-200 bg-amber-50">
                          <CircleAlert className="h-4 w-4 text-amber-600" />
                          <AlertTitle className="text-amber-900">Importante</AlertTitle>
                          <AlertDescription className="text-amber-800">
                            El cierre de fase solo puede realizarse antes de que expire la fecha límite establecida. Una vez guardado, las calificaciones quedarán registradas en el sistema.
                          </AlertDescription>
                        </Alert>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleSubmit}
                          >
                            Confirmar cierre
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </>
                    ) : (
                      <>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">
                            Extender tiempo de modificación
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Está a punto de ampliar el plazo para modificar calificaciones
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <Alert className="border-blue-200 bg-blue-50">
                          <CircleAlert className="h-4 w-4 text-blue-600" />
                          <AlertTitle className="text-blue-900">Consideraciones importantes</AlertTitle>
                          <AlertDescription className="text-blue-800">
                            <li>El tiempo adicional máximo permitido es de una hora (60 minutos).</li>
                            <li>Esta extensión solo afecta a esta fase específica y no modifica los horarios de otras áreas o eventos programados.</li>
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
                                    setValue('aumento_fin', Number(val))
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
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleSubmit}
                          >
                            Confirmar extensión
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
                  className="group border-b border-border/30 hover:bg-gradient-to-r hover:from-primary/5 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 ease-out hover:shadow-md hover:scale-[1.01] hover:rounded-lg"
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell 
                      key={cell.id}
                      className={`transition-all duration-300 group-hover:translate-x-1 ${
                        cellIndex === 0 ? 'group-hover:rounded-l-lg' : ''
                      } ${
                        cellIndex === row.getVisibleCells().length - 1 ? 'group-hover:rounded-r-lg' : ''
                      }`}
                    >
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
