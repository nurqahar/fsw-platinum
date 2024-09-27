import TeachingNotes from "../models/teachingNotesModel.mjs";
import teachingNotesSchema from "../schema/teachingNotesSchema.mjs";

const DECIMAL = 10;
export const createData = async (req, res) => {
  const { error, value } = teachingNotesSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const subject_id = parseInt(req.params.id1, DECIMAL);
  const teacher_id = parseInt(req.params.id2, DECIMAL);
  const class_id = parseInt(req.params.id3, DECIMAL);
  const student_id = parseInt(req.params.id4, DECIMAL);
  try {
    const data = await TeachingNotes.create({
      student_id,
      class_id,
      subject_id,
      teacher_id,
      ...value,
    });
    return res.status(201).json(data);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const getAllData = async (req, res) => {
  let data = "";
  if (req.query.class_id) {
    data = await TeachingNotes.getBySearch(
      req.query.date,
      req.query.class_id,
      req.query.subject_id,
      req.query.teacher_id
    );
  } else {
    data = await TeachingNotes.getAll();
  }
  return res.json(data);
};

export const getDataById = async (req, res) => {
  const data = await TeachingNotes.getById(parseInt(req.params.id, DECIMAL));

  if (data) {
    return res.json(data);
  }
  return res.status(404).send("teaching note not found!");
};

export const updateData = async (req, res) => {
  const { error, value } = teachingNotesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const id = parseInt(req.params.id1, DECIMAL);
  const data = await TeachingNotes.getById(id);
  const subject_id = parseInt(req.params.id2, DECIMAL);
  const teacher_id = parseInt(req.params.id3, DECIMAL);
  const class_id = parseInt(data.class_id, DECIMAL);
  const student_id = parseInt(data.student_id, DECIMAL);

  if (!data) return res.status(404).send("teaching note not found!");
  try {
    const updateData = await TeachingNotes.update(id, {
      subject_id,
      teacher_id,
      class_id,
      student_id,
      ...value,
    });
    return res.status(201).json(updateData);
  } catch (err) {
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const deleteData = async (req, res) => {
  const dataId = parseInt(req.params.id, DECIMAL);
  const data = await TeachingNotes.getById(dataId);
  if (!data) return res.status(404).send("teaching note not found!");
  await TeachingNotes.delete(parseInt(req.params.id, DECIMAL));
  return res.status(204).send();
};
