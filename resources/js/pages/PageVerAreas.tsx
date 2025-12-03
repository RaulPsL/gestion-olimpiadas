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
import { getAreas } from "@/api/Areas";
import { columns } from "@/components/tables/ColumnsArea";
import { useAuth } from "@/hooks/use-context";

export default function PageVerAreas() {
    const [areas, setAreas] = React.useState<any>({});
    const { data } = useAuth();

    React.useEffect(() => {
        const staticData = async () => {
            const staticAreas = await getAreas(data?.areas.map((area) => area?.sigla) as string[]);
            setAreas(staticAreas);
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
                        <Label className="text-2xl">Áreas de usuario</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue="areas">
                            <TabsList>
                                <TabsTrigger value="areas">Áreas</TabsTrigger>
                            </TabsList>
                            <TabsContent value="areas">
                                <Card>
                                    <CardContent>
                                        <DataTable
                                            columns={columns}
                                            data={areas}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}