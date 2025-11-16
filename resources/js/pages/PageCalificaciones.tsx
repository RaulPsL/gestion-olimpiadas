import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getCalificacionesGrupos, getCalificacionesOlimpistas } from "@/api/Calificaciones";
import TableCalificaciones from "@/tables/TablaCalificaciones";
import { useAuth } from "@/hooks/use-context";
import { ListChecksIcon } from "lucide-react";

export default function PageCalificaciones({ esGrupo } : { esGrupo: boolean}) {
    const [calificaciones, setCalificaciones] = React.useState<any>();
    const [update, setUpdate] = React.useState<boolean>(false);
    const [keys, setKeys] = React.useState<string[]>();
    const { data } = useAuth();
    const areasCalificacionUsuario = data?.areas.map((area) => area.nombre);

    React.useEffect(() => {
        const staticData = async () => {
            const response = 
                esGrupo ? 
                await getCalificacionesOlimpistas(areasCalificacionUsuario as string[]) : 
                await getCalificacionesGrupos(areasCalificacionUsuario as string[]);
            setCalificaciones(response);
        };
        staticData();
    }, [update]);

    React.useEffect(() => {
        console.log(calificaciones);
        if (calificaciones) {
            setKeys(Object.keys(calificaciones));
        }
    }, [calificaciones, update]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div id="headerTablaClasificaciones" className="flex w-full flex-row gap-6 p-4 items-center">
                        <ListChecksIcon />
                        <Label className="text-2xl">Calificaciones por area</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue={areasCalificacionUsuario?.[0]}>
                            <TabsList>
                                {areasCalificacionUsuario?.map((key) => (
                                    <TabsTrigger value={key} key={key}>{key}</TabsTrigger>
                                ))}
                            </TabsList>
                            {keys?.map((key) => (
                                <TabsContent value={key} key={key}>
                                    <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                        <TableCalificaciones calificaciones={calificaciones[key]} setUpdate={setUpdate}/>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}