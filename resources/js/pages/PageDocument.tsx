import { BookCopy, TrendingUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SectionAccountingOlimpistas } from "@/components/SectionAccoutingOlimpistas";
import { useAuth } from "@/hooks/use-context";
import React from "react";
import useStaticData from "@/hooks/use-static-data";

export default function PageGenerarDocs() {
    const { data } = useAuth();
    const [datos, setDatos] = React.useState<any>();
    useStaticData({data: data, setData: setDatos});
    return (
        <SidebarProvider>
            { data && <AppSidebar /> }
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookCopy />
                        <Label className="text-2xl">Generar documentos</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <SectionAccountingOlimpistas datos={datos} />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}