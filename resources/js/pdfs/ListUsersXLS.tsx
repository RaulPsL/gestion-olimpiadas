import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Participante } from './interfaces/ParticipantePDF';
import { Usuario } from './interfaces/UsuarioPDF';

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
  usuarios: any,
  nombreHoja: string,
): void {
  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();

  // Convertir datos a hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(usuarios);

  // Configurar anchos de columnas
  const columnWidths = [
    { wch: 5 },
    { wch: 20 }, 
    { wch: 25 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 8 },
    { wch: 10 }, 
    { wch: 15 }  
  ];
  worksheet['!cols'] = columnWidths;

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja);

  // Exportar el archivo
  XLSX.writeFile(workbook, `${nombreHoja}_${Date.now()}.xlsx`);
  
  console.log('Excel exportado exitosamente!');
}

// Función para generar múltiples hojas en Excel
export function generarExcelMultiplesHojas(
  usuarios: any,
  nombreArchivo: string
): void {
  const workbook = XLSX.utils.book_new();

  Object.keys(usuarios).map((key) => {
    const worksheet1 = XLSX.utils.json_to_sheet(usuarios[key]);
    worksheet1['!cols'] = [
      { wch: 5 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, 
      { wch: 15 }, { wch: 8 }, { wch: 10 }, { wch: 15 },
      { wch: 15 }, { wch: 8 }, { wch: 10 }, { wch: 15 }
    ];
    XLSX.utils.book_append_sheet(workbook, worksheet1, key);
  });

  // Exportar el archivo
  XLSX.writeFile(workbook, `reporte_${nombreArchivo}_${Date.now()}.xlsx`);
  
}
