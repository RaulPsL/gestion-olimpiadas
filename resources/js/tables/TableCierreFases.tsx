import { updateCierreFases } from "@/api/Fases";
import { createColumnsCierres } from "@/components/tables/ColumnsCierre";

import { DataTableCierrresFases } from "@/components/tables/DataTableCierreFases";
import { Card, CardContent } from "@/components/ui/card";
import { FormCierreFase } from "@/forms/interfaces/CierreFaseForm";
import { useAuth } from "@/hooks/use-context";

import React from "react";
import { useForm } from "react-hook-form";

export default function TablecierreFases(
  { cierres } : { cierres: any[]}
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const initialFormData: FormCierreFase = {
    cierres: cierres?.map(item => ({
      usuario_encargado_id: item.usuario_encargado_id ?? null,
      usuario_evaluador_id: item.usuario_evaluador_id ?? null,
      fase_id: item.fase_id,
    }))
  };

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormCierreFase>({
    defaultValues: initialFormData
  });

  const [nuevaLista, setNuevaLista] = React.useState<any[]>(
    cierres.map(item => ({ ...item, edicion: false }))
  );

  const { data } = useAuth();

  const handleToggleEdicion = (edicion: boolean) => {
    setNuevaLista(prevData => 
      prevData.map(item => ({
        ...item,
        edicion
      }))
    );
  }

  const columns = createColumnsCierres(register, data);
  return (
    <Card>
      <CardContent>
        <DataTableCierrresFases
          columns={columns}
          data={nuevaLista}
          handleSubmit={
            handleSubmit((data) => updateCierreFases(
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