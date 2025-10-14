import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-context";

export function NavigateMenu({ role }: { role: boolean }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {!role && (<NavigationMenuTrigger>Menu olimpistas</NavigationMenuTrigger>)}
          <NavigationMenuContent className="bg-background border border-border shadow-lg">
            <ul className="grid w-[300px] gap-1 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="#"
                  >
                    <div className="text-sm font-medium leading-none">Areas de concurso</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Mostrara las areas que esten habilitadas para concursar.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/clasificaciones/areas"
                  >
                    <div className="text-sm font-medium leading-none">Calificaciones de todas las areas</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Le dirigira a todas las calificaciones los diferentes olimpistas en las diferentes áreas.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="#"
                  >
                    <div className="text-sm font-medium leading-none">Como concursar</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Mostrara como concursar.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            {
              role ? (
                <Button
                  variant="ghost"
                  onClick={
                    () => { 
                      logout();
                      navigate('/login');
                  }}
                >
                  Cerrar sesion
                </Button>
              ):(
                <Link to={"/login"}>{"Iniciar sesion"}</Link>
              )
            }

          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
