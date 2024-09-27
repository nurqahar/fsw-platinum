import User from "../models/userModel.mjs";
import userSchema from "../schema/userSchema.mjs";
const DECIMAL = 10;

// make new user
export const createUser = async (request, response) => {
  const { error, value } = userSchema.validate(request.body);
  if (error) {
    return response.status(400).json({ error: error.details[0].message });
  }
  try {
    const newUser = await User.create(value);
    return response.status(201).json(newUser);
  } catch (err) {
    const { detail } = err;
    return response.status(422).json({ error: detail });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.getAll();
  return res.json(users);
};

export const getUserById = async (req, res) => {
  const userId = await parseInt(req.params.id, DECIMAL);
  const user = await User.getById(userId);
  if (user) {
    return res.json(user);
  }
  return res.status(404).send("User not found");
};

export const updateUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userId = parseInt(req.params.id, DECIMAL);
  const user = await User.getById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const updatedUser = await User.update(userId, value);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    const { detail } = err;
    return res.status(422).json({ error: detail });
  }
};

export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, DECIMAL);
  const user = await User.getById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  await User.delete(parseInt(req.params.id, DECIMAL));
  return res.status(204).send();
};
