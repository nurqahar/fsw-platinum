import dotenv from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import UserModel from "../models/userModel.mjs";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const strategy = new Strategy(opts, async ({ sub }, done) => {
  let user;
  try {
    user = await UserModel.getById(sub);
  } catch (error) {
    return done(error);
  }

  if (user) {
    return done(null, user);
  }
  return done("not found");
});

export default strategy;
