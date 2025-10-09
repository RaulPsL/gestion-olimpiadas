import { routeNames } from "@/static/data-navigate";
import { useLocation } from "react-router-dom";

// Función para limpiar texto (decodifica URL y elimina caracteres especiales)
const limpiarTexto = (texto: string) => {
  return decodeURIComponent(texto)
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export function useBreadcrumb() {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      
      // Si hay un nombre definido en routeNames, úsalo; si no, limpia y capitaliza
      const rawName = routeNames[path] || segment;
      const cleanedName = limpiarTexto(rawName);
      const name = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);

      const isLast = index === pathSegments.length - 1;
      return { path, name, isLast };
    });
    
    // Agregar "Inicio" si no estamos en la raíz
    if (location.pathname !== '/') {
      return [{ path: '/', name: 'Inicio', isLast: false }, ...breadcrumbs];
    }
    
    return breadcrumbs;
  }
  
  return generateBreadcrumbs();
}
