import { updateCalificaciones } from "@/api/Calificaciones";
import { createColumnsCalificacionesGrupo } from "@/components/tables/ColumnsCalificacionesGrupo";
import { DataTableCalificaciones } from "@/components/tables/DataTableCalificaciones";
import { Card, CardContent } from "@/components/ui/card";
import { FormNotas } from "@/forms/interfaces/Notas";
import { FormNotasGrupo } from "@/forms/interfaces/NotasGrupos";
import { useAuth } from "@/hooks/use-context";
import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";

export default function TableCalificacionesGrupo(
  { calificaciones, setUpdate } : {
    calificaciones: {
      fecha_calificacion: string,
      fecha_fin: string,
      avalado: boolean,
      niveles: string[],
      calificaciones: any[],
    },
    setUpdate: Dispatch<React.SetStateAction<boolean>>
  }
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const { data } = useAuth();
  const ci = data?.data.ci;
  const initialFormData: FormNotasGrupo = {
    type: 'grupos',
    notas: calificaciones.calificaciones.map(item => ({
      nota_grupo_id: item.nota_grupo_id,
      nota_fase_id: item.nota_fase_id,
      nota: item.nota,
      comentarios: item.comentarios
    }))
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormNotasGrupo>({
    defaultValues: initialFormData
  });

  const [nuevaLista, setNuevaLista] = React.useState<any[]>(
    calificaciones.calificaciones.map(item => ({ ...item, edicion: false }))
  );

  React.useEffect(() => {
    if (calificaciones?.calificaciones) {
      // Actualizar la lista con edicion: false
      const listaActualizada = calificaciones.calificaciones.map(item => ({ 
        ...item, 
        edicion: false 
      }));
      setNuevaLista(listaActualizada);

      // Resetear el formulario con los nuevos valores
      const formData: FormNotasGrupo = {
        type: 'grupos',
        notas: calificaciones.calificaciones.map(item => ({
          nota_grupo_id: item.nota_olimpista_id,
          nota_fase_id: item.nota_fase_id,
          nota: item.nota,
          comentarios: item.comentarios
        }))
      };
      reset(formData);
    }
  }, [calificaciones, reset]);

  const handleToggleEdicion = (edicion: boolean) => {
    setNuevaLista(prevData => 
      prevData.map(item => ({
        ...item,
        edicion
      }))
    );
  }

  const columns = createColumnsCalificacionesGrupo(register, setValue, new Date(calificaciones.fecha_calificacion));
  return (
    <Card>
      <CardContent>
        <DataTableCalificaciones
          columns={columns}
          data={nuevaLista}
          filter={calificaciones.niveles}
          fechaCalificacion={calificaciones.fecha_calificacion}
          fechaFin={calificaciones.fecha_fin}
          avalado={calificaciones.avalado}
          setUpdate={setUpdate}
          handleSubmit={
            handleSubmit((data) => updateCalificaciones(
                data,
                ci,
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