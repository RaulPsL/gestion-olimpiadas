import { Olimpista, columns } from "@/components/tables/ColumnsOlimpista";
import { DataTable } from "@/components/tables/DataTable";

const getData: Olimpista[] = [
    {
        name: "Javier",
        email: "javier@est.umss.edu",
        fase: "Eliminatorias",
        area: "Biologia",
        puntaje: 37,
    },
    {
        name: "Morel",
        email: "morel@est.umss.edu",
        fase: "Finales",
        area: "Biologia",
        puntaje: 57,
    },
    {
        name: "Laura",
        email: "lauraa@est.umss.edu",
        fase: "Finales",
        area: "Bilogia",
        puntaje: 89,
    },
];

export default function TableOlimpistas() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={getData} />
    </div>
  )
}