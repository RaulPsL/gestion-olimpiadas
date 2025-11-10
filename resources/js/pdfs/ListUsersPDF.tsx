import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Usuario } from './interfaces/UsuarioPDF';
import { Participante } from './interfaces/ParticipantePDF';
import React from 'react';

// Función para generar el PDF
export function generarListaPDF({
  usuarios,
  area,
  tipoPdf,
  olimpistas,
}: {
  usuarios: any,
  area?: string,
  tipoPdf?: string,
  olimpistas?: boolean,
}): void {
  // Crear nueva instancia de jsPDF
  const doc = new jsPDF();

  // Preparar headers
  const headersUsuario = [['CI', 'Nombre completo', 'Área que gestiona/evalua', 'Rol usuario', 'Fases que gestiona/evalua']];
  const headersParticipante = [['Apellidos', 'Nombres', 'Colegio', 'Departamento', 'Provincia']];

  // Agregar título principal
  doc.setFontSize(18);
  // doc.text(`Lista de ${tipoPdf}`, 14, 20);

  // Agregar fecha
  doc.setFontSize(11);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 30);

  // Variable para controlar la posición Y actual
  let currentY = 40;

  // Obtener las claves del objeto o manejar si es un arreglo
  let usuariosNormalizado: Record<string, any[]>;

  if (Array.isArray(usuarios)) {
    usuariosNormalizado = { [`Lista de ${tipoPdf}`]: usuarios };
  } else {
    usuariosNormalizado = usuarios;
  }

  const keys = Object.keys(usuariosNormalizado);

  // Iterar sobre cada clave
  keys.forEach((key, index) => {
    const listaUsuarios = usuariosNormalizado[key];

    if (!listaUsuarios || listaUsuarios.length === 0) {
      return;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${key}`, 14, currentY);
    currentY += 7;

    let data = [];
    let columnsStyles = {};

    if (!olimpistas) {
      data = (listaUsuarios as Usuario[]).map((usuario) => [
        usuario.ci,
        usuario.nombre,
        usuario.area,
        usuario.rol,
        usuario.fases,
      ]);

      columnsStyles = {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 45 },
        3: { cellWidth: 30 },
        4: { cellWidth: 45 }
      };
    } else {
      data = (listaUsuarios as Participante[]).map((usuario) => [
        usuario.apellidoParticipante,
        usuario.nombreParticipante,
        usuario.colegio,
        usuario.departamento,
        usuario.provincia,
      ]);

      columnsStyles = {
        0: { cellWidth: 25 },
        1: { cellWidth: 25 },
        2: { cellWidth: 45 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 }
      };
    }

    autoTable(doc, {
      head: olimpistas ? headersParticipante : headersUsuario,
      body: data,
      startY: currentY,
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
      didDrawPage: (data) => {
        currentY = data.cursor?.y as number;
      }
    });

    if (index < keys.length - 1) {
      currentY += 15;
      if (currentY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        currentY = 20;
      }
    }
  });


  // Agregar pie de página en todas las páginas
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
  }

  doc.save(`reporte-${tipoPdf}.pdf`);
}