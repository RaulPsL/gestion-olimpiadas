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
export function generarExcelMultiplesHojas({
  usuarios,
  area,
  tipoPdf,
  olimpistas,
} : {
  usuarios: any,
  area?: string,
  tipoPdf?: string,
  olimpistas?: boolean,
}): void {
  const workbook = XLSX.utils.book_new();
  console.log('usuarios', usuarios)
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
  XLSX.writeFile(workbook, `reporte_estado_de_participantes_${Date.now()}.xlsx`);
  
}
