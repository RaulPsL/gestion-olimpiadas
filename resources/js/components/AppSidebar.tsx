import { Calendar, ChevronDown, ChevronUp, GroupIcon, Home, Inbox, Search, Settings, User, User2, UserCheck } from "lucide-react"

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
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Usuarios",
    icon: User2,
    submenu: [
        {
            title: "Olimpistas",
            url: "/olimpistas",
        },
        {
            title: "Encargado de Area",
            url: "/administrar/encargado",
        },
        {
            title: "Evaluador",
            url: "/administrar/evaluador",
        },
        {
            title: "Visualizar usuarios",
            url: "/area",
        },
    ],
  },
  {
    title: "Fases de competencia",
    url: "/fases",
    icon: Calendar,
  },
  {
    title: "Configuraciones",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const handleMenuButton = (item: any, isActive: boolean = false) => {
    return (
        <SidebarMenuButton asChild data-active={isActive}>
            <a 
                href={item.url}
                className="data-[active=true]:bg-cyan-50 data-[active=true]:text-cyan-900 dark:data-[active=true]:bg-cyan-950 dark:data-[active=true]:text-cyan-100">
                { item.icon && (<item.icon className="mr-2" />) }
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
                                Seleccionar Rol Usuario
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
                        {items.map((item) => {
                            const isActive = window.location.pathname === item.url;
                            if (item.submenu) {
                                return (
                                    <SidebarMenu key={item.title}>
                                        <Collapsible defaultOpen={false} className="group/collapsible">
                                            <SidebarMenuItem key={item.title}>
                                                <CollapsibleTrigger asChild>
                                                    { handleMenuButton(item) }
                                                </CollapsibleTrigger>
                                                {item.submenu.map((subitem) => {
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
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <User2 /> Username
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width]"
                        >
                            <DropdownMenuItem>
                                <span>Informacion de Cuenta</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Cerrar sesion</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <div className="flex flex-row gap-4 items-center">
                        <User2/> 
                        <span>Username</span>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}