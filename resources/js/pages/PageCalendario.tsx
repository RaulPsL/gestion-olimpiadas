import React, { useState, useCallback, useEffect } from 'react';
import {
    Calendar,
    momentLocalizer,
    View,
    Event,
    SlotInfo,
    NavigateAction
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CalendarDays,
    Clock,
    MapPin,
    Users,
    Sparkles,
    Dna,
    Atom,
    Code,
    Calculator,
    Beaker,
    Bot,
    CheckCircle2,
    Clock3,
    PlayCircle,
    Play,
    StopCircle
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { getCalendario } from '@/api/Fases';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';

// Configurar moment en español
moment.locale('es');
const localizer = momentLocalizer(moment);

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

// Configuración de estados de fase (actualizados)
const estadosFase = {
    'en curso': {
        label: 'En Curso',
        icon: PlayCircle,
        color: '#10b981',
        darkBg: '#059669'
    },
    'finalizada': {
        label: 'Finalizada',
        icon: CheckCircle2,
        color: '#3b82f6',
        darkBg: '#2563eb'
    },
    'pendiente': {
        label: 'Pendiente',
        icon: Clock3,
        color: '#f59e0b',
        darkBg: '#d97706'
    }
};

// Componente personalizado para eventos
const CustomEventComponent = ({ event }: { event: CustomEvent }) => {
    const startTime = moment(event.start);
    const endTime = moment(event.end);
    const calificacionTime = event.calificacion ? moment(event.calificacion) : null;

    let percentage = -1;
    if (calificacionTime) {
        const totalDuration = endTime.diff(startTime);
        const calificacionPosition = calificacionTime.diff(startTime);
        percentage = (calificacionPosition / totalDuration) * 100;
    }

    return (
        <div className="relative h-full w-full p-1">
            <div className="text-xs font-semibold truncate capitalize">
                {event.title}
            </div>
            <div className="text-[10px] text-white/90">
                {startTime.format('HH:mm')} - {endTime.format('HH:mm')}
            </div>
            {calificacionTime && percentage >= 0 && percentage <= 100 && (
                <div
                    className="absolute left-0 right-0 border-t-2 border-white/70 border-dashed"
                    style={{
                        top: `${percentage}%`,
                        opacity: 0.9
                    }}
                    title={`Calificación: ${calificacionTime.format('HH:mm')}`}
                >
                    <div className="absolute right-1 -top-2.5 bg-white text-gray-800 text-[9px] px-1 py-0.5 rounded shadow-sm font-semibold whitespace-nowrap">
                        📝 {calificacionTime.format('HH:mm')}
                    </div>
                </div>
            )}
        </div>
    );
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

export default function CustomCalendar() {
    const [eventos, setEventos] = useState<CustomEvent[]>(eventosIniciales);
    const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
    const [view, setView] = useState<View>('week');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    // Actualizar el tiempo cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Función para calcular el tiempo restante
    const getTimeRemaining = (endDate: Date) => {
        const total = endDate.getTime() - currentTime.getTime();
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        return { total, hours, minutes, seconds };
    };

    // Función para calcular tiempo hasta el inicio
    const getTimeUntilStart = (startDate: Date) => {
        const total = startDate.getTime() - currentTime.getTime();
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        return { total, days, hours, minutes, seconds };
    };

    // Filtrar eventos del día actual
    const eventosHoy = eventos.filter(evento => {
        const eventoDate = moment(evento.start);
        const today = moment();
        return eventoDate.isSame(today, 'day');
    });

    // Filtrar eventos del día siguiente
    const eventosSiguiente = eventos.filter(evento => {
        const eventoDate = moment(evento.start);
        const tomorrow = moment().add(1, 'day');
        return eventoDate.isSame(tomorrow, 'day');
    });

    React.useEffect(() => {
        const staticCalendar = async () => {
            const events = await getCalendario();
            const nuevosEventos = events.map((event: any) => {
                let startDate = new Date(event.start);
                let endDate = new Date(event.end);
                const calificacionDate = new Date(event.calificacion);

                if (startDate.getHours() === 0 && startDate.getMinutes() === 0) {
                    startDate.setHours(8, 0, 0, 0);
                }

                if (endDate.getHours() === 0 && endDate.getMinutes() === 0) {
                    endDate.setHours(12, 0, 0, 0);
                }

                return {
                    ...event,
                    start: startDate,
                    end: endDate,
                    calificacion: calificacionDate
                };
            });
            setEventos(nuevosEventos);
        };
        staticCalendar();
    }, []);

    const messages = {
        allDay: 'Todo el día',
        previous: 'Anterior',
        next: 'Siguiente',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: (total: number) => `+ Ver más (${total})`
    };

    const eventStyleGetter = useCallback((event: CustomEvent) => {
        const area = event.resource?.area || 'FÍSICA';
        const areaConfig = coloresPorArea[area];

        return {
            style: {
                backgroundColor: areaConfig?.darkBg || '#6b7280',
                borderRadius: '8px',
                opacity: 0.95,
                color: 'white',
                border: 'none',
                display: 'block',
                fontWeight: '600',
                fontSize: '0.875rem',
                padding: '6px 10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }
        };
    }, []);

    const handleSelectEvent = useCallback((event: CustomEvent) => {
        setSelectedEvent(event);
    }, []);

    const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
        console.log('Slot seleccionado:', slotInfo);
    }, []);

    const handleNavigate = useCallback((newDate: Date, view: View, action: NavigateAction) => {
        setCurrentDate(newDate);
    }, []);

    const handleViewChange = useCallback((newView: View) => {
        setView(newView);
    }, []);

    return (
        <Carousel className="w-full flex overflow-x-hidden relative group">
            <CarouselContent className="flex w-full items-center">
                <CarouselItem key={'fases-hoy'} className="w-full flex-shrink-0">
                    <Card className="shadow-premium border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-50" />

                        <CardHeader className="relative z-10 pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                <PlayCircle className="h-5 w-5 text-green-500" />
                                Fases de Hoy - {moment().format('dddd, DD MMMM YYYY')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 overflow-y-auto">
                            <div className="grid gap-3 md:grid-cols-2">
                                {
                                    eventosHoy.length > 0 ? eventosHoy.map((evento) => {
                                        const areaConfig = coloresPorArea[evento.resource?.area || 'FÍSICA'];
                                        const AreaIcon = areaConfig?.icon;
                                        const isOngoing = currentTime >= evento.start && currentTime <= evento.end;
                                        const passEvent = currentTime >= evento.end;
                                        const timeRemaining = isOngoing ? getTimeRemaining(evento.end) : null;

                                        return (
                                            <div
                                                key={evento.id}
                                                className={`p-3 rounded-lg border-2 transition-all duration-300 ${isOngoing
                                                    ? 'bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/20'
                                                    : (passEvent ? 
                                                        'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/20' 
                                                        : 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/20')
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {AreaIcon && <AreaIcon className="h-5 w-5" style={{ color: areaConfig?.darkBg }} />}
                                                        <h3 className="font-bold text-sm capitalize">{evento.title}</h3>
                                                    </div>
                                                    <Badge className={`${isOngoing ? "bg-green-500 animate-pulse" : (passEvent ? "bg-red-500" : "bg-blue-500")} text-white border-0 shadow-sm`}>
                                                        {isOngoing ? "En Curso" : (passEvent ? "Finalizada" : "Pendiente")}
                                                    </Badge>

                                                </div>

                                                <div className="space-y-1.5 text-sm">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{moment(evento.start).format('HH:mm')} - {moment(evento.end).format('HH:mm')}</span>
                                                    </div>

                                                    {evento.resource?.location && (
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{evento.resource.location}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Users className="h-4 w-4" />
                                                        <span>{evento?.resource?.participants ?? 0} estudiantes</span>
                                                    </div>
                                                </div>

                                                {isOngoing && timeRemaining && timeRemaining.total > 0 && (
                                                    <div className="mt-3 p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                                                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">Tiempo restante:</p>
                                                        <div className="flex items-center justify-center gap-1.5 animate-pulse">
                                                            <div className="text-center">
                                                                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                                                    {String(timeRemaining.hours).padStart(2, '0')}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">horas</div>
                                                            </div>
                                                            <div className="text-xl font-bold text-green-600 dark:text-green-400">:</div>
                                                            <div className="text-center">
                                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                                    {String(timeRemaining.minutes).padStart(2, '0')}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">min</div>
                                                            </div>
                                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">:</div>
                                                            <div className="text-center">
                                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                                    {String(timeRemaining.seconds).padStart(2, '0')}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">seg</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }) : (
                                        <>
                                            No se tienen fases aun
                                        </>
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem key={'fase-maña'} className="w-full flex-shrink-0">
                    <Card className="shadow-premium border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-50" />

                        <CardHeader className="relative z-10 pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                <Clock3 className="h-5 w-5 text-blue-500" />
                                Fases de Mañana - {moment().add(1, 'day').format('dddd, DD MMMM YYYY')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 overflow-y-auto">
                            {eventosSiguiente.length > 0 ?
                                <div className="grid gap-3 md:grid-cols-2">
                                    {eventosSiguiente.map((evento) => {
                                        const areaConfig = coloresPorArea[evento.resource?.area || 'FÍSICA'];
                                        const AreaIcon = areaConfig?.icon;
                                        const timeUntilStart = getTimeUntilStart(evento.start);

                                        return (
                                            <div
                                                key={evento.id}
                                                className="p-3 rounded-lg border-2 bg-blue-500/5 border-blue-500/30 transition-all duration-300 hover:shadow-lg"
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {AreaIcon && <AreaIcon className="h-5 w-5" style={{ color: areaConfig?.darkBg }} />}
                                                        <h3 className="font-bold text-sm capitalize">{evento.title}</h3>
                                                    </div>
                                                    <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 font-semibold">
                                                        Próxima
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1.5 text-sm">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{moment(evento.start).format('HH:mm')} - {moment(evento.end).format('HH:mm')}</span>
                                                    </div>

                                                    {evento.resource?.location && (
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{evento.resource.location}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Users className="h-4 w-4" />
                                                        <span>{evento?.resource?.participants ?? 0} estudiantes</span>
                                                    </div>
                                                </div>

                                                {timeUntilStart.total > 0 && (
                                                    <div className="mt-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">Comienza en:</p>
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {timeUntilStart.days > 0 && (
                                                                <>
                                                                    <div className="text-center">
                                                                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                                            {String(timeUntilStart.days).padStart(2, '0')}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground">días</div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">:</div>
                                                                </>
                                                            )}
                                                            <div className="text-center">
                                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                                    {String(timeUntilStart.hours).padStart(2, '0')}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">horas</div>
                                                            </div>
                                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">:</div>
                                                            <div className="text-center">
                                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                                    {String(timeUntilStart.minutes).padStart(2, '0')}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">min</div>
                                                            </div>
                                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">:</div>
                                                            <div className="text-center">
                                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                                    {String(timeUntilStart.seconds).padStart(2, '0')}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">seg</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                : <>
                                    No se tienen fases aun
                                </>
                            }

                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem key={'calendario'}>

                    <Card className="shadow-premium-lg border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-30" />

                        <CardContent className="p-6 relative z-10">
                            <style>
                                {`
              .rbc-calendar {
                font-family: inherit;
                border-radius: 12px;
                overflow: hidden;
              }
              .rbc-header {
                padding: 16px 8px;
                font-weight: 700;
                font-size: 0.875rem;
                color: hsl(var(--foreground));
                border-bottom: 2px solid hsl(var(--border));
                background: hsl(var(--muted));
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .rbc-today {
                background-color: hsl(var(--primary) / 0.08);
              }
              .rbc-off-range-bg {
                background-color: hsl(var(--muted) / 0.3);
              }
              .rbc-date-cell {
                padding: 10px;
                font-weight: 600;
                color: hsl(var(--foreground));
              }
              .rbc-now .rbc-button-link {
                color: hsl(var(--primary));
                font-weight: 800;
              }
              .rbc-day-slot .rbc-time-slot {
                border-top: 1px solid hsl(var(--border) / 0.5);
              }
              .rbc-time-header-content {
                border-left: 1px solid hsl(var(--border));
              }
              .rbc-time-content {
                border-top: 2px solid hsl(var(--border));
                background: hsl(var(--background));
              }
              .rbc-timeslot-group {
                min-height: 65px;
                border-left: 1px solid hsl(var(--border) / 0.3);
              }
              .rbc-time-slot {
                color: hsl(var(--muted-foreground));
                font-size: 0.75rem;
                font-weight: 500;
              }
              .rbc-label {
                padding: 8px;
                font-weight: 600;
                color: hsl(var(--muted-foreground));
              }
              .rbc-event {
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: visible !important;
              }
              .rbc-event:hover {
                opacity: 1 !important;
                transform: translateY(-2px) scale(1.02);
                box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.3) !important;
                z-index: 10;
              }
              .rbc-event-content {
                height: 100%;
                overflow: visible !important;
              }
              .rbc-event-label {
                font-size: 0.75rem;
                font-weight: 600;
              }
              .rbc-btn-group button {
                padding: 10px 20px;
                border-radius: 8px;
                border: 1px solid hsl(var(--border));
                background: hsl(var(--background));
                color: hsl(var(--foreground));
                font-weight: 600;
                font-size: 0.875rem;
                transition: all 0.2s;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
              }
              .rbc-btn-group button:hover {
                background: hsl(var(--muted));
                border-color: hsl(var(--primary) / 0.5);
                transform: translateY(-1px);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              .rbc-btn-group button.rbc-active {
                background: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                border-color: hsl(var(--primary));
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
              }
              .rbc-toolbar {
                padding: 20px 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
                margin-bottom: 16px;
              }
              .rbc-toolbar-label {
                font-size: 1.5rem;
                font-weight: 800;
                color: hsl(var(--foreground));
                background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .rbc-month-view, .rbc-time-view {
                border: 1px solid hsl(var(--border));
                border-radius: 12px;
                overflow: hidden;
                background: hsl(var(--card));
              }
              .rbc-day-bg {
                transition: background-color 0.2s;
              }
              .rbc-day-bg:hover {
                background-color: hsl(var(--muted) / 0.5) !important;
              }
            `}
                            </style>
                            <Calendar<CustomEvent>
                                localizer={localizer}
                                events={eventos}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 700 }}
                                messages={messages}
                                eventPropGetter={eventStyleGetter}
                                onSelectEvent={handleSelectEvent}
                                onSelectSlot={handleSelectSlot}
                                onNavigate={handleNavigate}
                                onView={handleViewChange}
                                view={view}
                                date={currentDate}
                                views={['month', 'week', 'day', 'agenda']}
                                defaultView="week"
                                selectable
                                popup
                                min={new Date(0, 0, 0, 6, 0, 0)}
                                max={new Date(0, 0, 0, 22, 0, 0)}
                                step={30}
                                timeslots={2}
                                showMultiDayTimes
                                tooltipAccessor={(event: any) => `${event.title} - ${event.resource?.location || ''}`}
                                components={{
                                    event: CustomEventComponent
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Dialog mejorado con badges de estado e iconos */}
                    <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                        <DialogContent className="sm:max-w-[550px] border-border/50 bg-card/95 backdrop-blur-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-lg" />

                            <DialogHeader className="relative z-10">
                                <DialogTitle className="flex items-center gap-2 text-2xl font-bold capitalize">
                                    {selectedEvent?.title}
                                </DialogTitle>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {selectedEvent?.resource?.area && (() => {
                                        const areaConfig = coloresPorArea[selectedEvent.resource.area];
                                        const AreaIcon = areaConfig?.icon;
                                        return (
                                            <Badge
                                                className="font-semibold text-white border-0 shadow-sm"
                                                style={{
                                                    backgroundColor: areaConfig?.darkBg,
                                                }}
                                            >
                                                {AreaIcon && <AreaIcon className="w-3.5 h-3.5 mr-1.5" />}
                                                {areaConfig?.label}
                                            </Badge>
                                        );
                                    })()}

                                    {selectedEvent?.resource?.type && (
                                        <Badge className="bg-secondary/20 text-secondary border-secondary/30 font-semibold">
                                            {selectedEvent.resource.type === 'preliminares' && 'Preliminares'}
                                            {selectedEvent.resource.type === 'clasificatorias' && 'Clasificatorias'}
                                            {selectedEvent.resource.type === 'finales' && 'Finales'}
                                        </Badge>
                                    )}

                                    {selectedEvent?.resource?.state_fase && (() => {
                                        const estadoConfig = estadosFase[selectedEvent.resource.state_fase as keyof typeof estadosFase];
                                        const EstadoIcon = estadoConfig?.icon;
                                        const isEnCurso = selectedEvent.resource.state_fase === 'en curso';
                                        return estadoConfig ? (
                                            <Badge
                                                className={`font-semibold text-white border-0 shadow-sm ${isEnCurso ? 'animate-pulse' : ''
                                                    }`}
                                                style={{
                                                    backgroundColor: estadoConfig.darkBg,
                                                }}
                                            >
                                                {EstadoIcon && <EstadoIcon className="w-3.5 h-3.5 mr-1.5" />}
                                                {estadoConfig.label}
                                            </Badge>
                                        ) : null;
                                    })()}
                                </div>
                            </DialogHeader>
                            {selectedEvent && (
                                <div className="space-y-4 mt-4 relative z-10">
                                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-foreground">Horario</p>
                                            <p className="text-sm text-muted-foreground mt-1 capitalize">
                                                {moment(selectedEvent.start).format('dddd, DD MMMM YYYY')}
                                            </p>
                                            <div className="mt-3 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Play className="h-4 w-4 text-success flex-shrink-0" />
                                                    <p className="text-sm text-foreground">
                                                        <span className="font-semibold">Inicio:</span> {moment(selectedEvent.start).format('HH:mm')}
                                                    </p>
                                                </div>
                                                {selectedEvent.calificacion && (
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm text-primary font-semibold">
                                                            <span className="font-bold">📝 Calificación:</span> {moment(selectedEvent.calificacion).format('HH:mm')}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <StopCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                                                    <p className="text-sm text-foreground">
                                                        <span className="font-semibold">Fin:</span> {moment(selectedEvent.end).format('HH:mm')}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-3 font-medium">
                                                Duración total: {moment(selectedEvent.end).diff(moment(selectedEvent.start), 'hours')} horas
                                            </p>
                                        </div>
                                    </div>

                                    {selectedEvent.resource?.location && (
                                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                                            <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-sm text-foreground">Ubicación</p>
                                                <p className="text-sm text-muted-foreground mt-1">{selectedEvent.resource.location}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                                        <Users className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-sm text-foreground">Participantes</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {selectedEvent.resource?.participants || 0} estudiantes
                                            </p>
                                        </div>
                                    </div>

                                    {selectedEvent.resource?.description && (
                                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                                            <p className="font-bold text-sm text-primary mb-2">Descripción</p>
                                            <p className="text-sm text-foreground capitalize">{selectedEvent.resource.description}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </CarouselItem>

            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 shadow-lg" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 shadow-lg" />
        </Carousel>
    );
}

export function PageCalendario() {
    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <CustomCalendar />
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}
