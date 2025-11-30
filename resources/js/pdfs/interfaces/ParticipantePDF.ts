export interface Participante {
  nombreParticipante: string,
  apellidoParticipante: string,
  puesto: string,
  nivel: string,
  area: string,
  nota: number,
  nombreTutor: string,
  nombreEncargado: string,
  colegio: string,
  departamento: string,
  provincia: string,
}

export interface DataParticipante {
  integrantes: Participante[],
  nivel: string,
  sigla: string,
  
}