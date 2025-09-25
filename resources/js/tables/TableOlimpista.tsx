import { getOlimpistas } from "@/api/Olimpistas";
import { Olimpista, columns } from "@/components/tables/ColumnsOlimpista";
import { DataTable } from "@/components/tables/DataTable";
import React from "react";

export default function TableOlimpistas() {
  const [olimpistas, setOlimpistas] = React.useState<any[]>([]);
  React.useEffect(() => {
    const staticData = async () => {
      const staticData = await getOlimpistas();
      setOlimpistas(staticData.olimpistas);
    };
    staticData();
  }, [])
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={olimpistas} />
    </div>
  )
}