export type FormNotas = {
  notas: {
    nota_olimpista_id: number;
    nota_fase_id: number;
    estado_olimpista: string;
    nota: number;
    comentarios: string;
  }[];
  type: 'olimpista';
};
