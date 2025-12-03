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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Search, Filter, X } from "lucide-react";
import { Combobox } from "../Combobox";
import { nivelesItems } from "@/static/filter-data";
import { Card } from "../ui/card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  fieldSearch?: string,
};

export function DataTable<TData, TValue>({
  columns,
  data,
  fieldSearch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openSearch, setOpenSearch] = React.useState<boolean>(true);
  const [selectedNivel, setSelectedNivel] = React.useState<(string | number)[]>([]);

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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleNivelChange = (values: (string | number)[]) => {
    setSelectedNivel(values);

    // Si selecciona "todos" o no hay selección, limpiar el filtro
    if (values.length === 0 || values.includes("todos")) {
      table.getColumn("grado_escolar")?.setFilterValue("");
      setSelectedNivel([]);
    } else {
      // Si hay un valor seleccionado, aplicar el filtro
      table.getColumn("grado_escolar")?.setFilterValue(values[0]);
    }
  };

  const clearFilters = () => {
    table.resetColumnFilters();
    setSelectedNivel([]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Barra de búsqueda y filtros mejorada */}
      <Card className="p-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {fieldSearch && (
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Buscar por ${fieldSearch}...`}
                value={(table.getColumn(fieldSearch)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(fieldSearch)?.setFilterValue(event.target.value)
                }
                className="pl-10 bg-background/60 border-border/50 focus:border-primary/50 transition-all"
              />
            </div>
          )}

          {/* Combobox para filtrar por nivel */}
          <Combobox
            items={nivelesItems}
            value={selectedNivel}
            onChange={handleNivelChange}
            placeholder="Filtrar nivel..."
            searchPlaceholder="Buscar nivel..."
            emptyMessage="No se encontró el nivel."
            multiple={false}
            className="w-full sm:w-[200px]"
          />

          {/* Botón para limpiar filtros */}
          {(columnFilters.length > 0 || selectedNivel.length > 0) && (
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

        {/* Información de filas */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{table.getRowModel().rows.length}</span> de{" "}
            <span className="font-semibold text-foreground">{table.getFilteredRowModel().rows.length}</span> resultado(s)
          </p>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{table.getFilteredSelectedRowModel().rows.length}</span> fila(s) seleccionada(s)
            </p>
          )}
        </div>
      </Card>

      {/* Tabla con diseño mejorado */}
      <Card className="overflow-hidden border-border/50 shadow-lg bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow 
                  key={headerGroup.id}
                  className="border-b border-border/50 bg-muted/50 hover:bg-muted/50"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id}
                        className="text-center font-bold text-foreground/90 py-2 px-2 first:rounded-tl-lg last:rounded-tr-lg"
                      >
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
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        className="text-center py-2 px-2"
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
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Search className="h-8 w-8 opacity-50" />
                      <p className="text-sm">No se encontraron resultados</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación mejorada */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Página <span className="font-semibold text-foreground">{table.getState().pagination.pageIndex + 1}</span> de{" "}
            <span className="font-semibold text-foreground">{table.getPageCount()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
            >
              Siguiente
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
