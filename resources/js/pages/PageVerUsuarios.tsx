import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import React from "react";
import { getUsuarios } from "@/api/Usuarios";
import { columnsInterno } from "@/components/tables/ColumnsInterno";
import { useAuth } from "@/hooks/use-context";

export default function PageVerUsuarios() {
    const [rolUsuario, setRolUsuario] = React.useState<any>({});
    const [keys, setKeys] = React.useState<any[]>([]);
    const { data } = useAuth();

    React.useEffect(() => {
        const areas = data?.areas.map((area) => area.sigla);
        const usuarios = data?.rol.sigla === 'EDA' ? ['EVA'] : ['EVA', 'EDA']
        const staticData = async () => {
            const staticRol = await getUsuarios(usuarios, areas as string[]);
            setRolUsuario(staticRol);
        };
        staticData();
    }, []);
    
    React.useEffect(() => {
        if (rolUsuario) setKeys(Object.keys(rolUsuario));
    }, [rolUsuario]);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Visualizar usuarios</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue={keys?.[0]} key={keys?.[0]}>
                            <TabsList>
                                { 
                                    keys?.map((key) => {
                                        const value = String(key);
                                        return (<TabsTrigger value={value} key={value}>{key}</TabsTrigger>);
                                    })
                                }
                            </TabsList>
                            {
                                keys?.map((key) => {
                                    const value = String(key);
                                    return (
                                    <TabsContent value={value} key={value}>
                                        <Card>
                                            <CardContent>
                                                <DataTable
                                                    columns={columnsInterno}
                                                    data={rolUsuario?.[key]}
                                                    fieldSearch="nombre"
                                                />
                                            </CardContent>
                                        </Card>
                                    </TabsContent>);
                                })
                            }
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}