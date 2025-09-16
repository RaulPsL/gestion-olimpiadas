import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { AppSidebar } from "./AppSidebar";

export function AppSidebarWrapper() {
  const { open, setOpen } = useSidebar();

  useEffect(() => {
    setOpen(true); // abre el sidebar automáticamente al cargar
  }, [setOpen]);

  return <AppSidebar />;
}