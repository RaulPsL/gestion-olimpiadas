import { columns } from "@/components/tables/ColumnsCalificaciones";
import { DataTable } from "@/components/tables/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function TableCalificaciones({ calificaciones } : {calificaciones: any[]}) {
  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} data={calificaciones} />
      </CardContent>
    </Card>
  )
}