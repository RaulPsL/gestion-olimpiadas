import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Participante } from './interfaces/ParticipantePDF';

// Función para generar a CSV usando PapaParse
export function generarCSV(
    participantes: Participante[],
    area: string,
): void {
  // Convertir datos a CSV
  const csv = Papa.unparse(participantes, {
    quotes: true,
    delimiter: ',',
    header: true,
    columns: ['id', 'nombre', 'email', 'telefono', 'ciudad', 'edad', 'activo', 'fechaRegistro']
  });

  // Crear blob y descargar
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `usuarios_${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log('CSV exportado exitosamente!');
}

// Función para generar a Excel usando XLSX
export function generarExcel(
    participantes: Participante[],
    area: string,
): void {
  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();

  // Convertir datos a hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(participantes);

  // Configurar anchos de columnas
  const columnWidths = [
    { wch: 5 },   // ID
    { wch: 20 },  // Nombre
    { wch: 25 },  // Email
    { wch: 15 },  // Teléfono
    { wch: 15 },  // Ciudad
    { wch: 8 },   // Edad
    { wch: 10 },  // Activo
    { wch: 15 }   // Fecha Registro
  ];
  worksheet['!cols'] = columnWidths;

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

  // Exportar el archivo
  XLSX.writeFile(workbook, `usuarios_${Date.now()}.xlsx`);
  
  console.log('Excel exportado exitosamente!');
}

// Función para generar múltiples hojas en Excel
export function generarExcelMultiplesHojas(
    participantes: Participante[],
    area: string,
): void {
  const workbook = XLSX.utils.book_new();

  // Hoja 1: Todos los usuarios
  const worksheet1 = XLSX.utils.json_to_sheet(participantes);
  worksheet1['!cols'] = [
    { wch: 5 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, 
    { wch: 15 }, { wch: 8 }, { wch: 10 }, { wch: 15 }
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet1, 'Todos los Usuarios');

  // Hoja 2: Solo usuarios activos
  const participantesActivos = participantes.filter(u => u.activo);
  const worksheet2 = XLSX.utils.json_to_sheet(participantesActivos);
  worksheet2['!cols'] = [
    { wch: 5 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, 
    { wch: 15 }, { wch: 8 }, { wch: 10 }, { wch: 15 }
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet2, 'Usuarios Activos');

  // Hoja 3: Estadísticas
  const estadisticas = [
    { Métrica: 'Total Usuarios', Valor: participantes.length },
    { Métrica: 'Usuarios Activos', Valor: participantesActivos.length },
    { Métrica: 'Usuarios Inactivos', Valor: participantes.filter(u => !u.activo).length },
    { Métrica: 'Edad Promedio', Valor: Math.round(participantes.reduce((sum, u) => sum + u.edad, 0) / participantes.length) }
  ];
  const worksheet3 = XLSX.utils.json_to_sheet(estadisticas);
  worksheet3['!cols'] = [{ wch: 20 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, worksheet3, 'Estadísticas');

  // Exportar el archivo
  XLSX.writeFile(workbook, `reporte_estado_de_participantes_${Date.now()}.xlsx`);
  
}
