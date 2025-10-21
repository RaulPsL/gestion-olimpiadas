import 'lucide-static/font/lucide.css';
import '@tabler/icons-webfont/dist/tabler-icons.min.css';

import {
    ChevronDown,
    User2,
    UserCog
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useAuth } from "@/hooks/use-context";
import { Link } from "react-router-dom";
import React from "react";

export function AppSidebar() {
    const { data } = useAuth();
    const datosUsuario = data?.data;
    const [menu, setMenu] = React.useState<any[]>([]);
    
    React.useEffect(() => {
        if (data) {
            setMenu(data?.menu);
        }
    }, [data]);
    
    const handleMenuButton = (item: any, isActive: boolean = false) => {
        return (
            <SidebarMenuButton asChild data-active={isActive}>
                {
                    item.submenu ? (
                        <span
                            className="data-[active=true]:bg-cyan-50 data-[active=true]:text-cyan-900 dark:data-[active=true]:bg-cyan-950 dark:data-[active=true]:text-cyan-100">
                            <i className={`${item?.icon ?? ""} w-5 h-5`}></i>
                            <span>{item.title}</span>
                            { item?.submenu && (<ChevronDown className="ml-auto" />) }
                        </span>
                    ) : (
                        <Link 
                            to={item.url}
                            className="data-[active=true]:bg-cyan-50 data-[active=true]:text-cyan-900 dark:data-[active=true]:bg-cyan-950 dark:data-[active=true]:text-cyan-100">
                            <i className={`${item?.icon ?? ""} w-5 h-5`}></i>
                            <span>{item.title}</span>
                        </Link>
                    )
                }
            </SidebarMenuButton>
        );
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem
                        className='flex flex-row justify-start'
                    >
                        <UserCog />
                        <strong className='text-base'>{ data?.rol?.nombre }</strong>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Acciones de usuario</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menu?.map((item) => {
                                const isActive = window.location.pathname === item.url;
                                if (item.submenu) {
                                    return (
                                        <SidebarMenu key={item.title}>
                                            <Collapsible defaultOpen={false} className="group/collapsible">
                                                <SidebarMenuItem key={item.title}>
                                                    <CollapsibleTrigger asChild>
                                                        { handleMenuButton(item) }
                                                    </CollapsibleTrigger>
                                                    {item.submenu.map((subitem : any) => {
                                                        const isSubitemActive = window.location.pathname === subitem.url;
                                                        return <CollapsibleContent key={subitem.title}>
                                                            <SidebarMenuSub>
                                                                { handleMenuButton(subitem, isSubitemActive) }
                                                            </SidebarMenuSub>
                                                        </CollapsibleContent>
                                                    })}
                                                </SidebarMenuItem>
                                            </Collapsible>
                                        </SidebarMenu>
                                    )
                                }
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        { handleMenuButton(item, isActive) }
                                    </SidebarMenuItem>)
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-row gap-4 items-center">
                            <User2/> 
                            <strong>{ `${datosUsuario?.nombre} ${datosUsuario?.apellido}`}</strong>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}