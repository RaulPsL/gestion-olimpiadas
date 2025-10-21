import { updateCalificacionesOlimpistas } from "@/api/Calificaciones";
import { createColumnsCalificaciones } from "@/components/tables/ColumnsCalificaciones";
import { DataTableCalificaciones } from "@/components/tables/DataTableCalificaciones";
import { Card, CardContent } from "@/components/ui/card";
import { FormNotas } from "@/forms/interfaces/Notas";
import React from "react";
import { useForm } from "react-hook-form";

export default function TableCalificaciones(
  { calificaciones } : {
    calificaciones: {
      fecha_calificacion: string,
      fecha_fin: string,
      calificaciones: any[]
    }
  }
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const initialFormData: FormNotas = {
    notas: calificaciones.calificaciones.map(item => ({
      nota_olimpista_id: item.nota_olimpista_id,
      nota_fase_id: item.nota_fase_id,
      estado_olimpista: item.estado,
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
    calificaciones.calificaciones.map(item => ({ ...item, edicion: false }))
  );

  const handleToggleEdicion = (edicion: boolean) => {
    setNuevaLista(prevData => 
      prevData.map(item => ({
        ...item,
        edicion
      }))
    );
  }

  const columns = createColumnsCalificaciones(register, new Date(calificaciones.fecha_calificacion));
  return (
    <Card>
      <CardContent>
        <DataTableCalificaciones
          columns={columns}
          data={nuevaLista}
          fechaCalificacion={calificaciones.fecha_calificacion}
          fechaFin={calificaciones.fecha_fin}
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