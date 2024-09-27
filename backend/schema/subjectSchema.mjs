import Joi from "joi";

const courseSchema = Joi.object({
  subject: Joi.string().required(),
});

export default courseSchema;
