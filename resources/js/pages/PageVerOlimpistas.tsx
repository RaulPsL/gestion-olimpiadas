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

export default function PageVerOlimpistas() {
    const [olimpistas, setOlimpistas] = React.useState<any[]>([]);

    React.useEffect(() => {
        const staticData = async () => {
            const staticOlimpistas = await getOlimpistas();
            setOlimpistas(staticOlimpistas);
        };
        staticData();
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
                        <Tabs defaultValue="olimpistas">
                            <TabsList>
                                <TabsTrigger value="olimpistas">Olimpistas</TabsTrigger>
                            </TabsList>
                            <TabsContent value="olimpistas">
                                <Card>
                                    <CardContent>
                                        <DataTable
                                            columns={columns}
                                            data={olimpistas}
                                            fieldSearch="nombre"
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}