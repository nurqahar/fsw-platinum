import Joi from "joi";

const classSchema = Joi.object({
  class: Joi.string().required(),
});

export default classSchema;
