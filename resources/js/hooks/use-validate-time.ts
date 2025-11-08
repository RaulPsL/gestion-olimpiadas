import React from "react";

export const useVerifiedTimeByFase = (
    areaField: any,
    areas: any[],
) => {
    React.useEffect(() => {
        if (areaField.value.length > 1) {
            const ultimaArea = areaField.value.pop() as string;
            const horariosUltimaArea = areas?.find((area) => area.value === ultimaArea).horario_fases;
            const areasHorarios = areaField.value.flatMap((area: any) => areas?.filter((a) => a.value === area));
            const horariosAnteriores = areasHorarios.flatMap((h: any) => h.horario_fases);
            const horarioIgual = horariosAnteriores.some((h: any) =>
                horariosUltimaArea.some(
                    (hu: any) => hu.inicio === h.inicio && hu.fin === h.fin
                ));
            if (!horarioIgual) {
                areaField.value.push(ultimaArea);
            }
        }
    }, [areaField.value]);
}