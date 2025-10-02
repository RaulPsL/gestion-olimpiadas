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
import { getOlimpistas } from "@/api/Olimpistas";
import { getUsuarios } from "@/api/Usuarios";
import { columnsInterno } from "@/components/tables/ColumnsInterno";

export default function PageArea() {
    const [olimpistas, setOlimpistas] = React.useState<any[]>([]);
    const [rolUsuario, setRolUsuario] = React.useState<any>({});
    const [keys, setKeys] = React.useState<any[]>([]);

    React.useEffect(() => {
        const staticData = async () => {
            const staticData = await getOlimpistas();
            const staticRol = await getUsuarios();
            setOlimpistas(staticData);
            setRolUsuario(staticRol);
        };
        staticData();
    }, []);
    
    React.useEffect(() => {
        if (rolUsuario) setKeys(Object.keys(rolUsuario));
        console.log('Keys: ', keys);
        console.log('Rol: ', rolUsuario);
    }, [rolUsuario]);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header role={true} home/>
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Visualizar usuarios</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue="olimpistas">
                            <TabsList>
                                <TabsTrigger value="olimpistas">Olimpistas</TabsTrigger>
                                { 
                                    keys?.map((key) => {
                                        const value = String(key).split(" ")[0].toLocaleLowerCase();
                                        return (<TabsTrigger value={value} key={value}>{key}</TabsTrigger>);
                                    })
                                }
                            </TabsList>
                            <TabsContent value="olimpistas">
                                <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                    <Card>
                                        <CardContent>
                                            <DataTable columns={columns} data={olimpistas} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            {
                                keys?.map((key) => {
                                    const value = String(key).split(" ")[0].toLocaleLowerCase();
                                    return (
                                    <TabsContent value={value}>
                                        <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                            <Card>
                                                <CardContent>
                                                    <DataTable columns={columnsInterno} data={rolUsuario?.[key]} />
                                                </CardContent>
                                            </Card>
                                        </div>
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