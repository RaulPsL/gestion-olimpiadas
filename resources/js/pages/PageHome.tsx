import CustomCalendar from "@/components/Calendar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { SectionAccountingOlimpistas } from "@/components/SectionAccoutingOlimpistas";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAutoUpdate } from "@/hooks/use-auto-update";
import useStaticData from "@/hooks/use-static-data";
import React from "react";

export default function PageHome() {
    const [datos, setDatos] = React.useState<any>();
    const [refreshKey, setRefreshKey] = React.useState(0);
    
    useStaticData({setData: setDatos});

    // Actualizar cuando se reciba un evento de Pusher
    useAutoUpdate(() => {
        console.log('Actualizando datos de la página home...');
        setRefreshKey(prev => prev + 1);
    });

    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <SectionAccountingOlimpistas datos={datos}/>
                    <CustomCalendar refreshKey={refreshKey} />
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}