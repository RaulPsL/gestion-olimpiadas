export type FormNotasGrupo = {
  fase_id: number,
  notas: {
    nota_grupo_id: number;
    nota: number;
    comentarios: string;
  }[];
  type: 'grupos';
};
