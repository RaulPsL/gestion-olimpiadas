import { Area, columns } from "@/components/tables/ColumnsArea";
import { DataTable } from "@/components/tables/DataTable";

const getData: Area[] = [
    {
        name: "Biologia",
        estado: "En curso",
        cantidad_fases: 3,
    },
    {
        name: "Fisica",
        estado: "En curso",
        cantidad_fases: 3,
    },
    {
        name: "Matematicas",
        estado: "En espera",
        cantidad_fases: 3,
    },
    {
        name: "Programacion",
        estado: "En espera",
        cantidad_fases: 3,
    },
];

export default function TableAreas() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={getData} />
    </div>
  )
}