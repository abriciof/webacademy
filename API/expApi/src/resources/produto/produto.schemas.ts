import Joi from "joi";

const schema = Joi.object().keys({
    nome: Joi.string().min(3).max(50).required(),
    preco: Joi.number().required(),
    estoque: Joi.number().positive().integer().required().messages({
        "number.positive": "O {#label} precisa ser positivo. Portanto o valor {#value} não é válido",
        "any.required": "O campo {#label} é obrigatório"
    }),
});

export default schema;