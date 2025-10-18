import { PDFDocument, RGB, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import PDFImage from 'pdf-lib/cjs/api/PDFImage';
import PDFFont from 'pdf-lib/cjs/api/PDFFont';
import { Participante } from './interfaces/ParticipantePDF';

function certificatePage(
  pdfDoc: PDFDocument,
  fontCertificado: PDFFont,
  fontBitter: PDFFont,
  fontNombre: PDFFont,
  backgroundCertificate: PDFImage,
  azulOscuro: RGB,
  rojoOscuro: RGB,
  negro: RGB,
  area: string,
  nombreParticipante: string,
  puesto: string,
  nivel: string,
  nombreTutor: string,
  nombreEncargado: string,
){
  const page = pdfDoc.addPage([841.89, 595.28]); // A4 horizontal
  const { width, height } = page.getSize();

  page.drawImage(backgroundCertificate, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

  // Título y subtítulo
  page.drawText('CERTIFICADO', { x: 70, y: height - 90, size: 42, font: fontCertificado, color: azulOscuro });
  page.drawText('DE RECONOCIMIENTO', { x: 70, y: height - 120, size: 32, font: fontCertificado, color: rojoOscuro });
  page.drawText('ORGULLOSAMENTE OTORGADO A', { x: 70, y: height - 165, size: 14, font: fontBitter, color: azulOscuro });
  
  // Nombre participante
  const nombreSize = 52;
  page.drawLine({ start: { x: 90, y: 340 }, end: { x: 350, y: 340 }, thickness: 1, color: negro });
  page.drawText(nombreParticipante, { x: 100, y: height - 240, size: nombreSize, font: fontNombre, color: rojoOscuro });

  // Texto descriptivo
  page.drawText(`por su destacada participación en la olimpiada,`, { x: 70, y: height - 320, size: 14, font: fontBitter, color: negro });
  page.drawText(`obteniendo el ${puesto} lugar en la categoría`, { x: 70, y: height - 340, size: 14, font: fontBitter, color: negro });
  page.drawText(`${nivel}`, { x: 70, y: height - 360, size: 14, font: fontBitter, color: negro });

  // Firmas
  const firmaY = 120;
  page.drawLine({ start: { x: 80, y: firmaY }, end: { x: 210, y: firmaY }, thickness: 1, color: negro });
  page.drawText(nombreEncargado, { x: 140 - fontBitter.widthOfTextAtSize(nombreEncargado, 10) / 2, y: firmaY - 20, size: 12, font: fontBitter, color: negro });
  page.drawText(`Encargado ${area}`, { x: 140 - fontBitter.widthOfTextAtSize(`Encargado ${area}`, 8) / 2, y: firmaY - 35, size: 10, font: fontBitter, color: rojoOscuro });

  if (nombreTutor !== '') {
    page.drawLine({ start: { x: 290, y: firmaY }, end: { x: 420, y: firmaY }, thickness: 1, color: negro });
    page.drawText(nombreTutor, { x: 350 - fontBitter.widthOfTextAtSize(nombreTutor, 10) / 2, y: firmaY - 20, size: 12, font: fontBitter, color: negro });
    page.drawText(`Tutor de ${area}`, { x: 350 - fontBitter.widthOfTextAtSize(`Tutor de ${area}`, 8) / 2, y: firmaY - 35, size: 10, font: fontBitter, color: rojoOscuro });
  }
}

export async function generarCertificados (
  participantes: Participante[],
  area: string
) {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Colores
    const azulOscuro = rgb(0x01 / 255, 0x01 / 255, 0x69 / 255);
    const rojoOscuro = rgb(0x9c / 255, 0x00 / 255, 0x05 / 255);
    const negro = rgb(0, 0, 0);

    // Cargar fuentes
    const [droidFontBytes, bitterFontBytes, vibesFontBytes, imageBackground] = await Promise.all([
      fetch(new URL('../../js/fonts/DroidSerif-Bold.ttf', import.meta.url)).then(res => {
        if (!res.ok) throw new Error('No se pudo cargar DroidSerif-Bold.ttf');
        return res.arrayBuffer();
      }),
      fetch(new URL('../../js/fonts/DroidSerif-Bold.ttf', import.meta.url)).then(res => {
        if (!res.ok) throw new Error('No se pudo cargar Bitter-Regular.ttf');
        return res.arrayBuffer();
      }),
      fetch(new URL('../../js/fonts/GreatVibes-Regular.ttf', import.meta.url)).then(res => {
        if (!res.ok) throw new Error('No se pudo cargar GreatVibes-Regular.ttf');
        return res.arrayBuffer();
      }),
      fetch(new URL('../../js/images/background-certificate.png', import.meta.url)).then(res => {
        if (!res.ok) throw new Error('No se pudo cargar GreatVibes-Regular.ttf');
        return res.arrayBuffer();
      }),
    ]);

    const fontCertificado = await pdfDoc.embedFont(droidFontBytes);
    const fontBitter = await pdfDoc.embedFont(bitterFontBytes);
    const fontNombre = await pdfDoc.embedFont(vibesFontBytes);
    const backgroundCertificate = await pdfDoc.embedPng(imageBackground);

    participantes.map((participante) => 
      certificatePage(
        pdfDoc,
        fontCertificado,
        fontBitter,
        fontNombre,
        backgroundCertificate,
        azulOscuro,
        rojoOscuro,
        negro,
        area,
        participante.nombreParticipante,
        participante.puesto,
        participante.nivel,
        participante.nombreTutor,
        participante.nombreEncargado
      )
    );

    // Descargar PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    if (participantes.length === 1) 
      a.download = `certificados-${participantes[0].nombreParticipante.replace(/\s+/g, '-')}.pdf`;
    a.download = `certificados-${area.replace(/\s+/g, '-')}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al generar PDF:', error);
  }
};