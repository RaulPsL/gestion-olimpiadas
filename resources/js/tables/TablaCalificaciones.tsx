import { createColumnsCalificaciones } from "@/components/tables/ColumnsCalificaciones";
import { DataTableCalificaciones } from "@/components/tables/DataTableCalificaciones";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormNotas } from "@/components/tables/ColumnsCalificaciones";

export default function TableCalificaciones({ calificaciones } : {calificaciones: any[]}) {

  const {
      register,
      control,
      handleSubmit,
      reset,
    } = useForm({
      defaultValues: {
        notas: calificaciones,
      },
    });
  
  const { fields } = useFieldArray({
    control,
    name: "notas",
  });

  const [nuevaLista, setNuevaLista] = React.useState<any[]>(
    calificaciones.map(item => ({ ...item, edicion: false }))
  );

  const handleToggleEdicion = (edicion: boolean) => {
    setNuevaLista(prevData => 
      prevData.map(item => ({
        ...item,
        edicion
      }))
    );
  }

  const columns = createColumnsCalificaciones(register);
  return (
    <Card>
      <CardContent>
        <DataTableCalificaciones
          columns={columns}
          data={nuevaLista}
          handleSubmit={handleSubmit}
          reset={reset}
          handleToggleEdicion={handleToggleEdicion}
        />
      </CardContent>
    </Card>
  )
}