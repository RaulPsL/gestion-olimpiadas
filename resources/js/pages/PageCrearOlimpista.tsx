import FormOlimpista from "@/forms/FormOlimpista";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormMassiveOlimista from "@/forms/FormMassiveOlimpista";
import FormGroup from "@/forms/FormGroup";

export default function PageRegistroOlimpista({grupo=false} : {grupo?: boolean}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <User />
                        <Label className="text-2xl">Olimpistas</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        {
                            grupo ? (
                                <FormGroup />
                            ) : (
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
                            )
                        }
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}