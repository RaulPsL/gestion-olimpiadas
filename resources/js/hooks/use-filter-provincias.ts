import React from "react";

export const useFilterProvincias = (
    departamentoField: any,
    anterioresProvincias: any[],
    setProvincias: React.Dispatch<React.SetStateAction<any[]>>
) => {
    React.useEffect(() => {
        console.log('Departamento seleccionado: ', departamentoField);
        if (departamentoField.value.length > 0) {
            const provinciasFiltradas = anterioresProvincias?.filter((prov) => prov.departamento_id === departamentoField.value[0]);
            setProvincias(provinciasFiltradas);
        }
    }, [departamentoField.value]);
}