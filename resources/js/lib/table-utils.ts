/**
 * Utilidades para animaciones y efectos en las tablas
 */

// Animación de entrada para las filas
export const tableRowAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

// Efecto de shimmer para loading states
export const shimmerEffect = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .shimmer {
    animation: shimmer 2s infinite;
    background: linear-gradient(
      to right,
      hsl(var(--muted)) 0%,
      hsl(var(--muted-foreground) / 0.1) 20%,
      hsl(var(--muted)) 40%,
      hsl(var(--muted)) 100%
    );
    background-size: 1000px 100%;
  }
`;

// Colores por área académica (extendido)
export const areaColors = {
  "MATEMÁTICAS": {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    gradient: "from-amber-400 to-amber-600"
  },
  "FÍSICA": {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-500/30",
    gradient: "from-blue-400 to-blue-600"
  },
  "QUÍMICA": {
    bg: "bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-500/30",
    gradient: "from-orange-400 to-orange-600"
  },
  "BIOLOGÍA": {
    bg: "bg-green-500/10",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-500/30",
    gradient: "from-green-400 to-green-600"
  },
  "INFORMÁTICA": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-700 dark:text-cyan-400",
    border: "border-cyan-500/30",
    gradient: "from-cyan-400 to-cyan-600"
  },
  "ASTRONOMÍA": {
    bg: "bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-500/30",
    gradient: "from-purple-400 to-purple-600"
  },
  "ASTRONOMÍA - ASTROFÍSICA": {
    bg: "bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-500/30",
    gradient: "from-purple-400 to-purple-600"
  },
  "ROBÓTICA": {
    bg: "bg-pink-500/10",
    text: "text-pink-700 dark:text-pink-400",
    border: "border-pink-500/30",
    gradient: "from-pink-400 to-pink-600"
  },
};

// Obtener configuración de color por área
export const getAreaColor = (area: string) => {
  const normalizedArea = area.toUpperCase().trim();
  return areaColors[normalizedArea as keyof typeof areaColors] || areaColors["FÍSICA"];
};

// Colores por calificación
export const getGradeColor = (nota: number) => {
  if (nota >= 90) return {
    bg: "bg-green-500/15",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-500/30",
    label: "Excelente"
  };
  if (nota >= 70) return {
    bg: "bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-500/30",
    label: "Bueno"
  };
  if (nota >= 51) return {
    bg: "bg-yellow-500/15",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-500/30",
    label: "Suficiente"
  };
  if (nota > 0) return {
    bg: "bg-red-500/15",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-500/30",
    label: "Insuficiente"
  };
  return {
    bg: "bg-muted/50",
    text: "text-muted-foreground",
    border: "border-border/50",
    label: "Sin calificar"
  };
};

// Formatear nota con decimales
export const formatGrade = (nota: number): string => {
  return nota.toFixed(2);
};

// Validar entrada de nota
export const validateGradeInput = (value: string): boolean => {
  return /^\d*\.?\d{0,2}$/.test(value) && Number(value) <= 100;
};

// Efecto de hover para botones premium
export const premiumButtonHover = "hover:shadow-lg hover:scale-105 transition-all duration-200";

// Clases para badges de medallas
export const medalBadgeClasses = {
  gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0 shadow-lg px-4 py-1.5 text-base font-bold",
  silver: "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 border-0 shadow-lg px-4 py-1.5 text-base font-bold",
  bronze: "bg-gradient-to-r from-orange-400 to-orange-600 text-white border-0 shadow-lg px-4 py-1.5 text-base font-bold"
};

// Función para obtener badge de posición
export const getPositionBadge = (position: number, hasScore: boolean) => {
  if (!hasScore) return null;
  
  switch(position) {
    case 1: return { class: medalBadgeClasses.gold, icon: "trophy" };
    case 2: return { class: medalBadgeClasses.silver, icon: "medal" };
    case 3: return { class: medalBadgeClasses.bronze, icon: "medal" };
    default: return null;
  }
};

// Estados de fase
export const phaseStates = {
  "en curso": {
    bg: "bg-green-500/15",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-500/30",
    animation: "animate-pulse"
  },
  "pendiente": {
    bg: "bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-500/30",
    animation: ""
  },
  "finalizada": {
    bg: "bg-red-500/15",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-500/30",
    animation: ""
  }
};

// Tipos de fase
export const phaseTypes = {
  "preliminares": {
    bg: "bg-slate-500/15",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-500/30"
  },
  "clasificatorias": {
    bg: "bg-indigo-500/15",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-500/30"
  },
  "finales": {
    bg: "bg-yellow-500/15",
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-500/30"
  }
};
