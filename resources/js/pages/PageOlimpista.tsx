import FormOlimpista from "@/forms/FormOlimpista";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccordionInformation } from "@/components/AccordionInformation";
import FormMassiveOlimista from "@/forms/FormMassiveOlimpista";

export default function PageOlimpista() {
    const information = [
        {
            id: "onlyone",
            title: "Registro individual",
            description: "Registro de un olimpista",
        },
        {
            id: "massive",
            title: "Registro multiple",
            description: "Registro de varios olimpistas",
        },
    ]
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header role={true} home/>
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <User />
                        <Label className="text-2xl">Olimpistas</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Tabs defaultValue="onlyone">
                            <TabsList>
                                <TabsTrigger value="onlyone">Registro individual</TabsTrigger>
                                <TabsTrigger value="massive">Registro multiple</TabsTrigger>
                            </TabsList>
                            <TabsContent value="onlyone">
                                <div className="flex w-full flex-row gap-6 p-4 justify-center">
                                    <FormOlimpista />
                                    {/* <AccordionInformation information={information} /> */}
                                </div>
                            </TabsContent>
                            <TabsContent value="massive">
                                <FormMassiveOlimista />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}