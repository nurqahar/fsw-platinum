import Joi from "joi";

const teacherSchema = Joi.object({
  teacher: Joi.string().min(3).required(),
  sex: Joi.string().required(),
});

export default teacherSchema;
