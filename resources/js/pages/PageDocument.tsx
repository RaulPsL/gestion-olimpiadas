import { BookCopy, TrendingUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SectionAccountingOlimpistas } from "@/components/SectionAccoutingOlimpistas";
import React from "react";
import { getReport, getStatistics } from "@/api/Olimpistas";
import { useAuth } from "@/hooks/use-context";
import { generarListaPDF } from "@/pdfs/ListUsersPDF";
import { generarExcel, generarExcelMultiplesHojas } from "@/pdfs/ListUsersXLS";
import { IconTrendingDown, IconTrendingUp, IconUserMinus, IconUserOff, IconUserPlus, IconUsers } from "@tabler/icons-react";

export default function PageGenerarDocs() {
    const { data } = useAuth();
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
                const [statistics, reports] = await Promise.all([
                    getStatistics(),
                    getReport()
                ]);

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
            const nuevosDatos = [
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
                    options: [
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
                    ],
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
                    options: [
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
                    ],
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
                    options: [
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
                    ],
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
                    options: [
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
                    ],
                },
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
                    ],
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
                    ],
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
                    ],
                },
            ]
            setDatos(nuevosDatos);
        }
    }, [statistics]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookCopy />
                        <Label className="text-2xl">Generar documentos</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <SectionAccountingOlimpistas staticData={datos} />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}