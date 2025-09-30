import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import FormUsuarioInterno from "@/forms/FormUsuarioInterno";
import TableInternos from "@/tables/TableInterno";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";

export default function PageInterno({ tipoUsuario }: { tipoUsuario: string }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header role={true} home/>
                <div className="container mx-auto py-10">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <Users />
                        <Label className="text-2xl">{tipoUsuario} de area</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6 items-center">
                        <FormUsuarioInterno tipoUsuario={tipoUsuario} />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}