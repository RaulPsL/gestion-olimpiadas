import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Usuario } from './interfaces/UsuarioPDF';
import { Participante } from './interfaces/ParticipantePDF';

// Función para generar el PDF
export function generarListaPDF(
  usuarios: Usuario[] | Participante[],
  area?: string,
  tipoPdf?: string,
  olimpistas?: boolean,
): void {
  // Crear nueva instancia de jsPDF
  const doc = new jsPDF();

  // Agregar título
  doc.setFontSize(18);
  doc.text(`Lista de ${ tipoPdf }`, 14, 20);

  // Agregar fecha
  doc.setFontSize(11);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 30);

  // Preparar datos para la tabla
  const headersUsuario = [['CI','Nombre completo','Área que gestiona/evalua','Rol usuario','Fases que gestiona/evalua',]];

  const headersParticipante = [['Participante', 'Puesto', 'Nivel', 'Tutor', 'Encargado', 'Colegio', 'Departamento']];

  let dataUsuario = [];

  let dataParticipante = [];

  let columnsStyles = {};

  if (!olimpistas) {
    dataUsuario = (usuarios as Usuario[]).map((usuario) => [
      usuario.ci,
      usuario.nombre,
      usuario.area,
      usuario.rol,
      usuario.fases,
    ]);

    columnsStyles = {
      0: { cellWidth: 15 },
      1: { cellWidth: 45 },
      2: { cellWidth: 15 },
      3: { cellWidth: 15 },
      4: { cellWidth: 45 }
    };
  }

  if (olimpistas) {
    dataUsuario = (usuarios as Participante[]).map((usuario) => [
      usuario.nombre,
      usuario.colegio,
      area,
      usuario.nivel,
      usuario.puesto,
    ]);

    columnsStyles = {
      0: { cellWidth: 45 },
      1: { cellWidth: 45 },
      2: { cellWidth: 15 },
      3: { cellWidth: 15 },
      4: { cellWidth: 10 }
    };
  }

  // Generar tabla con autoTable
  autoTable(doc, {
    head: olimpistas ? headersParticipante : headersUsuario,
    body: olimpistas ? dataParticipante : dataUsuario,
    startY: 35,
    theme: 'striped',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    columnStyles: columnsStyles,
  });

  // Agregar pie de página
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  };

  doc.save('reporte-empleados.pdf');
}
