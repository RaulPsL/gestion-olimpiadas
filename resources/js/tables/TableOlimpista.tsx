import { getOlimpistas } from "@/api/Olimpistas";
import { Olimpista, columns } from "@/components/tables/ColumnsOlimpista";
import { DataTable } from "@/components/tables/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function TableOlimpistas() {
  const [olimpistas, setOlimpistas] = React.useState<any[]>([]);
  React.useEffect(() => {
    const staticData = async () => {
      const staticData = await getOlimpistas();
      setOlimpistas(staticData);
    };
    staticData();
  }, [])
  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} data={olimpistas} />
      </CardContent>
    </Card>
  )
}