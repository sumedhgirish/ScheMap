import jwt from "jsonwebtoken";
import { Users } from "../database/schema.js";

export const JWT_SECRET =
  "d3c6b4e8f9a1c27db54fa8d9e3b2c0f5f7a9e4d2c6b8a1f3d7e9c2b4a6f8d0e1";

export async function requestValidator(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token)
    return res.status(401).json({ error: "Missing Authorization header" });
  const { user_id } = jwt.verify(token, JWT_SECRET);
  req.user = await Users.findById(user_id);
  next();
}
