import { Link } from "react-router-dom";
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
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { useAuth } from "@/hooks/use-context";
import React from "react";
import { ArrowLeft } from "lucide-static";

export default function Header() {
    const breadcrumbs = useBreadcrumb();
    const { data } = useAuth();
    const [role, setRole] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (data !== null && data !== undefined) {
            setRole(true);
        }
    }, [data]);
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-3">
            <div className="flex items-center gap-2 h-full">
                {role && (<SidebarTrigger className="flex items-center" ><ArrowLeft/></SidebarTrigger>)}

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

            <div className="flex items-center h-full">
                <NavigateMenu role={role} />
            </div>
        </header>
    );
}