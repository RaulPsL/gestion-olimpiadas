import { updateCalificacionesOlimpistas } from "@/api/Calificaciones";
import { createColumnsCalificaciones, FormNotas } from "@/components/tables/ColumnsCalificaciones";
import { DataTableCalificaciones } from "@/components/tables/DataTableCalificaciones";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useForm } from "react-hook-form";

export default function TableCalificaciones({ calificaciones } : {calificaciones: any[]}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const initialFormData: FormNotas = {
    notas: calificaciones.map(item => ({
      nota_olimpista_id: item.nota_olimpista_id,
      nota_fase_id: item.nota_fase_id,
      estado_olimpista: item.estado === "activo",
      nota: item.nota,
      comentarios: item.comentarios
    }))
  };

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormNotas>({
    defaultValues: initialFormData
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
          handleSubmit={
            handleSubmit((data) => updateCalificacionesOlimpistas(
                data,
                setIsLoading,
                setSuccess,
                setApiError,
                reset,
              )
            )
          }
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiError={apiError}
          setApiError={setApiError}
          success={success}
          setSuccess={setSuccess}
          reset={reset}
          handleToggleEdicion={handleToggleEdicion}
        />
      </CardContent>
    </Card>
  )
}