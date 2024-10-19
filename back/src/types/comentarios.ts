import { Static, Type } from "@sinclair/typebox";

export const Comentario = Type.Object(
  {
    id_comentario: Type.Integer(),
    id_tema: Type.Integer(),
    id_usuario: Type.Integer(),
    descripcion: Type.String({ description: "Contenido del comentario" }),
  },
  {
    examples: [
      {
        id_tema: 1,
        id_usuario:1,
        descripcion: "El contenido del comentario.",
      },
    ],
  }
);
export type Comentario = Static<typeof Comentario>;

