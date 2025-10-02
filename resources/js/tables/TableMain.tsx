import { DataTable } from "@/components/tables/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function TableMain(
    { datos, columns } : {datos: any[], columns: any[] }
) {
  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} data={datos} />
      </CardContent>
    </Card>
  )
}