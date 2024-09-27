import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
export function generateJWT({ user, expiresIn = "1d", algorithm = "HS256" }) {
  const { id } = user;

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const token = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn,
    algorithm,
  });

  return {
    token,
  };
}

export function decodeJwt({ token, algorithms = ["HS256"] }) {
  return jsonwebtoken.verify(token, process.env.SECRET, { algorithms });
}
