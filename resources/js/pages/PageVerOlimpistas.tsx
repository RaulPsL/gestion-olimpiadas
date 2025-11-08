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
import { getOlimpistasByAreas } from "@/api/Olimpistas";
import { useAuth } from "@/hooks/use-context";

export default function PageVerOlimpistas() {
    const [olimpistas, setOlimpistas] = React.useState<any>();
    const { data } = useAuth();
    const areas = data?.areas.map((area) => area?.nombre);
    const areasSigla = data?.areas.map((area) => area?.sigla);

    React.useEffect(() => {
        const staticData = async () => {
            const staticOlimpistas = await getOlimpistasByAreas(areasSigla as string[]);
            setOlimpistas(staticOlimpistas);
        }
        staticData();
        console.log(data)
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
                        <Tabs defaultValue={ areas?.[0].toLocaleLowerCase() }>
                            <TabsList>
                                { areas?.map((area) => (
                                    <TabsTrigger
                                        value={ area.toLocaleLowerCase() }
                                        key={ area.toLocaleLowerCase() }
                                        id={ area.toLocaleLowerCase() }
                                    >
                                        {area}
                                    </TabsTrigger>
                                )) }
                            </TabsList>
                            {
                                areas?.map((area) => (
                                    <TabsContent 
                                        value={ area.toLocaleLowerCase() }
                                        key={ area.toLocaleLowerCase() }
                                        id={ area.toLocaleLowerCase() }
                                    >
                                        <Card>
                                            <CardContent>
                                                <DataTable
                                                    columns={columns}
                                                    data={olimpistas?.[area] !== undefined ? olimpistas[area] : []}
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