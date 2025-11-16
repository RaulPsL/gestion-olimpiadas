export type FormNotasGrupo = {
  notas: {
    nota_grupo_id: number;
    nota_fase_id: number;
    nota: number;
    comentarios: string;
  }[];
  type: 'grupos';
};
