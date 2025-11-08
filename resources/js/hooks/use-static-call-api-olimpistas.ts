import { getStaticData } from "@/api/Olimpistas";
import React from "react";

export const useGetStaticDataOlimpistas = (
    setAreas: React.Dispatch<React.SetStateAction<any[]>> | null,
    setDepartamentos: React.Dispatch<React.SetStateAction<any[]>>,
    setAnterioresProvincias: React.Dispatch<React.SetStateAction<any[]>>,
    setProvincias: React.Dispatch<React.SetStateAction<any[]>>,
) => {
    React.useEffect(() => {
        const fetchStaticData = async () => {
            const staticData = await getStaticData();
            if (setAreas !== null) setAreas(staticData.areas);
            setDepartamentos(staticData.departamentos);
            setAnterioresProvincias(staticData.provincias);
            setProvincias(staticData.provincias);
        };
        fetchStaticData();
    }, []);
}