import Joi from "joi";

// "nome" | "email" | "senha" | "tipoUsuarioId"

export const schema = Joi.object().keys({
    nome: Joi.string().min(2).max(50).required(),
    email: Joi.string().required(),
    senha: Joi.string().required(),
    tipoUsuarioId: Joi.string().max(36)
});

export default schema;