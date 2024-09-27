import Joi from "joi";

const studentSchema = Joi.object({
  student: Joi.string().min(3).required(),
  sex: Joi.string().required(),
});

export default studentSchema;
