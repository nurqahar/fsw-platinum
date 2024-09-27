import Class from "../models/classesModel.mjs";
import classSchema from "../schema/classSchema.mjs";

const DECIMAL = 10;
export const createData = async (req, res) => {
  const { error, value } = classSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newClass = await Class.create(value);
    return res.status(201).json(newClass);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const getAllData = async (req, res) => {
  const classData = await Class.getAll();
  return res.json(classData);
};

export const getDataById = async (req, res) => {
  const classData = await Class.getById(parseInt(req.params.id, DECIMAL));
  if (classData) {
    return res.json(classData);
  }
  return res.status(404).send("Class not found");
};

export const updateData = async (req, res) => {
  const { error, value } = classSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const classId = parseInt(req.params.id, DECIMAL);
  const classData = await Class.getById(classId);
  if (!classData) return res.status(404).send("Class not found");
  try {
    const updateData = await Class.update(classId, value);
    return res.status(201).json(updateData);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const deleteData = async (req, res) => {
  const classId = parseInt(req.params.id, DECIMAL);
  const classData = await Class.getById(classId);
  if (!classData) return res.status(404).send("Class not found");

  await Class.delete(parseInt(req.params.id, DECIMAL));
  return res.status(204).send();
};
