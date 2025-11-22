import { UserData } from "@/hooks/use-context";
import { Combobox } from "./Combobox";
import React from "react";
import { useFilterAreasUser } from "@/hooks/use-areas-user";

export function name({ userData, areas }: { userData: UserData, areas: any[] }) {
    const [areasFiltradas, setAreasFiltradas] = React.useState<any[]>([]);
    // Filtrar las areas segun las areas del usuario (SOLO UNA VEZ)
    useFilterAreasUser(areas, userData as UserData, areasFiltradas, setAreasFiltradas);
    return <Combobox

    />
} 