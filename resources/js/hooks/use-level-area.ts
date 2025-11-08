import React from "react";

export const useLevelByArea = (
    areaField: any,
    gradoField: any,
    areas: any[],
    grados: any[],
    setNivelesMap: React.Dispatch<React.SetStateAction<Record<string, any[]>>>,
    niveles: any[],
) => {
    React.useEffect(() => {
        if (areaField.value.length > 0 && areas && gradoField.value.length > 0) {
            const gradoSeleccionado = gradoField.value[0];
            const nuevosNivelesMap: Record<string, any[]> = {};
            const gradoObj = grados?.find((g) => g.value === gradoSeleccionado);
            const gradoLabel = gradoObj?.label;

            areaField.value.forEach((areaValue: string | number) => {
                const area = areas.find((a) => a.value === areaValue);

                if (area && area.niveles) {
                    const nivelesFiltrados = area.niveles.filter((nivel: any) => {
                        return nivel.grado === gradoLabel;
                    });

                    nuevosNivelesMap[areaValue] = nivelesFiltrados;
                }
            });

            setNivelesMap(nuevosNivelesMap);

            if (areaField.value.length >= 1) {
                const nivelesArea1 = nuevosNivelesMap[areaField.value[0]];
                if (nivelesArea1 && nivelesArea1.length === 1) {
                    niveles[0].onChange([nivelesArea1[0].value]);
                } else if (nivelesArea1 && nivelesArea1.length === 0) {
                    niveles[0].reset();
                } else if (nivelesArea1 && nivelesArea1.length > 1 && niveles[0].value.length === 0) {
                    niveles[0].reset();
                }
            }

            if (areaField.value.length >= 2) {
                const nivelesArea2 = nuevosNivelesMap[areaField.value[1]];
                if (nivelesArea2 && nivelesArea2.length === 1) {
                    niveles[1].onChange([nivelesArea2[0].value]);
                } else if (nivelesArea2 && nivelesArea2.length === 0) {
                    niveles[1].reset();
                } else if (nivelesArea2 && nivelesArea2.length > 1 && niveles[1].value.length === 0) {
                    niveles[1].reset();
                }
            }

            if (areaField.value.length >= 3) {
                const nivelesArea3 = nuevosNivelesMap[areaField.value[2]];
                if (nivelesArea3 && nivelesArea3.length === 1) {
                    niveles[2].onChange([nivelesArea3[0].value]);
                } else if (nivelesArea3 && nivelesArea3.length === 0) {
                    niveles[2].reset();
                } else if (nivelesArea3 && nivelesArea3.length > 1 && niveles[2].value.length === 0) {
                    niveles[2].reset();
                }
            }
        } else {
            setNivelesMap({});
            niveles.map((nivel) => nivel.reset());
        }
    }, [areaField.value, areas, gradoField.value, grados]);
}