interface StaticDataOlimpistas {
    areas: any[];
    grados: any[];
    niveles: any[];
    departamentos: any[];
}

interface StaticDataUsuarios extends StaticDataOlimpistas {
    areas: any[];
    roles: any[];
}

interface StaticDataAreas {
    areas: any[];
    fases: any[];
    evaluadores: any[];
}