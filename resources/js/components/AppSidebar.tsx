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
    url: "#",
    icon: Home,
  },
  {
    title: "Usuarios",
    icon: User2,
    submenu: [
        {
            title: "Registrar evaluador",
            url: "#",
            icon: UserCheck,
        },
        {
            title: "Gestionar olimpista",
            url: "#",
            icon: User,
        },
    ],
  },
  {
    title: "Calendario",
    url: "#",
    icon: Calendar,
  },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
  {
    title: "Configuraciones",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const handleMenuButton = (item: any) => {
    return (
        <SidebarMenuButton asChild>
            <a href={item.url}>
                <item.icon />
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
                <SidebarGroupLabel>Opciones</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => {
                            if (item.submenu) {
                                return (
                                    <SidebarMenu key={item.title}>
                                        <Collapsible defaultOpen={false} className="group/collapsible">
                                            <SidebarMenuItem key={item.title}>
                                                <CollapsibleTrigger asChild>
                                                    { handleMenuButton(item) }
                                                </CollapsibleTrigger>
                                                {item.submenu.map((subitem) => (
                                                    <CollapsibleContent key={subitem.title}>
                                                        <SidebarMenuSub>
                                                            { handleMenuButton(subitem) }
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                ))}
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    </SidebarMenu>
                                )
                            }
                            return (
                                <SidebarMenuItem key={item.title}>
                                    { handleMenuButton(item) }
                                </SidebarMenuItem>)
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
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
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}