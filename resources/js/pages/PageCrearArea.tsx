import { FlagTriangleRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import FormArea from "@/forms/FormArea";

export default function PageCrearArea() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="container mx-auto py-10">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <FlagTriangleRight />
                        <Label className="text-2xl">Preparacion de área</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6 items-center">
                        <FormArea />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}