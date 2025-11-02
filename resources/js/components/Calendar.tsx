import React, { useState, useCallback } from 'react';
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
import { CalendarDays, Clock, MapPin, Users, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getCalendario } from '@/api/Fases';

// Configurar moment en español
moment.locale('es');
const localizer = momentLocalizer(moment);

// Interfaces usando los tipos de react-big-calendar
interface CustomEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  calificacion?: Date; // Agregamos el tiempo de calificación
  resource?: {
    area: string;
    participants: number;
    location: string;
    description: string;
    type: 'preliminares' | 'clasificatorias' | 'finales';
  };
}

interface AreaColors {
  [key: string]: {
    color: string;
    bg: string;
    label: string;
  };
}

// Colores por área
const coloresPorArea: AreaColors = {
  'ASTRONOMÍA - ASTROFÍSICA': { color: '#8b5cf6', bg: '#ede9fe', label: 'Astronomía' },
  'BIOLOGÍA': { color: '#10b981', bg: '#d1fae5', label: 'Biología' },
  'FÍSICA': { color: '#3b82f6', bg: '#dbeafe', label: 'Física' },
  'INFORMÁTICA': { color: '#06b6d4', bg: '#cffafe', label: 'Informática' },
  'MATEMÁTICAS': { color: '#f59e0b', bg: '#fef3c7', label: 'Matemáticas' },
  'QUÍMICA': { color: '#f97316', bg: '#fed7aa', label: 'Química' },
  'ROBÓTICA': { color: '#ec4899', bg: '#fce7f3', label: 'Robótica' },
  'Electrónica': { color: '#eab308', bg: '#fef9c3', label: 'Electrónica' },
};

// Componente personalizado para eventos con tiempo de calificación
const CustomEventComponent = ({ event }: { event: CustomEvent }) => {
  const startTime = moment(event.start);
  const endTime = moment(event.end);
  const calificacionTime = event.calificacion ? moment(event.calificacion) : null;
  
  // Calcular el porcentaje de posición de la línea de calificación
  let percentage = -1;
  if (calificacionTime) {
    const totalDuration = endTime.diff(startTime);
    const calificacionPosition = calificacionTime.diff(startTime);
    percentage = (calificacionPosition / totalDuration) * 100;
  }
  
  return (
    <div className="relative h-full w-full p-1">
      <div className="text-xs font-semibold truncate">
        {event.title}
      </div>
      <div className="text-[10px] text-white/80">
        {startTime.format('HH:mm')} - {endTime.format('HH:mm')}
      </div>
      {calificacionTime && percentage >= 0 && percentage <= 100 && (
        <div
          className="absolute left-0 right-0 border-t-2 border-white border-dashed"
          style={{ 
            top: `${percentage}%`,
            opacity: 0.8
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

// Eventos de ejemplo
const eventosIniciales: CustomEvent[] = [
  {
    id: 1,
    title: 'ROBOTICA - Construcción Avanzada',
    start: new Date(2025, 10, 3, 9, 0),
    calificacion: new Date(2025, 10, 3, 10, 30), // Calificación a las 10:30 AM
    end: new Date(2025, 10, 3, 12, 0),
    resource: {
      area: 'ROBOTICA',
      participants: 25,
      location: 'Laboratorio 1',
      description: 'Construcción de robots avanzados',
      type: 'clasificatorias'
    }
  },
  {
    id: 2,
    title: 'FISICA - Mecánica Clásica',
    start: new Date(2025, 10, 3, 14, 0),
    calificacion: new Date(2025, 10, 3, 15, 30), // Calificación a las 3:30 PM
    end: new Date(2025, 10, 3, 17, 0),
    resource: {
      area: 'FISICA',
      participants: 30,
      location: 'Aula 301',
      description: 'Examen de mecánica clásica',
      type: 'preliminares'
    }
  },
  {
    id: 3,
    title: 'MATEMATICAS - Álgebra Superior',
    start: new Date(2025, 10, 4, 10, 0),
    calificacion: new Date(2025, 10, 4, 11, 0), // Calificación a las 11:00 AM
    end: new Date(2025, 10, 4, 13, 0),
    resource: {
      area: 'MATEMATICAS',
      participants: 40,
      location: 'Auditorio',
      description: 'Competencia de álgebra',
      type: 'finales'
    }
  },
  {
    id: 4,
    title: 'BIOLOGIA - Genética Molecular',
    start: new Date(2025, 10, 5, 8, 0),
    calificacion: new Date(2025, 10, 5, 9, 30), // Calificación a las 9:30 AM
    end: new Date(2025, 10, 5, 11, 0),
    resource: {
      area: 'BIOLOGIA',
      participants: 20,
      location: 'Laboratorio Bio',
      description: 'Análisis de ADN',
      type: 'clasificatorias'
    }
  },
  {
    id: 5,
    title: 'INFORMATICA - Programación Competitiva',
    start: new Date(2025, 10, 6, 13, 0),
    calificacion: new Date(2025, 10, 6, 15, 30), // Calificación a las 3:30 PM
    end: new Date(2025, 10, 6, 18, 0),
    resource: {
      area: 'INFORMATICA',
      participants: 35,
      location: 'Centro de Cómputo',
      description: 'Maratón de programación',
      type: 'finales'
    }
  },
  {
    id: 6,
    title: 'QUIMICA - Reacciones Orgánicas',
    start: new Date(2025, 10, 7, 9, 30),
    calificacion: new Date(2025, 10, 7, 11, 0), // Calificación a las 11:00 AM
    end: new Date(2025, 10, 7, 12, 30),
    resource: {
      area: 'QUIMICA',
      participants: 18,
      location: 'Lab Química',
      description: 'Síntesis orgánica',
      type: 'preliminares'
    }
  }
];

export default function TypedCalendar() {
  const [eventos, setEventos] = useState<CustomEvent[]>(eventosIniciales);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [view, setView] = useState<View>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

    React.useEffect(() => {
    const staticCalendar = async () => {
      const events = await getCalendario();
      const nuevosEventos = events.map((event: any) => {
        // Convertir las fechas ISO a objetos Date
        let startDate = new Date(event.start);
        let endDate = new Date(event.end);
        const calificacionDate = new Date(event.calificacion);
        
        // Si el evento no tiene hora específica (está a las 00:00), asignar horarios por defecto
        if (startDate.getHours() === 0 && startDate.getMinutes() === 0) {
          // Asignar hora de inicio: 8:00 AM
          startDate.setHours(8, 0, 0, 0);
        }
        
        if (endDate.getHours() === 0 && endDate.getMinutes() === 0) {
          // Asignar hora de fin: 12:00 PM (4 horas después del inicio)
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

  // Mensajes en español
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

  // Estilo de eventos
  const eventStyleGetter = useCallback((event: CustomEvent) => {
    const area = event.resource?.area || 'FISICA';
    const areaConfig = coloresPorArea[area];
    
    return {
      style: {
        backgroundColor: areaConfig?.color || '#6b7280',
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontWeight: '500',
        fontSize: '0.875rem',
        padding: '4px 8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }
    };
  }, []);

  // Manejar selección de evento
  const handleSelectEvent = useCallback((event: CustomEvent) => {
    setSelectedEvent(event);
  }, []);

  // Manejar selección de slot (para crear nuevo evento)
  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log('Slot seleccionado:', slotInfo);
    // Aquí podrías abrir un modal para crear un nuevo evento
  }, []);

  // Manejar navegación
  const handleNavigate = useCallback((newDate: Date, view: View, action: NavigateAction) => {
    console.log('Navegando a:', newDate, 'Vista:', view, 'Acción:', action);
    setCurrentDate(newDate);
  }, []);

  // Manejar cambio de vista
  const handleViewChange = useCallback((newView: View) => {
    console.log('Cambio de vista a:', newView);
    setView(newView);
  }, []);

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      {/* Leyenda y controles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Calendario de Olimpiadas Científicas
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Áreas de Competencia:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(coloresPorArea).map(([key, config]) => (
                  <Badge
                    key={key}
                    variant="outline"
                    style={{ backgroundColor: config.bg, borderColor: config.color }}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div
                      className="w-3 h-3 rounded mr-2"
                      style={{ backgroundColor: config.color }}
                    ></div>
                    {config.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Total de eventos: <span className="text-blue-600">{eventos.length}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendario */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <style>
            {`
              .rbc-calendar {
                font-family: inherit;
              }
              .rbc-header {
                padding: 12px 4px;
                font-weight: 600;
                font-size: 0.875rem;
                color: #374151;
                border-bottom: 2px solid #e5e7eb;
                background: #f9fafb;
              }
              .rbc-today {
                background-color: #eff6ff;
              }
              .rbc-off-range-bg {
                background-color: #f9fafb;
              }
              .rbc-date-cell {
                padding: 8px;
                font-weight: 500;
              }
              .rbc-now .rbc-button-link {
                color: #2563eb;
                font-weight: 700;
              }
              .rbc-day-slot .rbc-time-slot {
                border-top: 1px solid #f3f4f6;
              }
              .rbc-time-header-content {
                border-left: 1px solid #e5e7eb;
              }
              .rbc-time-content {
                border-top: 2px solid #e5e7eb;
              }
              .rbc-timeslot-group {
                min-height: 60px;
              }
              .rbc-event {
                cursor: pointer;
                transition: all 0.2s;
                overflow: visible !important;
              }
              .rbc-event:hover {
                opacity: 1 !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2) !important;
                z-index: 10;
              }
              .rbc-event-content {
                height: 100%;
                overflow: visible !important;
              }
              .rbc-event-label {
                font-size: 0.75rem;
              }
              .rbc-btn-group button {
                padding: 8px 16px;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
                background: white;
                color: #374151;
                font-weight: 500;
                transition: all 0.2s;
              }
              .rbc-btn-group button:hover {
                background: #f3f4f6;
                border-color: #d1d5db;
              }
              .rbc-btn-group button.rbc-active {
                background: #1f2937;
                color: white;
                border-color: #1f2937;
              }
              .rbc-toolbar {
                padding: 16px 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
              }
              .rbc-toolbar-label {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1f2937;
              }
            `}
          </style>
          <Calendar<CustomEvent>
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 650 }}
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
            tooltipAccessor={(event) => `${event.title} - ${event.resource?.location || ''}`}
            components={{
              event: CustomEventComponent
            }}
          />
        </CardContent>
      </Card>

      {/* Dialog de detalles del evento */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="flex gap-2 mt-2">
                {selectedEvent?.resource?.area && (
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: coloresPorArea[selectedEvent.resource.area]?.bg,
                      borderColor: coloresPorArea[selectedEvent.resource.area]?.color
                    }}
                  >
                    {coloresPorArea[selectedEvent.resource.area]?.label}
                  </Badge>
                )}
                {selectedEvent?.resource?.type && (
                  <Badge variant="outline">
                    {selectedEvent.resource.type === 'preliminares' && 'Preliminares'}
                    {selectedEvent.resource.type === 'clasificatorias' && 'Clasificatorias'}
                    {selectedEvent.resource.type === 'finales' && 'Finales'}
                  </Badge>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-700">Horario</p>
                  <p className="text-sm text-gray-600">
                    {moment(selectedEvent.start).format('dddd, DD MMMM YYYY')}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Inicio:</span> {moment(selectedEvent.start).format('HH:mm')}
                    </p>
                    {selectedEvent.calificacion && (
                      <p className="text-sm text-blue-600 font-medium">
                        <span className="font-semibold">📝 Calificación:</span> {moment(selectedEvent.calificacion).format('HH:mm')}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Fin:</span> {moment(selectedEvent.end).format('HH:mm')}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Duración total: {moment(selectedEvent.end).diff(moment(selectedEvent.start), 'hours')} horas
                  </p>
                </div>
              </div>

              {selectedEvent.resource?.location && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">Ubicación</p>
                    <p className="text-sm text-gray-600">{selectedEvent.resource.location}</p>
                  </div>
                </div>
              )}

              {selectedEvent.resource?.participants && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">Participantes</p>
                    <p className="text-sm text-gray-600">{selectedEvent.resource.participants} estudiantes</p>
                  </div>
                </div>
              )}

              {selectedEvent.resource?.description && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-sm text-blue-900 mb-1">Descripción</p>
                  <p className="text-sm text-blue-800">{selectedEvent.resource.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}