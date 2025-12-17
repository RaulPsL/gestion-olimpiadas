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
    const { data } = useAuth();

    // Normaliza llaves del backend → llaves internas del frontend
    const KEY_MAP: Record<string, string> = {
        "Encargado de Área": "EDA",
        "Evaluador": "EVA",
    };

    // Nombres bonitos para mostrar en la UI
    const TAB_LABELS: Record<string, string> = {
        EDA: "Encargado de Área",
        EVA: "Evaluador",
    };

    const [tabs, setTabs] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (!data) return;

        const areas = data?.areas?.map((area) => area.sigla) ?? [];
        let usuarios: string[] = [];
        let finalTabs: string[] = [];

        // Definir usuarios y tabs según el rol
        if (data.rol.sigla === "EDA") {
            usuarios = ["EVA"];
            finalTabs = ["EVA"];
        } else if (data.rol.sigla === "ADM") {
            usuarios = ["EDA", "EVA"];
            finalTabs = ["EDA", "EVA"];
        }

        setTabs(finalTabs);

        const fetchUsuarios = async () => {
            const response = await getUsuarios(usuarios, areas);

            setRolUsuario(response);
        };

        fetchUsuarios();
    }, []);

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
                        <Tabs defaultValue={tabs[0]} key={tabs[0]}>
                            <TabsList>
                                {tabs.map((key) => (
                                    <TabsTrigger value={key} key={key}>
                                        {TAB_LABELS[key]}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {tabs.map((key) => (
                                <TabsContent value={key} key={key}>
                                    <Card>
                                        <CardContent>
                                            <DataTable
                                                columns={columnsInterno}
                                                data={rolUsuario[TAB_LABELS[key]] ?? []} // SIEMPRE arreglo
                                                fieldSearch="nombre"
                                                filter={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
