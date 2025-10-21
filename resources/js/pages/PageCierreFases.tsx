import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useAuth } from "@/hooks/use-context";
import { getCierres } from "@/api/Fases";
import TablecierreFases from "@/tables/TableCierreFases";

export default function PageCierreFases() {
    const [cierres, setCierres] = React.useState<any>();
    const [keys, setKeys] = React.useState<string[]>();
    const { data } = useAuth();
    const areasUsuario = data?.areas.map((area) => area.nombre);

    React.useEffect(() => {
        const staticData = async () => {
            const response = await getCierres(areasUsuario as string[]);
                setCierres(response);
            };
        staticData();
        console.log("Cierres de fases: ", cierres);
    }, []);
    
    React.useEffect(() => {
        if (cierres) {
            setKeys(Object.keys(cierres));
        }
    }, [cierres]);
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div id="headerTablaClasificaciones" className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Confirmación de cierres</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue={ String(areasUsuario?.[0]).toLocaleLowerCase() }>
                            <TabsList>
                                { areasUsuario?.map((key) => (
                                    <TabsTrigger value={String(key).toLocaleLowerCase()} key={key}>{key}</TabsTrigger>
                                ))}
                            </TabsList>
                            { keys?.map((key) => (
                                <TabsContent value={String(key).toLocaleLowerCase()} key={key}>
                                    <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                        <TablecierreFases cierres={cierres?.[key]} />
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