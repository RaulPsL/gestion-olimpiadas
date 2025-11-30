/**
 * Animaciones y micro-interacciones premium para el sistema
 */

// Clases CSS para animaciones reutilizables
export const animations = {
  // Entrada suave
  fadeIn: "animate-in fade-in duration-500",
  fadeInUp: "animate-in fade-in slide-in-from-bottom-4 duration-500",
  fadeInDown: "animate-in fade-in slide-in-from-top-4 duration-500",
  
  // Escala
  scaleIn: "animate-in zoom-in-95 duration-300",
  scaleHover: "hover:scale-105 transition-transform duration-200",
  
  // Brillo
  shimmer: "animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]",
  
  // Pulso
  pulse: "animate-pulse",
  pulseSlow: "animate-pulse [animation-duration:3s]",
  
  // Rebote
  bounce: "animate-bounce",
  bounceSlow: "animate-bounce [animation-duration:1.5s]",
  
  // Spin
  spin: "animate-spin",
  spinSlow: "animate-spin [animation-duration:3s]",
  
  // Slide
  slideInRight: "animate-in slide-in-from-right duration-300",
  slideInLeft: "animate-in slide-in-from-left duration-300",
  
  // Premium effects
  glow: "shadow-lg shadow-primary/20 transition-shadow duration-300",
  glowHover: "hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300",
};

// Delays escalonados para listas
export const staggerDelays = {
  item1: "animation-delay-100",
  item2: "animation-delay-200",
  item3: "animation-delay-300",
  item4: "animation-delay-400",
  item5: "animation-delay-500",
};

// Transiciones suaves
export const transitions = {
  base: "transition-all duration-200 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
  fast: "transition-all duration-100 ease-in-out",
  bounce: "transition-all duration-300 ease-bounce",
  spring: "transition-all duration-400 ease-spring",
};

// Efectos de hover premium
export const hoverEffects = {
  lift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
  grow: "hover:scale-105 transition-transform duration-200",
  glow: "hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300",
  brightness: "hover:brightness-110 transition-all duration-200",
  shine: "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
};

// Estados de botón
export const buttonStates = {
  loading: "opacity-70 cursor-not-allowed",
  disabled: "opacity-50 cursor-not-allowed",
  active: "ring-2 ring-primary ring-offset-2",
  success: "bg-green-500 hover:bg-green-600",
  error: "bg-red-500 hover:bg-red-600",
};

// Micro-interacciones para inputs
export const inputInteractions = {
  focus: "focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200",
  error: "border-red-500 focus:ring-red-500 focus:border-red-500",
  success: "border-green-500 focus:ring-green-500 focus:border-green-500",
  disabled: "bg-muted cursor-not-allowed opacity-60",
};

// Efectos de carga
export const loadingStates = {
  skeleton: "animate-pulse bg-gradient-to-r from-muted via-muted-foreground/10 to-muted",
  shimmer: "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-shimmer",
  dots: "inline-flex gap-1 [&>span]:w-2 [&>span]:h-2 [&>span]:rounded-full [&>span]:bg-primary [&>span]:animate-bounce [&>span:nth-child(2)]:animation-delay-150 [&>span:nth-child(3)]:animation-delay-300",
};

// Efectos de badge
export const badgeEffects = {
  default: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200",
  interactive: "cursor-pointer hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-200",
  glow: "shadow-sm hover:shadow-lg transition-shadow duration-300",
  pulse: "animate-pulse",
};

// Efectos de card
export const cardEffects = {
  default: "rounded-xl border border-border/50 bg-card transition-all duration-200",
  hover: "hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300",
  glass: "backdrop-blur-xl bg-card/80 border border-border/30",
  gradient: "bg-gradient-to-br from-card via-card to-card/80",
  premium: "shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm",
};

// Efectos de tabla
export const tableEffects = {
  row: "border-b border-border/30 hover:bg-muted/30 transition-colors duration-150",
  rowSelected: "bg-primary/5 border-primary/30",
  header: "border-b border-border/50 bg-muted/50",
  cell: "p-4 text-center transition-colors duration-150",
};

// Gradientes premium
export const gradients = {
  primary: "bg-gradient-to-r from-primary to-primary/80",
  accent: "bg-gradient-to-r from-accent to-accent/80",
  success: "bg-gradient-to-r from-green-500 to-green-600",
  warning: "bg-gradient-to-r from-yellow-500 to-yellow-600",
  danger: "bg-gradient-to-r from-red-500 to-red-600",
  info: "bg-gradient-to-r from-blue-500 to-blue-600",
  gold: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  silver: "bg-gradient-to-r from-gray-300 to-gray-500",
  bronze: "bg-gradient-to-r from-orange-400 to-orange-600",
  glass: "bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm",
};

// Sombras premium
export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  premium: "shadow-lg shadow-primary/10",
  premiumHover: "hover:shadow-xl hover:shadow-primary/20",
  inner: "shadow-inner",
  glow: "shadow-[0_0_20px_rgba(var(--primary),0.3)]",
};

// Bordes redondeados
export const roundness = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
  pill: "rounded-full px-4",
};

// Efectos de texto
export const textEffects = {
  gradient: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
  glow: "text-shadow-glow",
  highlight: "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:-z-10",
};

// Overlays
export const overlays = {
  dark: "absolute inset-0 bg-black/50",
  light: "absolute inset-0 bg-white/50",
  gradient: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
  blur: "absolute inset-0 backdrop-blur-sm",
};

// Utilidades de animación personalizadas para Tailwind
export const customAnimations = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(var(--primary), 0.3); }
    50% { box-shadow: 0 0 30px rgba(var(--primary), 0.5); }
  }
  
  @keyframes slideInFromBottom {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-slide-in {
    animation: slideInFromBottom 0.5s ease-out;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
  }
  
  .hover-lift {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .text-shadow-glow {
    text-shadow: 0 0 10px rgba(var(--primary), 0.5);
  }
  
  /* Delays escalonados */
  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }
`;

// Función helper para combinar clases de animación
export const combineAnimations = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Presets de componentes comunes
export const componentPresets = {
  button: {
    primary: combineAnimations(
      transitions.base,
      hoverEffects.lift,
      shadows.md,
      roundness.lg,
      "bg-primary text-primary-foreground font-semibold px-4 py-2"
    ),
    secondary: combineAnimations(
      transitions.base,
      hoverEffects.grow,
      roundness.lg,
      "bg-secondary text-secondary-foreground font-medium px-4 py-2"
    ),
    ghost: combineAnimations(
      transitions.base,
      "hover:bg-accent hover:text-accent-foreground rounded-lg px-4 py-2"
    ),
  },
  card: {
    default: combineAnimations(
      cardEffects.default,
      cardEffects.hover,
      shadows.md
    ),
    premium: combineAnimations(
      cardEffects.premium,
      shadows.premium
    ),
    glass: combineAnimations(
      cardEffects.glass,
      shadows.lg
    ),
  },
  badge: {
    default: combineAnimations(
      badgeEffects.default,
      roundness.full,
      shadows.sm
    ),
    interactive: combineAnimations(
      badgeEffects.default,
      badgeEffects.interactive,
      roundness.full
    ),
  },
};

export default {
  animations,
  transitions,
  hoverEffects,
  buttonStates,
  inputInteractions,
  loadingStates,
  badgeEffects,
  cardEffects,
  tableEffects,
  gradients,
  shadows,
  roundness,
  textEffects,
  overlays,
  customAnimations,
  combineAnimations,
  componentPresets,
};
