import React from "react";
import { UserData } from "./use-context";

export const useFilterAreasUser = (
    areas: any[],
    data: UserData,
    areasFiltradas: any[],
    setAreasFiltradas: React.Dispatch<React.SetStateAction<any[]>>
) => {
    React.useEffect(() => {
        if (areas && areas.length > 0 && data?.areas && areasFiltradas.length === 0) {
            const areasUsuario = data.areas.map((area) => area.sigla);
            const areasFiltradasActuales = areas.filter((area) => areasUsuario.includes(area.value));
            setAreasFiltradas(areasFiltradasActuales);
        }
    }, [areas, data]);
}