import { Interno, columns } from "@/components/tables/ColumnsInterno";
import { DataTable } from "@/components/tables/DataTable";

const getData: Interno[] = [
    {
        name: "Eusevio",
        email: "eusevio@fcyt.umss.bo",
        area: "Biologia",
    },
    {
        name: "Catari",
        email: "catari@fcyt.umss.bo",
        area: "Matematicas",
    },
    {
        name: "Leticia",
        email: "leticia@est.umss.edu",
        area: "Programacion",
    },
];

export default function TableInternos() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={getData} />
    </div>
  )
}