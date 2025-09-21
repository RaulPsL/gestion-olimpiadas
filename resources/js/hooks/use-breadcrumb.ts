import { routeNames } from "@/static/data-navigate";
import { useLocation } from "react-router-dom";

export function useBreadcrumb() {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const name = routeNames[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLast = index === pathSegments.length - 1;
      
      return { path, name, isLast }
    });
    
    // Agregar Inicio si no estamos en la raíz
    if (location.pathname !== '/') {
      return [{ path: '/', name: 'Inicio', isLast: false }, ...breadcrumbs];
    }
    
    return breadcrumbs;
  }
  
  return generateBreadcrumbs();
}