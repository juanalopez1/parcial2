import { FastifyPluginAsync } from "fastify";
import { Comentario } from "../../../../../../types/comentarios.js";
import { Type } from "@sinclair/typebox";
import { IdTema } from "../../../../../../types/tema.js";
import { IdUsuarioSchema } from "../../../../../../types/usuario.js";
import * as comentariosService from "../../../../../../services/comentarios.js";

const commentsRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    schema: {
      params: Type.Intersect([IdTema, IdUsuarioSchema]),
      response: {
        200: {
          content: {
            "application/json": {
              schema: Type.Array(Comentario),
            },
          },
        },
      },
      summary: "Obtener los comentarios de una tema por su id.",
      tags: ["comentarios"],
    },
    handler: async function (request, reply) {
      const { id_tema } = request.params as IdTema;

      reply.code(200);
      return comentariosService.findAll(id_tema);
    },
  });

  fastify.post("/", {
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    schema: {
      params: Type.Intersect([IdTema, IdUsuarioSchema]),
      response: {
        201: {
          content: {
            "application/json": {
              schema: Comentario,
            },
          },
        },
      },
      body: Comentario,
      summary: "Postear un comentario.",
      tags: ["comentarios"],
    },

    handler: async function (request, reply) {
      const nuevoComentario = request.body as Comentario;
      reply.code(201);
      return comentariosService.create(
        nuevoComentario.id_tema,
        nuevoComentario.id_usuario,
        nuevoComentario.descripcion
      );
    },
  });

  fastify.put("/:id_comentario", {
    onRequest: [fastify.verifyAdmin, fastify.verifyJWT],
    schema: {
      params: Type.Intersect([IdUsuarioSchema, IdTema]),
      response : {200: {
        content: {
          "application/json": {
            schema: Comentario,
          },
        },
      }},
      body: Comentario,
      summary: "Editar un comentario",
      tags: ["comentarios"],
    },
    handler: async function (request, reply) {
        const { id_tema, id_comentario } = request.params as {
            id_tema: number;
            id_comentario:number
        };
        
        const body = request.body as Comentario

        reply.code(200)
        return comentariosService.modify(id_tema, id_comentario, body.descripcion);
    }
  });

  /*fastify.delete("/:id_comentario", {
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    schema: {
      params: Type.Intersect([IdUsuarioSchema, IdTema]),
      response: { 204: "Deleted successfully" },
      summary: "Borrar un comentario",
      tags: ["comentarios"],
    },
    handler: async function (request, reply) {
      const { id_tema, id_comentario } = request.params as {
        id_tema: number;
        id_comentario:number
      };
      reply.code(204);
      return comentariosService.erase(id_tema, id_comentario );
    },
  });*/

};

export default commentsRoutes;
