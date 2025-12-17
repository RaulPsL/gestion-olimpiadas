import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import { columns } from "@/components/tables/ColumnsOlimpista";
import React from "react";
import { getOlimpistasByAreas } from "@/api/Olimpistas";
import { useAuth } from "@/hooks/use-context";

const defaultAreas = [
    {
        nombre: '',
        olimpistas: [],
    }
];

export default function PageVerOlimpistas() {
    const [olimpistas, setOlimpistas] = React.useState<any>([]);
    const { data } = useAuth();
    const areas = data?.areas.map((area) => area?.nombre);
    const areasSigla = data?.areas.map((area) => area?.sigla);

    React.useEffect(() => {
        const staticData = async () => {
            const staticOlimpistas = await getOlimpistasByAreas(areasSigla as string[]);
            setOlimpistas(staticOlimpistas);
        }
        if (areasSigla && areasSigla.length > 0) {
            staticData();
        }
    }, [data]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Visualizar olimpistas</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        {
                            areas && areas?.length > 0 ? (
                                <Tabs defaultValue={areas?.[0].toLocaleLowerCase()}>
                                    <TabsList>
                                        {areas?.map((area) => (
                                            <TabsTrigger
                                                value={area.toLocaleLowerCase()}
                                                key={area.toLocaleLowerCase()}
                                                id={area.toLocaleLowerCase()}
                                            >
                                                {area}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {
                                        areas?.map((area) => (
                                            <TabsContent
                                                value={area.toLocaleLowerCase()}
                                                key={area.toLocaleLowerCase()}
                                                id={area.toLocaleLowerCase()}
                                            >
                                                <Card className="w-full max-w-7xl mx-auto">
                                                    <CardContent className="w-full max-w-7xl mx-auto">
                                                        <DataTable
                                                            columns={columns}
                                                            data={olimpistas?.[area]?.olimpistas !== undefined ? olimpistas[area]?.olimpistas : []}
                                                            filter={true}
                                                            fieldSearch="nombre"
                                                            nivelesFilter={olimpistas?.[area]?.niveles !== undefined ? olimpistas[area]?.niveles : []}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        ))
                                    }
                                </Tabs>
                            ) : (
                                <Tabs defaultValue={defaultAreas?.[0].nombre.toLocaleLowerCase()}>
                                    <TabsList>
                                        {defaultAreas?.map((area) => (
                                            <TabsTrigger
                                                value={area.nombre.toLocaleLowerCase()}
                                                key={area.nombre.toLocaleLowerCase()}
                                                id={area.nombre.toLocaleLowerCase()}
                                            >
                                                {area.nombre}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {
                                        defaultAreas?.map((area) => (
                                            <TabsContent
                                                value={area.nombre.toLocaleLowerCase()}
                                                key={area.nombre.toLocaleLowerCase()}
                                                id={area.nombre.toLocaleLowerCase()}
                                            >
                                                <Card>
                                                    <CardContent>
                                                        <DataTable
                                                            columns={columns}
                                                            data={area.olimpistas}
                                                            fieldSearch="nombre"
                                                            filter={true}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        ))
                                    }
                                </Tabs>
                            )
                        }
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}