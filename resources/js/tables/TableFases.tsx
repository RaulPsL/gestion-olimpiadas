import { Fase, columns } from "@/components/tables/ColumnsFase";
import { DataTable } from "@/components/tables/DataTable";

const getData: Fase[] = [
    {
        name: "Eliminatoria",
        area: "Biologia",
        cantidad_participantes: 26,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: "En curso",
    },
    {
        name: "Clasificatoria",
        area: "Biologia",
        cantidad_participantes: 26,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: "En curso",
    },
    {
        name: "Final",
        area: "Biologia",
        cantidad_participantes: 26,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: "En espera",
    },
    {
        name: "Eliminatoria",
        area: "Fisica",
        cantidad_participantes: 26,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: "En curso",
    },
    {
        name: "Clasificatoria",
        area: "Fisica",
        cantidad_participantes: 26,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: "En curso",
    },
    {
        name: "Final",
        area: "Fisica",
        cantidad_participantes: 26,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: "En espera",
    },
];

export default function TableFases() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={getData} />
    </div>
  )
}