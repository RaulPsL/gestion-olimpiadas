import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import React from "react";
import { getLogsCalificaciones, getLogsCierreFases } from "@/api/Usuarios";
import { useAuth } from "@/hooks/use-context";
import { columnsLogCalificaciones, columnsLogCierreFases } from "@/components/tables/ColumnsLogs";

export default function PageVerAcciones() {
    const [calificacionesOAcciones, setCalificacionesOAcciones] = React.useState<any>();
    const { data } = useAuth();
    const otherKeys = data?.areas.map((area) => area?.nombre);

    React.useEffect(() => {
        const staticData = async () => {
            if (data?.rol.sigla === 'EDA') {
                const calificaciones = await getLogsCalificaciones(data.areas.map((area) => area?.nombre));
                setCalificacionesOAcciones(calificaciones);
            }
            if (data?.rol.sigla === 'ADM') {
                const cierres = await getLogsCierreFases();
                setCalificacionesOAcciones(cierres);
            }
        };
        staticData();
    }, []);

    React.useEffect(() => {
        console.log('Datos tabla: ', calificacionesOAcciones);
    }, [calificacionesOAcciones])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Acciones de los usuarios</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue={data?.rol.sigla === 'EDA' ? otherKeys?.[0] : 'acciones'}>
                            <TabsList>
                                {
                                    data?.rol.sigla === 'EDA' ?
                                        otherKeys?.map((key) => {
                                            return (<TabsTrigger value={key} key={key}>{key}</TabsTrigger>);
                                        }) :
                                        (<TabsTrigger value="acciones" key="acciones">Acciones</TabsTrigger>)
                                }
                            </TabsList>
                            {
                                data?.rol.sigla === 'EDA' || data?.rol.sigla === 'EVA' ? otherKeys?.map((key) => {
                                    return (
                                        <TabsContent value={key} key={key}>
                                            <Card>
                                                <CardContent>
                                                    <DataTable
                                                        columns={columnsLogCalificaciones}
                                                        data={
                                                            calificacionesOAcciones?.[key] ?
                                                                calificacionesOAcciones?.[key] : []
                                                        }
                                                        fieldSearch={"usuario"}
                                                        filter={true}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </TabsContent>);
                                }) :
                                    (
                                        <TabsContent value="acciones" key="acciones">
                                            <Card>
                                                <CardContent>
                                                    <DataTable
                                                        columns={columnsLogCierreFases}
                                                        data={calificacionesOAcciones ?? []}
                                                        fieldSearch={"usuario"}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    )
                            }
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}