import React from "react";

export const useFilterGrades = (
    areasFiltradas: any[],
    setGrados: React.Dispatch<React.SetStateAction<any[]>>
) => {
    React.useEffect(() => {
        console.log('Areas filtradas: ', areasFiltradas);
        if (areasFiltradas.length > 0) {
            const gradosActuales = areasFiltradas.flatMap((area) => area.grados);
            const gradosFiltrados = gradosActuales.filter((grado, index, self) =>
                index === self.findIndex((g) => g.value === grado.value)
            );
            setGrados(gradosFiltrados);
        }
    }, [areasFiltradas]);
}