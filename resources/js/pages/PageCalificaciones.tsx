import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getCalificacionesOlimpistas } from "@/api/Calificaciones";
import TableCalificaciones from "@/tables/TablaCalificaciones";
import { useAuth } from "@/hooks/use-context";

export default function PageCalificaciones() {
    const [calificaciones, setCalificaciones] = React.useState<any>();
    const [keys, setKeys] = React.useState<string[]>();
    const { data } = useAuth();

    React.useEffect(() => {
        const areasCalificacionUsuario = data?.areas.map((area) => area.sigla);
        const staticData = async () => {
            const response = await getCalificacionesOlimpistas(areasCalificacionUsuario as string[]);
                setCalificaciones(response);
            };
        staticData();
    }, []);

    React.useEffect(() => {
        if (calificaciones) {
            setKeys(Object.keys(calificaciones));
        }
    }, [calificaciones]);
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div id="headerTablaClasificaciones" className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Calificaciones por area</Label>
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
                                            <TableCalificaciones calificaciones={calificaciones[key]['calificaciones']} />
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