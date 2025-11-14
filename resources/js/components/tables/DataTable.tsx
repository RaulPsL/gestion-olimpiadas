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
import { ChevronDown, ZoomIn, ZoomOut } from "lucide-react";
import { Combobox } from "../Combobox";
import { nivelesItems } from "@/static/filter-data";

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
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {
          (fieldSearch && !openSearch) && (
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
          (fieldSearch && openSearch) && (
            <>
              <Input
                placeholder={`Buscar por ${fieldSearch}...`}
                value={(table.getColumn(fieldSearch)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(fieldSearch)?.setFilterValue(event.target.value)
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="text-center capitalize"
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
      <div className="w-full overflow-hidden rounded-md border">
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
            Anteriores
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguientes
          </Button>
        </div>
      </div>
    </div>
  )
}
