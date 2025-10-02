import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getClasificacionesByArea } from "@/api/Clasificacciones";
import { columns } from "@/components/tables/ColumnsClasificaciones";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";

export default function PageClasificaciones() {
    const [clasificaciones, setClasificaciones] = React.useState<any>();
    const [keys, setKeys] = React.useState<string[]>();

    React.useEffect(() => {
        const staticData = async () => {
            const response = await getClasificacionesByArea();
                setClasificaciones(response);
            };
            console.log('clasificaciones: ', clasificaciones);
        staticData();
    }, []);

    React.useEffect(() => {
        if (clasificaciones) {
            setKeys(Object.keys(clasificaciones));
        }
        console.log('Keys: ', keys);
    }, [clasificaciones]);
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header role={true} home/>
                <div className="container mx-auto px-4">
                    <div id="headerTablaClasificaciones" className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Clasificaciones por area</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        { (keys && keys.length > 0) && (
                            <Tabs defaultValue={ String(keys?.[0]).toLocaleLowerCase() }>
                                <TabsList>
                                    { keys?.map((key) => (
                                        <TabsTrigger value={String(key).toLocaleLowerCase()} key={key}>{key}</TabsTrigger>
                                    ))}
                                </TabsList>
                                { keys?.map((key) => (
                                    <TabsContent value={String(key).toLocaleLowerCase()} key={key}>
                                        <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                            <Card>
                                                {
                                                    Object.keys(clasificaciones?.[key]).map((estadoOlimpista) => (
                                                        <div key={estadoOlimpista}>
                                                            <Label className="text-2xl">Olimpistas {estadoOlimpista}s</Label>
                                                            <CardContent>
                                                                <DataTable columns={columns} data={clasificaciones?.[key]?.[estadoOlimpista]} />
                                                            </CardContent>
                                                        </div>
                                                    ))
                                                }
                                            </Card>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}