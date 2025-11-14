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
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useAuth } from "@/hooks/use-context";
import { Link } from "react-router-dom";
import React from "react";

export function AppSidebar() {
    const { data } = useAuth();
    const datosUsuario = data?.data;
    const rol = data?.rol.nombre;
    const [menu, setMenu] = React.useState<any[]>([]);
    const areas = data?.areas.flatMap((area) => area.sigla);
    const [headerImage, setHeaderImage] = React.useState<string>('');

    React.useEffect(() => {
        if (data) {
            fetch(new URL('../../js/images/portadaPrincipalLimitadaFCYT.jpg', import.meta.url))
                .then(res => {
                    if (!res.ok) throw new Error('No se pudo cargar la imagen del header');
                    return res.blob();
                })
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setHeaderImage(imageUrl);
                })
                .catch(error => {
                    console.error('Error cargando imagen:', error);
                });

            setMenu(data?.menu);
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.rol.sigla === "EDA" && areas && areas?.length > 0) {
            const areaInf = areas.find((area) => area === "INF");
            const areaRob = areas.find((area) => area === "ROB");
            if (!areaInf && !areaRob) {
                setMenu(prev => (
                    prev.map(menu => {
                        if (menu.submenu) {
                            return {
                                ...menu,
                                submenu: menu.submenu.filter(
                                    (submenu: any) => submenu.title !== 'Inscribir grupos'
                                )
                            };
                        }
                        return menu;
                    })
                ));
            }
        }
    }, [datosUsuario]);

    const handleMenuButton = (item: any, isActive: boolean = false) => {
        return (
            <SidebarMenuButton asChild data-active={isActive}>
                {
                    item.submenu ? (
                        <span
                            className="data-[active=true]:bg-cyan-50 data-[active=true]:text-cyan-900 dark:data-[active=true]:bg-cyan-950 dark:data-[active=true]:text-cyan-100">
                            <i className={`${item?.icon ?? ""} w-5 h-5`}></i>
                            <span>{item.title}</span>
                            {item?.submenu && (<ChevronDown className="ml-auto" />)}
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
            <SidebarHeader
                className=''
            >
                {headerImage && (
                    <img
                        src={headerImage}
                        alt="Header FCYT"
                        className='rounded-md w-full h-full'
                    />
                )}
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
                                                        {handleMenuButton(item)}
                                                    </CollapsibleTrigger>
                                                    {item.submenu.map((subitem: any) => {
                                                        const isSubitemActive = window.location.pathname === subitem.url;
                                                        return <CollapsibleContent key={subitem.title}>
                                                            <SidebarMenuSub>
                                                                {handleMenuButton(subitem, isSubitemActive)}
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
                                        {handleMenuButton(item, isActive)}
                                    </SidebarMenuItem>)
                            }
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
                            <div className="row-span-2 flex items-center">
                                <User2 />
                            </div>
                            <strong>{`${datosUsuario?.nombre} ${datosUsuario?.apellido}`}</strong>
                            <span className="text-sm text-muted-foreground">{rol}</span>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}