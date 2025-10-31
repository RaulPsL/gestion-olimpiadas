import React, { Dispatch } from "react";
import { getReport, getStatistics } from "@/api/Olimpistas";
import { generarListaPDF } from "@/pdfs/ListUsersPDF";
import { generarExcel, generarExcelMultiplesHojas } from "@/pdfs/ListUsersXLS";
import { IconTrendingDown, IconTrendingUp, IconUserMinus, IconUserOff, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { TrendingUpDown } from "lucide-react";

export default function useStaticData ({data, setData}:{data?: any, setData: Dispatch<React.SetStateAction<any>>}) {
    const [usuarios, setUsuarios] = React.useState<any>({});
    const [olimpistas, setOlimpistas] = React.useState<any>({});
    const [statistics, setStatistics] = React.useState<any>(null);
    const [totalOlimpistas, setTotalOlimpistas] = React.useState<number>(0);
    const [totalUsuarios, setTotalUsuarios] = React.useState<number>(0);
    const [encargados, setEncargados] = React.useState<number>(0);
    const [evaluadores, setEvaluadores] = React.useState<number>(0);
    const [datos, setDatos] = React.useState<any[]>([]);
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
                }
                const [statistics, reports] = await Promise.all(
                    requests
                );

                setUsuarios(reports?.usuarios || []);
                setOlimpistas(reports?.olimpistas || []);
                setStatistics(statistics);

                if (statistics) {
                    const total = statistics.totalOlimpistas || 1;

                    setClasificados((statistics.clasificados || 0) / total * 100);
                    setNoClasificados((statistics['no clasificados'] || 0) / total * 100);
                    setDesclasificados((statistics.desclasificados || 0) / total * 100);
                    setTotalOlimpistas(statistics.totalOlimpistas || 0);
                    setTotalUsuarios(statistics.totalUsuarios || 0);
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
                        content: totalOlimpistas,
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
                            title: "Generar en XLS",
                            action: () => generarExcelMultiplesHojas(olimpistas, 'olimpistas'),
                        }
                    ] : <Link to='/clasificaciones/area' className="text-white">Ver las clasificaciones</Link>,
                },
                {
                    title: 'Concursantes clasificados',
                    descripction: statistics?.clasificados,
                    badge: {
                        icon: IconUserPlus,
                        content: `+${clasificados}%`,
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
                                usuarios: olimpistas.clasificados,
                                tipoPdf: 'clasificados',
                                olimpistas: true
                            }),
                        },
                        {
                            title: "Generar en XLS",
                            action: () => generarExcel(olimpistas.clasificados, 'clasificados'),
                        }
                    ] : <Link to='/clasificaciones/area' className="text-white">Ver las clasificaciones</Link>,
                },
                {
                    title: 'Concursantes no clasificados',
                    descripction: statistics?.['no clasificados'],
                    badge: {
                        icon: IconUserMinus,
                        content: `-${noclasificados}%`,
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
                                usuarios: olimpistas['no clasificados'],
                                tipoPdf: 'olimpistas',
                                olimpistas: true
                            }),
                        },
                        {
                            title: "Generar en XLS",
                            action: () => generarExcel(olimpistas['no clasificados'], 'no_clasificados'),
                        }
                    ] : <Link to='/clasificaciones/area' className="text-white">Ver las clasificaciones</Link>,
                },
                {
                    title: 'Concursantes desclasificados',
                    descripction: statistics?.desclasificados,
                    badge: {
                        icon: IconUserOff,
                        content: `-${desclasificados}%`,
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
                                usuarios: olimpistas.desclasificados,
                                tipoPdf: 'desclasificados',
                                olimpistas: true
                            }),
                        },
                        {
                            title: "Generar en XLS",
                            action: () => generarExcel(olimpistas.desclasificados, 'desclasificados'),
                        }
                    ] : <Link to='/clasificaciones/area' className="text-white">Ver las clasificaciones</Link>,
                },
            ]

            const datosUsuarios = [
                {
                    title: 'Usuarios',
                    descripction: totalUsuarios,
                    badge: {
                        icon: IconUsers,
                        content: totalUsuarios,
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
                            title: "Generar en XLS",
                            action: () => generarExcelMultiplesHojas(usuarios, 'usuarios'),
                        }
                    ]
                },
                {
                    title: 'Evaluadores',
                    descripction: evaluadores,
                    badge: {
                        icon: IconUsers,
                        content: evaluadores,
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
                            title: "Generar en XLS",
                            action: () => generarExcel(usuarios.evaluadores, 'evaluadores'),
                        }
                    ]
                },
                {
                    title: 'Encargados de area',
                    descripction: encargados,
                    badge: {
                        icon: IconUsers,
                        content: encargados,
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
                            title: "Generar en XLS",
                            action: () => generarExcel(usuarios.encargados, 'encargados'),
                        }
                    ]
                },
            ];
            if (data !== undefined && data !== null) nuevosDatos = nuevosDatos.concat(datosUsuarios);
            if (setData) 
                setData(nuevosDatos);
        }
    }, [statistics]);
}