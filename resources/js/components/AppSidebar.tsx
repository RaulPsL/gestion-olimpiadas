import {
    ChevronDown,
    User2
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
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useAuth } from "@/hooks/use-context";
import React from "react";

export function AppSidebar() {
    const { data } = useAuth();
    const [menu, setMenu] = React.useState<any[]>([]);
    React.useEffect(() => {
        if (data) {
            setMenu(data?.menu);
        }
    }, [data]);
    const handleMenuButton = (item: any, isActive: boolean = false) => {
        return (
            <SidebarMenuButton asChild data-active={isActive}>
                <a 
                    href={item.url}
                    className="data-[active=true]:bg-cyan-50 data-[active=true]:text-cyan-900 dark:data-[active=true]:bg-cyan-950 dark:data-[active=true]:text-cyan-100">
                    <div className={item?.icon ?? ""}></div>
                    <span>{item.title}</span>
                    { item?.submenu && (<ChevronDown className="ml-auto" />) }
                </a>
            </SidebarMenuButton>
        );
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    { data?.rol }
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Evaluador</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Coordinador</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                                                        const isActive = window.location.pathname === item.url;
                                                        return <CollapsibleContent key={subitem.title}>
                                                            <SidebarMenuSub>
                                                                { handleMenuButton(subitem, isActive) }
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
                            <span>{ data?.datosUsuario.nombre }</span>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}