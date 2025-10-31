import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Datos de ejemplo - reemplaza con tus propios datos
const eventosEjemplo = [
  {
    id: 1,
    fecha: '2025-10-15',
    titulo: 'Fase Clasificatoria',
    descripcion: 'Inicio de inscripciones',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    fecha: '2025-10-20',
    titulo: 'Semifinal',
    descripcion: 'Evaluación de proyectos',
    color: 'bg-green-500'
  },
  {
    id: 3,
    fecha: '2025-10-25',
    titulo: 'Final',
    descripcion: 'Presentación de trabajos',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    fecha: '2025-11-05',
    titulo: 'Premiación',
    descripcion: 'Ceremonia de cierre',
    color: 'bg-yellow-500'
  }
];

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventos] = useState(eventosEjemplo);
  const [selectedDate, setSelectedDate] = useState(null);

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDiasEnMes = (fecha: any) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getPrimerDiaMes = (fecha: any) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatearFecha = (year: any, month: any, day: any) => {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const obtenerEventosPorFecha = (fecha: any) => {
    return eventos.filter(evento => evento.fecha === fecha);
  };

  const mesAnterior = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const mesSiguiente = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderDias = () => {
    const diasEnMes = getDiasEnMes(currentDate);
    const primerDia = getPrimerDiaMes(currentDate);
    const dias = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Días vacíos al inicio
    for (let i = 0; i < primerDia; i++) {
      dias.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>);
    }

    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fechaStr = formatearFecha(year, month, dia);
      const eventosDelDia = obtenerEventosPorFecha(fechaStr);
      const esHoy = new Date().toDateString() === new Date(year, month, dia).toDateString();
      const estaSeleccionado = selectedDate === fechaStr;

      dias.push(
        <div
          key={dia}
          onClick={() => setSelectedDate(fechaStr)}
          className={`h-24 border border-gray-100 p-2 cursor-pointer transition-all hover:bg-gray-50 ${
            esHoy ? 'bg-blue-50 border-blue-300' : ''
          } ${estaSeleccionado ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className={`text-sm font-semibold mb-1 ${esHoy ? 'text-blue-600' : 'text-gray-700'}`}>
            {dia}
          </div>
          <div className="space-y-1 overflow-hidden">
            {eventosDelDia.slice(0, 2).map((evento) => (
              <div
                key={evento.id}
                className={`text-xs ${evento.color} text-white px-1 py-0.5 rounded truncate`}
              >
                {evento.titulo}
              </div>
            ))}
            {eventosDelDia.length > 2 && (
              <div className="text-xs text-gray-500">
                +{eventosDelDia.length - 2} más
              </div>
            )}
          </div>
        </div>
      );
    }

    return dias;
  };

  const eventosSeleccionados = selectedDate ? obtenerEventosPorFecha(selectedDate) : [];

  return (
    <div className="min-w-full mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Calendario de Eventos
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={mesAnterior}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-lg font-semibold min-w-[200px] text-center">
                {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <Button variant="outline" size="icon" onClick={mesSiguiente}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {diasSemana.map((dia) => (
              <div
                key={dia}
                className="text-center font-semibold text-sm text-gray-600 py-2"
              >
                {dia}
              </div>
            ))}
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-0 border-t border-l border-gray-200">
            {renderDias()}
          </div>

          {/* Leyenda */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="outline" className="bg-blue-50">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              Clasificatoria
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              Semifinal
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              Final
            </Badge>
            <Badge variant="outline" className="bg-yellow-50">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              Premiación
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Detalles de eventos seleccionados */}
      {selectedDate && eventosSeleccionados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Eventos del {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventosSeleccionados.map((evento) => (
                <div
                  key={evento.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-1 h-full ${evento.color} rounded`}></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{evento.titulo}</h4>
                    <p className="text-sm text-gray-600 mt-1">{evento.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}