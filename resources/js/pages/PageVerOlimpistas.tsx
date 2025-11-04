import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import { columns } from "@/components/tables/ColumnsOlimpista";
import React from "react";
import { getOlimpistas, getOlimpistasByAreas } from "@/api/Olimpistas";
import { useAuth } from "@/hooks/use-context";

export default function PageVerOlimpistas() {
    const [olimpistas, setOlimpistas] = React.useState<any[]>([]);
    const { data } = useAuth();
    React.useEffect(() => {
        const areas = data?.areas.map((area) => area?.sigla);
        const staticData = data ? 
            async () => {
                const staticOlimpistas = await getOlimpistasByAreas(areas as string[]);
                setOlimpistas(staticOlimpistas);
            }
            :
            async () => {
                const staticOlimpistas = await getOlimpistas();
                setOlimpistas(staticOlimpistas);
            };
        staticData();
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
                        <Tabs defaultValue={data?.areas[0].nombre}>
                            <TabsList>
                                { data?.areas.map((area) => (
                                    <TabsTrigger
                                        value={area.nombre}
                                        key={area.nombre}
                                        id={area.nombre}
                                    >
                                        {area.nombre}
                                    </TabsTrigger>
                                )) }
                            </TabsList>
                            {
                                data?.areas.map((area) => (
                                    <TabsContent 
                                        value={area.nombre}
                                        key={area.nombre}
                                        id={area.nombre}
                                    >
                                        <Card>
                                            <CardContent>
                                                <DataTable
                                                    columns={columns}
                                                    data={olimpistas[area.nombre] !== undefined ? olimpistas[area.nombre] : []}
                                                    fieldSearch="nombre"
                                                />
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                ))
                            }
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}