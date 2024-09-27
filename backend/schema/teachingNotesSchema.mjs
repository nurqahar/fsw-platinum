import Joi from "joi";

const teachingNotesSchema = Joi.object({
  presence: Joi.string().required(),
  content: Joi.string().required(),
  notes: Joi.string().optional(),
  time: Joi.string().required(),
  total_content_time: Joi.string().required(),
  date: Joi.date().required(),
  school_year: Joi.string().required(),
  semester: Joi.string().required(),
  grade: Joi.string().optional(),
});

export default teachingNotesSchema;
