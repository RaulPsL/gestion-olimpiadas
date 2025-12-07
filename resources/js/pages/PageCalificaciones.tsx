import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getCalificacionesGrupos, getCalificacionesOlimpistas } from "@/api/Calificaciones";
import TableCalificaciones from "@/tables/TablaCalificaciones";
import { useAuth } from "@/hooks/use-context";
import { ListChecksIcon } from "lucide-react";
import TableCalificacionesGrupo from "@/tables/TableCalificacionesGrupo";

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
                await getCalificacionesGrupos(areasCalificacionUsuario as string[]) :
                await getCalificacionesOlimpistas(areasCalificacionUsuario as string[]);
            setCalificaciones(response);
        };
        staticData();
    }, [update]);

    React.useEffect(() => {
        console.log('Calificaciones', calificaciones);
        if (calificaciones) {
            // Solo establecer keys si NO tiene la propiedad areasCalificacionUsuario
            if (!('areasCalificacionUsuario' in calificaciones)) {
                setKeys(Object.keys(calificaciones));
            } else {
                setKeys([]);
            }
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
                        {calificaciones && !('areasCalificacionUsuario' in calificaciones) && keys && keys.length > 0 ? (
                            <Tabs defaultValue={areasCalificacionUsuario?.[0]}>
                                <TabsList>
                                    {areasCalificacionUsuario?.map((key) => (
                                        <TabsTrigger value={key} key={key}>{`${key}-${calificaciones?.[key] ? calificaciones?.[key]?.sigla : ""}`}</TabsTrigger>
                                    ))}
                                </TabsList>
                                {keys?.map((key) => (
                                    <TabsContent value={key} key={key}>
                                        <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                            {calificaciones?.[key]?.calificaciones && calificaciones[key].calificaciones.length > 0 ? (
                                                esGrupo ? 
                                                    <TableCalificacionesGrupo
                                                        calificaciones={calificaciones[key]}
                                                        setUpdate={setUpdate}
                                                    /> : 
                                                    <TableCalificaciones
                                                        calificaciones={calificaciones[key]}
                                                        setUpdate={setUpdate}
                                                    />
                                            ) : (
                                                <div className="flex w-full justify-center items-center p-8">
                                                    <div className="text-center space-y-2">
                                                        <p className="text-lg font-semibold text-muted-foreground">No hay calificaciones disponibles</p>
                                                        <p className="text-sm text-muted-foreground">Aún no se han registrado calificaciones para esta área</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : calificaciones && 'areasCalificacionUsuario' in calificaciones ? (
                            <div className="flex w-full justify-center items-center p-8">
                                <div className="text-center space-y-2">
                                    <p className="text-lg font-semibold text-muted-foreground">No tienes áreas asignadas</p>
                                    <p className="text-sm text-muted-foreground">Contacta con el administrador para que te asigne áreas de calificación</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full justify-center items-center p-8">
                                <p className="text-muted-foreground">Cargando calificaciones...</p>
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}