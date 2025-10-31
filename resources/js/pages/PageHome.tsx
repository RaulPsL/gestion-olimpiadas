import CustomCalendar from "@/components/Calendar";
import Header from "@/components/Header";
import { SectionAccountingOlimpistas } from "@/components/SectionAccoutingOlimpistas";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useStaticData from "@/hooks/use-static-data";
import React from "react";

export default function PageHome() {
    const [datos, setDatos] = React.useState<any>();
    useStaticData({setData: setDatos});
    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <SectionAccountingOlimpistas datos={datos}/>
                    <CustomCalendar />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}