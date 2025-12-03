import React, { useState } from 'react';
import {
  Event,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Sparkles,
  Dna,
  Atom,
  Code,
  Calculator,
  Beaker,
  Bot,
} from 'lucide-react';
// Configurar moment en español
moment.locale('es');
// Interfaces usando los tipos de react-big-calendar
interface CustomEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  calificacion?: Date;
  resource?: {
    area: string;
    participants: number;
    location: string;
    description: string;
    type: 'preliminares' | 'clasificatorias' | 'finales';
    state_fase?: string;
  };
}

interface AreaColors {
  [key: string]: {
    color: string;
    bg: string;
    darkBg: string;
    label: string;
    icon: React.ComponentType<any>;
  };
}

// Colores mejorados por área con iconos
const coloresPorArea: AreaColors = {
  'ASTRONOMÍA - ASTROFÍSICA': {
    color: '#8b5cf6',
    bg: '#ede9fe',
    darkBg: '#7c3aed',
    label: 'Astronomía',
    icon: Sparkles
  },
  'BIOLOGÍA': {
    color: '#10b981',
    bg: '#d1fae5',
    darkBg: '#059669',
    label: 'Biología',
    icon: Dna
  },
  'FÍSICA': {
    color: '#3b82f6',
    bg: '#dbeafe',
    darkBg: '#2563eb',
    label: 'Física',
    icon: Atom
  },
  'INFORMÁTICA': {
    color: '#06b6d4',
    bg: '#cffafe',
    darkBg: '#0891b2',
    label: 'Informática',
    icon: Code
  },
  'MATEMÁTICAS': {
    color: '#f59e0b',
    bg: '#fef3c7',
    darkBg: '#d97706',
    label: 'Matemáticas',
    icon: Calculator
  },
  'QUÍMICA': {
    color: '#f97316',
    bg: '#fed7aa',
    darkBg: '#ea580c',
    label: 'Química',
    icon: Beaker
  },
  'ROBÓTICA': {
    color: '#ec4899',
    bg: '#fce7f3',
    darkBg: '#db2777',
    label: 'Robótica',
    icon: Bot
  },
};


// Eventos de ejemplo con state_fase actualizados
const eventosIniciales: CustomEvent[] = [
  {
    id: 1,
    title: 'ROBÓTICA - Construcción Avanzada',
    start: new Date(2025, 10, 3, 9, 0),
    calificacion: new Date(2025, 10, 3, 10, 30),
    end: new Date(2025, 10, 3, 12, 0),
    resource: {
      area: 'ROBÓTICA',
      participants: 25,
      location: 'Laboratorio 1',
      description: 'Construcción de robots avanzados',
      type: 'clasificatorias',
      state_fase: 'en curso'
    }
  },
  {
    id: 2,
    title: 'FÍSICA - Mecánica Clásica',
    start: new Date(2025, 10, 3, 14, 0),
    calificacion: new Date(2025, 10, 3, 15, 30),
    end: new Date(2025, 10, 3, 17, 0),
    resource: {
      area: 'FÍSICA',
      participants: 30,
      location: 'Aula 301',
      description: 'Examen de mecánica clásica',
      type: 'preliminares',
      state_fase: 'finalizada'
    }
  },
  {
    id: 3,
    title: 'MATEMÁTICAS - Álgebra Superior',
    start: new Date(2025, 10, 4, 10, 0),
    calificacion: new Date(2025, 10, 4, 11, 0),
    end: new Date(2025, 10, 4, 13, 0),
    resource: {
      area: 'MATEMÁTICAS',
      participants: 40,
      location: 'Auditorio',
      description: 'Competencia de álgebra',
      type: 'finales',
      state_fase: 'pendiente'
    }
  },
  {
    id: 4,
    title: 'BIOLOGÍA - Genética Molecular',
    start: new Date(2025, 10, 5, 8, 0),
    calificacion: new Date(2025, 10, 5, 9, 30),
    end: new Date(2025, 10, 5, 11, 0),
    resource: {
      area: 'BIOLOGÍA',
      participants: 20,
      location: 'Laboratorio Bio',
      description: 'Análisis de ADN',
      type: 'clasificatorias',
      state_fase: 'en curso'
    }
  },
  {
    id: 5,
    title: 'INFORMÁTICA - Programación Competitiva',
    start: new Date(2025, 10, 6, 13, 0),
    calificacion: new Date(2025, 10, 6, 15, 30),
    end: new Date(2025, 10, 6, 18, 0),
    resource: {
      area: 'INFORMÁTICA',
      participants: 35,
      location: 'Centro de Cómputo',
      description: 'Maratón de programación',
      type: 'finales',
      state_fase: 'en curso'
    }
  },
  {
    id: 6,
    title: 'QUÍMICA - Reacciones Orgánicas',
    start: new Date(2025, 10, 7, 9, 30),
    calificacion: new Date(2025, 10, 7, 11, 0),
    end: new Date(2025, 10, 7, 12, 30),
    resource: {
      area: 'QUÍMICA',
      participants: 18,
      location: 'Lab Química',
      description: 'Síntesis orgánica',
      type: 'preliminares',
      state_fase: 'pendiente'
    }
  }
];

export default function TypedCalendar() {
  const [eventos, setEventos] = useState<CustomEvent[]>(eventosIniciales);

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Áreas de Competencia - Información Interactiva */}
      <Card className="shadow-premium hover-lift border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            <CalendarDays className="h-6 w-6 text-primary" />
            Áreas de Competencia - Olimpiadas Científicas
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Explora cada área de competencia y descubre qué se hace en las olimpiadas
          </p>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(coloresPorArea).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <div
                  key={key}
                  className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  style={{
                    borderColor: `${config.color}40`,
                    backgroundColor: 'hsl(var(--card))'
                  }}
                >
                  {/* Barra de color lateral */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2"
                    style={{ backgroundColor: config.darkBg }}
                  />
                  
                  {/* Fondo animado */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${config.color}15, transparent)`
                    }}
                  />

                  <div className="relative p-5 space-y-3">
                    {/* Icono y Título */}
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ backgroundColor: `${config.color}20` }}
                      >
                        <IconComponent
                          className="w-6 h-6 transition-colors duration-300"
                          style={{ color: config.darkBg }}
                        />
                      </div>
                      <h3
                        className="font-bold text-base transition-colors duration-300"
                        style={{ color: config.darkBg }}
                      >
                        {config.label}
                      </h3>
                    </div>

                    {/* Descripción */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {key === 'ASTRONOMÍA - ASTROFÍSICA' && 'Explora el universo, estudia cuerpos celestes y fenómenos astronómicos mediante observación y análisis teórico.'}
                      {key === 'BIOLOGÍA' && 'Investiga los seres vivos, desde biología molecular hasta ecosistemas, con experimentos prácticos y análisis científico.'}
                      {key === 'FÍSICA' && 'Resuelve problemas de mecánica, termodinámica, óptica y física moderna aplicando principios fundamentales.'}
                      {key === 'INFORMÁTICA' && 'Desarrolla algoritmos, programación competitiva y resolución de problemas computacionales complejos.'}
                      {key === 'MATEMÁTICAS' && 'Demuestra teoremas, resuelve problemas de álgebra, geometría, combinatoria y teoría de números.'}
                      {key === 'QUÍMICA' && 'Realiza experimentos de química orgánica, inorgánica y analítica, comprendiendo reacciones y propiedades.'}
                      {key === 'ROBÓTICA' && 'Diseña, construye y programa robots autónomos para resolver desafíos técnicos y de ingeniería.'}
                    </p>

                    {/* Indicador de actividad */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: config.darkBg }}
                      />
                      <span className="text-xs font-medium text-muted-foreground">
                        Activa
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estadística total */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Total de eventos programados:
                </p>
              </div>
              <Badge className="bg-primary text-primary-foreground border-0 font-bold text-lg px-4 py-1.5">
                {eventos.length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
