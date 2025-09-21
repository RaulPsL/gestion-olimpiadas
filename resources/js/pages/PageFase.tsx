import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import TableInternos from "@/tables/TableInterno";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import FormFase from "@/forms/FormFase";

export default function PageFase() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header role={true} home/>
                <div className="container mx-auto py-10">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <Users />
                        <Label className="text-2xl">Encargado de area</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6 items-center">
                        <FormFase />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}