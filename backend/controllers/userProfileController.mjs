import UserProfile from "../models/userProfileModel.mjs";
import {
  userProfileSchema,
  editUserProfileSchema,
} from "../schema/userProfileSchema.mjs";
import uploadFile from "../lib/cloudinary.mjs";
const DECIMAL = 10;

//new user
export const createUserProfile = async (req, res) => {
  const { error, value } = userProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userId = parseInt(req.params.id, DECIMAL);
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;
  const { url: image } = await uploadFile(dataURI);

  try {
    const profile = await UserProfile.create({
      user_id: userId,
      image,
      ...value,
    });
    return res.status(201).json(profile);
  } catch (err) {
    const { detail } = err;
    console.error(err);
    return res.status(422).json({ error: detail });
  }
};

export const editUserProfile = async (req, res) => {
  const { error, value } = editUserProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userId = await parseInt(req.params.id, DECIMAL);
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + "base64" + b64;
    const { url: image } = await uploadFile(dataURI);
    value.image = image;
  }

  try {
    const profile = await UserProfile.update(userId, value);
    return res.status(200).json(profile);
  } catch (error) {
    const { detail } = error;
    console.error(error);
    return res.status(422).json({ error: detail });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = parseInt(req.params.id, DECIMAL);
  const profile = await UserProfile.getByUserId(userId);
  if (!profile) {
    return res.status(404).json({ error: "User profile not found" });
  }
  return res.status(200).json(profile);
};
