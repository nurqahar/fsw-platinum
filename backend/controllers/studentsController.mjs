import Student from "../models/studentsModel.mjs";
import studentSchema from "../schema/studentSchema.mjs";

const DECIMAL = 10;
export const createData = async (req, res) => {
  const { error, value } = studentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const class_id = parseInt(req.params.id, DECIMAL);
  try {
    const data = await Student.create({ class_id, ...value });
    return res.status(201).json(data);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const getAllData = async (req, res) => {
  let data = "";
  if (req.query.class_id) {
    data = await Student.getByClassId(parseInt(req.query.class_id, DECIMAL));
  } else {
    data = await Student.getAll();
  }
  return res.json(data);
};

export const getDataById = async (req, res) => {
  const data = await Student.getById(parseInt(req.params.id, DECIMAL));
  if (data) {
    return res.json(data);
  }
  return res.status(404).send("student not found");
};

export const getClassById = async (req, res) => {
  const data = await Student.getByClassId(parseInt(req.params.id, DECIMAL));
  if (data) {
    return res.json(data);
  }
  return res.status(404).send("student not found");
};

export const updateData = async (req, res) => {
  const { error, value } = studentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const dataId = parseInt(req.params.id, DECIMAL);
  const data = await Student.getById(dataId);
  if (!data) return res.status(404).send("student not found");
  try {
    const updateData = await Student.update(dataId, value);
    return res.status(201).json(updateData);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const deleteData = async (req, res) => {
  const dataId = parseInt(req.params.id, DECIMAL);
  const data = await Student.getById(dataId);
  if (!data) return res.status(404).send("student not found");
  await Student.delete(parseInt(req.params.id, DECIMAL));
  return res.status(204).send();
};
