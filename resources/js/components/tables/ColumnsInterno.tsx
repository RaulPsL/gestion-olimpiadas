import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import FormAssignArea from "@/forms/FormAssignArea";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Interno = {
  ci: number,
  nombre: string,
  celular: number,
  email: string;
  sigla_areas: string,
  areas: string;
  fase: string,
  nivel: string,
  rol: string,
};

export const columnsInterno: ColumnDef<Interno>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "ci",
    header: "C.I",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "sigla_areas",
    header: "Áreas",
  },
  {
    accessorKey: "nivel",
    header: "Nivel",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.nivel}</div>
    ),
  },
  {
    accessorKey: "integrantes",
    header: "Integrantes",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 transition-colors"
            >
              Asignar
            </Badge>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] w-full max-h-[90vh] h-fit flex flex-col">
            <FormAssignArea otherData={row.original}/>
          </DialogContent>
        </Dialog>
      );
    }
  },
]