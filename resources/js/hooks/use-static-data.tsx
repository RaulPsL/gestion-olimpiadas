import React, { Dispatch } from "react";
import { getReport, getStatistics } from "@/api/Olimpistas";
import { generarListaPDF } from "@/pdfs/ListUsersPDF";
import { generarExcel, generarExcelMultiplesHojas } from "@/pdfs/ListUsersXLS";
import { IconTrendingDown, IconTrendingUp, IconUserMinus, IconUserOff, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { TrendingUpDown } from "lucide-react";
import { getGanadores } from "@/api/Clasificacciones";

export default function useStaticData(
    {
        data,
        setData,
        setOpenDialog,
        setSelectedData
    } : {
        data?: any,
        setData: Dispatch<React.SetStateAction<any>>,
        setOpenDialog?: Dispatch<React.SetStateAction<boolean>>,
        setSelectedData?: Dispatch<React.SetStateAction<any>>
    }) {
    const [usuarios, setUsuarios] = React.useState<any>({});
    const [olimpistas, setOlimpistas] = React.useState<any>({});
    const [ganadoresOlimpistas, setGanadoresOlimpistas] = React.useState<any>({});
    const [ganadoresGrupos, setGanadoresGrupos] = React.useState<any>({});
    const [statistics, setStatistics] = React.useState<any>(null);
    const [totalOlimpistas, setTotalOlimpistas] = React.useState<number>(0);
    const [totalUsuarios, setTotalUsuarios] = React.useState<number>(0);
    const [encargados, setEncargados] = React.useState<number>(0);
    const [evaluadores, setEvaluadores] = React.useState<number>(0);
    const [clasificados, setClasificados] = React.useState<number>(0);
    const [noclasificados, setNoClasificados] = React.useState<number>(0);
    const [desclasificados, setDesclasificados] = React.useState<number>(0);

    React.useEffect(() => {
        const staticData = async () => {
            try {
                let requests = [
                    getStatistics(),
                ];
                if (data) {
                    requests.push(getReport());
                    requests.push(getGanadores());
                }
                const [statistics, reports, wins] = await Promise.all(
                    requests
                );

                setUsuarios(reports?.usuarios || []);
                setOlimpistas(reports?.olimpistas || []);
                setGanadoresOlimpistas(wins?.olimpistas || []);
                setGanadoresGrupos(wins?.grupos || []);
                setStatistics(statistics);

                if (statistics) {
                    const total = statistics.totalOlimpistas || 1;

                    setClasificados((statistics.clasificados || 0) / total * 100);
                    setNoClasificados((statistics['no clasificados'] || 0) / total * 100);
                    setDesclasificados((statistics.desclasificados || 0) / total * 100);
                    setTotalOlimpistas(statistics.totalOlimpistas || 0);
                    setTotalUsuarios((statistics.totalUsuarios - 1) || 0);
                    setEncargados(statistics.encargados || 0);
                    setEvaluadores(statistics.evaluadores || 0);
                }
            } catch (error) {
                console.error('Error cargando datos:', error);
            }
        };

        staticData();
    }, []);

    React.useEffect(() => {
        if (statistics !== undefined) {
            let nuevosDatos = [
                {
                    title: 'Total concursantes',
                    descripction: totalOlimpistas,
                    badge: {
                        icon: IconUsers,
                        content: Math.round(totalOlimpistas),
                    },
                    footer: {
                        description: 'Todos los concursantes que aun participan de todas las áreas.',
                        icon: TrendingUpDown,
                    },
                    options: data ?
                        [
                            {
                                title: "Generar en PDF",
                                action: () => generarListaPDF({
                                    usuarios: olimpistas,
                                    tipoPdf: 'olimpistas',
                                    olimpistas: true
                                }),
                            },
                            {
                                title: "Generar excel",
                                action: () => generarExcelMultiplesHojas(olimpistas, 'olimpistas'),
                            }
                        ] : <Link to='/clasificaciones/areas' className="text-white">Ver las clasificaciones</Link>,
                },
                {
                    title: 'Concursantes clasificados',
                    descripction: statistics?.clasificados,
                    badge: {
                        icon: IconUserPlus,
                        content: `+${Math.round(clasificados)}%`,
                    },
                    footer: {
                        description: 'Concursantes que pasaron a la siguiente fase en general.',
                        icon: IconTrendingUp,
                    },
                    options: data ?
                        [
                            {
                                title: "Generar en PDF",
                                action: () => generarListaPDF({
                                    usuarios: olimpistas.clasificado,
                                    tipoPdf: 'clasificados',
                                    olimpistas: true
                                }),
                            },
                            {
                                title: "Generar excel",
                                action: () => generarExcel(olimpistas.clasificado, 'clasificados'),
                            }
                        ] : <Link to='/clasificaciones/areas' className="text-white">Ver las clasificaciones</Link>,
                },
                {
                    title: 'Concursantes no clasificados',
                    descripction: statistics?.['no clasificados'],
                    badge: {
                        icon: IconUserMinus,
                        content: `-${Math.round(noclasificados)}%`,
                    },
                    footer: {
                        description: 'Concursantes que no pasaron a la siguiente fase en general.',
                        icon: IconTrendingDown,
                    },
                    options: data ?
                        [
                            {
                                title: "Generar en PDF",
                                action: () => generarListaPDF({
                                    usuarios: olimpistas['no clasificado'],
                                    tipoPdf: 'olimpistas',
                                    olimpistas: true
                                }),
                            },
                            {
                                title: "Generar excel",
                                action: () => generarExcel(olimpistas['no clasificado'], 'no_clasificados'),
                            }
                        ] : <Link to='/clasificaciones/areas' className="text-white">Ver las clasificaciones</Link>,
                },
                {
                    title: 'Concursantes desclasificados',
                    descripction: statistics?.desclasificados,
                    badge: {
                        icon: IconUserOff,
                        content: `-${Math.round(desclasificados)}%`,
                    },
                    footer: {
                        description: 'Concursantes que salieron de la competencia en general.',
                        icon: IconTrendingDown,
                    },
                    options: data ?
                        [
                            {
                                title: "Generar en PDF",
                                action: () => generarListaPDF({
                                    usuarios: olimpistas.desclasificado,
                                    tipoPdf: 'desclasificados',
                                    olimpistas: true
                                }),
                            },
                            {
                                title: "Generar excel",
                                action: () => generarExcel(olimpistas.desclasificado, 'desclasificados'),
                            }
                        ] : <Link to='/clasificaciones/areas' className="text-white">Ver las clasificaciones</Link>,
                },
            ]

            const datosUsuarios = [
                {
                    title: 'Usuarios',
                    descripction: totalUsuarios,
                    badge: {
                        icon: IconUsers,
                        content: Math.round(totalUsuarios),
                    },
                    footer: {
                        description: 'Todos los usuarios de todas las areas.',
                        icon: TrendingUpDown,
                    },
                    options: [
                        {
                            title: "Generar en PDF",
                            action: () => generarListaPDF({
                                usuarios: usuarios,
                                tipoPdf: 'usuarios',
                                olimpistas: false
                            }),
                        },
                        {
                            title: "Generar excel",
                            action: () => generarExcelMultiplesHojas(usuarios, 'usuarios'),
                        }
                    ]
                },
                {
                    title: 'Evaluadores',
                    descripction: evaluadores,
                    badge: {
                        icon: IconUsers,
                        content: Math.round(evaluadores),
                    },
                    footer: {
                        description: 'Todos los evaluadores de todas las áreas.',
                        icon: TrendingUpDown,
                    },
                    options: [
                        {
                            title: "Generar en PDF",
                            action: () => generarListaPDF({
                                usuarios: usuarios.evaluadores,
                                tipoPdf: 'evaluadores',
                                olimpistas: false
                            }),
                        },
                        {
                            title: "Generar excel",
                            action: () => generarExcel(usuarios.evaluadores, 'evaluadores'),
                        }
                    ]
                },
                {
                    title: 'Encargados de area',
                    descripction: encargados,
                    badge: {
                        icon: IconUsers,
                        content: Math.round(encargados),
                    },
                    footer: {
                        description: 'Todos los encargados de todas las áreas',
                        icon: TrendingUpDown,
                    },
                    options: [
                        {
                            title: "Generar en PDF",
                            action: () => generarListaPDF({
                                usuarios: usuarios.encargados,
                                tipoPdf: 'encargados',
                                olimpistas: false
                            }),
                        },
                        {
                            title: "Generar excel",
                            action: () => generarExcel(usuarios.encargados, 'encargados'),
                        }
                    ]
                },
            ];

            const datosOlimpistasGanadores = Object.keys(ganadoresOlimpistas).flatMap(
                (key) => ganadoresOlimpistas[key].map((g: any) => {
                    const ganadores = g.integrantes;
                    const totalGanadores = ganadores?.length || 0;
                    const area = String(g.area).toLowerCase();
                    return {
                        title: `Ganadores de ${area} nivel ${g?.nivel}`,
                        descripction: totalGanadores,
                        badge: {
                            icon: IconUsers,
                            content: Math.round(totalGanadores),
                        },
                        footer: {
                            description: `Consursantes que ganaron la competencia del área de ${area} nivel ${g.nivel}`,
                            icon: TrendingUpDown,
                        },
                        options: [
                            {
                                title: "Generar Certificados",
                                action: () => {
                                    if (setSelectedData) {
                                        setSelectedData(g);
                                    }
                                    if (setOpenDialog) {
                                        setOpenDialog(true);
                                    }
                                },
                            },
                            {
                                title: "Generar en PDF",
                                action: () => generarListaPDF({
                                    usuarios: ganadores,
                                    tipoPdf: `ganadores-${area}`,
                                    olimpistas: true
                                }),
                            },
                            {
                                title: "Generar excel",
                                action: () => generarExcel(ganadores, `ganadores-${area}`),
                            }
                        ]
                    };
                })
            );

            const datosGruposGanadores = Object.keys(ganadoresGrupos).flatMap(
                (key) => ganadoresGrupos[key].map((g: any) => {
                    const ganadores = g?.grupos;
                    const totalGanadores = ganadores?.length || 0;
                    const area = String(g.area).toLowerCase();
                    return {
                        title: `Ganadores de ${area} nivel ${g?.nivel}`,
                        descripction: totalGanadores,
                        badge: {
                            icon: IconUsers,
                            content: Math.round(totalGanadores),
                        },
                        footer: {
                            description: `Grupos que ganaron la competencia del área de ${area} nivel ${g.nivel}`,
                            icon: TrendingUpDown,
                        },
                        options: [
                            {
                                title: "Generar Certificados",
                                action: () => {
                                    if (setSelectedData) {
                                        setSelectedData(g);
                                    }
                                    if (setOpenDialog) {
                                        setOpenDialog(true);
                                    }
                                },
                            },
                            {
                                title: "Generar en PDF",
                                action: () => generarListaPDF({
                                    usuarios: ganadores,
                                    tipoPdf: `ganadores del área ${area}`,
                                    olimpistas: true
                                }),
                            },
                            {
                                title: "Generar excel",
                                action: () => generarExcelMultiplesHojas(ganadores?.integrantes, `ganadores-${area}`),
                            }
                        ]
                    };
                })
            );

            console.log('Datos de olimpistas', datosOlimpistasGanadores);
            console.log('Datos de grupos', datosGruposGanadores);
            if (data !== undefined && data !== null)
                nuevosDatos = nuevosDatos.concat(datosUsuarios, datosOlimpistasGanadores, datosGruposGanadores);
            if (setData)
                setData(nuevosDatos);
        }
        console.log(data);
    }, [statistics, data]);
}
