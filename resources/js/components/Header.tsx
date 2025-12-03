import { Link, useNavigate } from "react-router-dom";
import { NavigateMenu } from "./NavigateMenu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
}
    from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { useAuth } from "@/hooks/use-context";
import React from "react";
import { ArrowLeft, LogOut, User2 } from "lucide-react";

export default function Header() {
    const breadcrumbs = useBreadcrumb();
    const { data, logout } = useAuth();
    const datosUsuario = data?.data;
    const areas = data?.areas.flatMap((area) => area.sigla);
    const rol = data?.rol.nombre;
    const [role, setRole] = React.useState<boolean>(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (data !== null && data !== undefined) {
            setRole(true);
        }
    }, [data]);

    const handleLogout = () => {
        logout();
        navigate('/login');
        console.log("Cerrando sesión...");
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-3">
            <div className="flex items-center gap-2 h-full">
                {role && (<SidebarTrigger className="flex items-center" ><ArrowLeft /></SidebarTrigger>)}

                {(role && breadcrumbs.length > 0) && (
                    <Breadcrumb className="flex items-center">
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => (
                                <div key={item.path} className="flex items-center">
                                    <BreadcrumbItem
                                        className="hidden md:block"
                                        key={index}
                                    >
                                        <BreadcrumbPage
                                            className={item.isLast ? "" : "text-opacity-20"}
                                        >{item.name}</BreadcrumbPage>

                                    </BreadcrumbItem>
                                    {!item.isLast && (
                                        <BreadcrumbSeparator className="hidden md:block" />
                                    )}
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                )}
            </div>

            <div className="flex items-center content-center h-full gap-2">
                {!role && (<NavigateMenu role={role} />)}
                {
                    role && (
                        <div
                            className="relative"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Contenido normal del usuario */}
                            <div className={`text-white grid grid-cols-[auto_1fr] gap-x-3 items-center px-3 py-2 rounded-md transition-opacity duration-200 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <div className="flex items-center">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <User2 className="w-4 h-4 text-primary" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 text-left">
                                    <strong className="text-sm font-semibold">
                                        {`${datosUsuario?.nombre} ${datosUsuario?.apellido}`}
                                    </strong>

                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        {rol !== "Administrador de Sistema" ?
                                            <>
                                                {rol} - {(areas && areas.length <= 3) && (
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        {areas.length === 1 && data?.areas.map((area) => area.nombre).join(', ')}
                                                        {areas.length > 1 && areas.join(', ')}
                                                    </span>
                                                )}
                                            </> : rol
                                        }
                                    </span>
                                </div>
                            </div>

                            {/* Botón "Cerrar sesión" que aparece en hover */}
                            <Button
                                variant="ghost"
                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Cerrar sesión
                            </Button>
                        </div>
                    )
                }
            </div>
        </header>
    );
}