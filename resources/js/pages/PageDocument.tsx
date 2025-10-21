import { BookCopy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SectionAccountingOlimpistas } from "@/components/SectionAccoutingOlimpistas";

export default function PageGenerarDocs() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookCopy />
                        <Label className="text-2xl">Generar documentos</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <SectionAccountingOlimpistas />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}