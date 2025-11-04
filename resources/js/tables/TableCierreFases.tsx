import { updateCierreFases } from "@/api/Fases";
import { createColumnsCierres } from "@/components/tables/ColumnsCierre";

import { DataTableCierrresFases } from "@/components/tables/DataTableCierreFases";
import { Card, CardContent } from "@/components/ui/card";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";
import { useAuth } from "@/hooks/use-context";

import React from "react";
import { useForm } from "react-hook-form";

export default function TablecierreFases(
  { cierres } : { cierres: any[]}
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormCierreFase | FormGetupFase>({
    defaultValues: {
      usuario_encargado_id: 0,
      usuario_evaluador_id: 0,
      fase_id: 0,
    }
  });

  const { data } = useAuth();

  const handleConfirmSave = () => {
    setIsLoading(true);
    handleSubmit((data) => updateCierreFases(
        data,
        setIsLoading,
        setSuccess,
        setApiError,
        reset,
      )
    )()
    if (success) {
      setDialogOpen(true);
    }
  };

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const columns = createColumnsCierres(register, setValue, setDialogOpen, data);

  return (
    <Card>
      <CardContent>
        <DataTableCierrresFases
          columns={columns}
          data={cierres}
          handleSubmit={handleConfirmSave}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiError={apiError}
          setApiError={setApiError}
          success={success}
          setSuccess={setSuccess}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      </CardContent>
    </Card>
  )
}