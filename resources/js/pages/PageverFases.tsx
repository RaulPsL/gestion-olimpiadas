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
import { columns } from "@/components/tables/ColumnsFase";
import { getFases } from "@/api/Fases";
import { useAuth } from "@/hooks/use-context";

export default function PageVerFases() {
    const [fases, setFases] = React.useState<any>({});
    const [areas, setAreas] = React.useState<any>([]);
    const { data } = useAuth();
    React.useEffect(() => {
        const staticData = async () => {
            const staticfases = await getFases(data?.areas.map((area) => area?.nombre) as string[]);
            setFases(staticfases);
        };
        staticData();
    }, []);

    React.useEffect(() => {
        console.log('Datos: ', fases);
        if (fases) setAreas(Object.keys(fases));
    }, [fases]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookUser />
                        <Label className="text-2xl">Fases de las áreas del usuario</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue={areas?.[0]} key={areas?.[0]}>
                            <TabsList>
                                {
                                    areas ? (
                                        areas.map((area: string) => <TabsTrigger value={area} key={area}>{area}</TabsTrigger>)
                                    ) : (
                                        <>
                                            <TabsTrigger value="Matemáticas">Matemáticas</TabsTrigger>
                                            <TabsTrigger value="Robotica">Robotica</TabsTrigger>
                                            <TabsTrigger value="Física">Física</TabsTrigger>
                                            <TabsTrigger value="Biología">Biología</TabsTrigger>
                                        </>
                                    )
                                }
                            </TabsList>
                            {
                                areas.map(
                                    (area: string) => (
                                    <TabsContent value={area} key={area}>
                                        <Card>
                                            <CardContent>
                                                <DataTable columns={columns} data={fases[area]} />
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    )
                                )
                            }
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}