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
import { CheckCircle, CircleAlert, CircleX, NotebookPen, SaveAll } from "lucide-react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Spinner } from "../ui/spinner";

interface DataTableProps<TData, TValue, TFormValues extends FieldValues> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  handleSubmit: () => void,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  apiError: string,
  setApiError: React.Dispatch<React.SetStateAction<string>>,
  success: boolean,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export function DataTableCierrresFases<TData, TValue, TFormValues extends FieldValues>({
  columns,
  data,
  isLoading,
  handleSubmit,
  setIsLoading,
  apiError,
  setApiError,
  success,
  setSuccess,
  dialogOpen,
  setDialogOpen,
}: DataTableProps<TData, TValue, TFormValues>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    usuario_encargado_id: false,
    usuario_evaluador_id: false,
    fase_id: false,
  });

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
    onRowSelectionChange: () => { },
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
                        Las calificaciones se guardaron correctamente
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                {!isLoading && !apiError && !success && (
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
                )}
              </AlertDialogContent>
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