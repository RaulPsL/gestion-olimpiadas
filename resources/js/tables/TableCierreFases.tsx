import { updateCierreFases } from "@/api/Fases";
import { createColumnsCierres } from "@/components/tables/ColumnsCierre";

import { DataTableCierrresFases } from "@/components/tables/DataTableCierreFases";
import { Card, CardContent } from "@/components/ui/card";
import { FormCierreFase, FormGetupFase } from "@/forms/interfaces/CierreFaseForm";
import { useAuth, UserData } from "@/hooks/use-context";

import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";

export default function TablecierreFases(
  {
    cierres,
    setUpdate,
  } : {
    cierres: any[],
    setUpdate: Dispatch<React.SetStateAction<boolean>>,
  }
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [fechaFin, setFechaFin] = React.useState<Date>(new Date());

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
  const rol = data?.rol.sigla;
  const handleConfirmSave = () => {
    setIsLoading(true);
    handleSubmit((data) => updateCierreFases(
        data,
        rol as string,
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

  const columns = createColumnsCierres(register, setValue, setDialogOpen, data as UserData, setFechaFin);

  const [nuevaLista, setNuevaLista] = React.useState<any[]>(
    cierres.map(item => ({ ...item, edicion: false }))
  );

  React.useEffect(() => {
      if (cierres) {
        // Actualizar la lista con edicion: false
        const listaActualizada = cierres.map(item => ({ 
          ...item,
        }));
        setNuevaLista(listaActualizada);
      }
    }, [cierres, reset]);

  return (
    <Card>
      <CardContent>
        <DataTableCierrresFases
          columns={columns}
          user={data as UserData}
          otherData={nuevaLista}
          fechaFin={fechaFin}
          setUpdate={setUpdate}
          handleSubmit={handleConfirmSave}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiError={apiError}
          setApiError={setApiError}
          success={success}
          setSuccess={setSuccess}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setValue={setValue}
        />
      </CardContent>
    </Card>
  )
}