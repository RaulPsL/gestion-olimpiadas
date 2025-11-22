export type FormNotas = {
  fase_id: number,
  notas: {
    nota_olimpista_id: number;
    nota: number;
    comentarios: string;
  }[];
  type: 'olimpista';
};
