import { BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import TableAreas from "@/tables/TableAreas";
import TableFases from "@/tables/TableFases";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableOlimpistas from "@/tables/TableOlimpista";

export default function PageArea() {
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
                                <TabsTrigger value="encargados">Encargados</TabsTrigger>
                                <TabsTrigger value="evaluadores">Evaluadores</TabsTrigger>
                            </TabsList>
                            <TabsContent value="olimpistas">
                                <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                    <TableOlimpistas />
                                </div>
                            </TabsContent>
                            <TabsContent value="encargados">
                                <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                    <TableFases />
                                </div>
                            </TabsContent>
                            <TabsContent value="evaluadores">
                                <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                    <TableFases />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}