import React from "react";

export const useFreeAreas = (
    areasFiltradas: any[],
    gradoField: any,
    setAreas: React.Dispatch<React.SetStateAction<any[]>>,
    areaField: any
) => {
    React.useEffect(() => {
        if (gradoField.value.length > 0 && areasFiltradas.length > 0) {
            const gradoSeleccionado = gradoField.value[0];
            const areasDisponibles = areasFiltradas.filter((area) =>
                area.grados.some((grado: any) => grado.value === gradoSeleccionado)
            );
            setAreas(areasDisponibles);
            const valoresValidos = areaField.value.filter((areaVal: string | number) =>
                areasDisponibles.some(a => a.value === areaVal)
            );
            if (valoresValidos.length !== areaField.value.length) {
                areaField.onChange(valoresValidos);
            }
        } else if (gradoField.value.length === 0) {
            setAreas(areasFiltradas);
        }
    }, [gradoField.value, areasFiltradas]);
}