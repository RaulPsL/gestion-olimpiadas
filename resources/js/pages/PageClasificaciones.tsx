import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getClasificacionesByArea, getClasificacionesGrupoByArea } from "@/api/Clasificacciones";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import { columnsGrupo } from "@/components/tables/ColumnsClasificacionesGrupo";
import { columns } from "@/components/tables/ColumnsClasificaciones";

export default function PageClasificaciones({ esGrupo }: { esGrupo: boolean }) {
    const [clasificaciones, setClasificaciones] = React.useState<any>();
    const [keys, setKeys] = React.useState<string[]>();
    const columnsClasificaciones = esGrupo ? columnsGrupo : columns;

    React.useEffect(() => {
        const staticData = async () => {
            const response = esGrupo ? await getClasificacionesGrupoByArea() : await getClasificacionesByArea();
            setClasificaciones(response);
        };
        staticData();
    }, []);

    React.useEffect(() => {
        if (clasificaciones) {
            setKeys(Object.keys(clasificaciones));
        }
        console.log('Keys: ', keys);
        console.log('Datos: ', clasificaciones);
    }, [clasificaciones]);

    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div id="headerTablaClasificaciones" className="w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Clasificaciones por area</Label>
                    </div>
                    <div className="w-full flex-col gap-6">
                        {(keys && keys.length > 0) && (
                            <Tabs defaultValue={String(keys?.[0]).toLocaleLowerCase()}>
                                <TabsList>
                                    {keys?.map((key) => (
                                        <TabsTrigger value={String(key).toLocaleLowerCase()} key={key}>{key}</TabsTrigger>
                                    ))}
                                </TabsList>
                                {keys?.map((key) => (
                                    <TabsContent value={String(key).toLocaleLowerCase()} key={key}>
                                        <Card className="w-full gap-6 p-4 justify-center">
                                            {
                                                Object.keys(clasificaciones?.[key]).map((estadoOlimpista) => (
                                                    <div key={estadoOlimpista}>
                                                        <Label className="text-2xl">Olimpistas {estadoOlimpista}s</Label>
                                                        <CardContent className="w-full">
                                                            <DataTable
                                                                columns={columnsClasificaciones}
                                                                data={clasificaciones?.[key]?.[estadoOlimpista]}
                                                                fieldSearch="nombre"
                                                            />
                                                        </CardContent>
                                                    </div>
                                                ))
                                            }
                                        </Card>
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