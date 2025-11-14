import { Users } from "../database/schema.js";
import { Router } from "express";
import { ResponseGenerator } from "../utils/netutils.js";
import { JWT_SECRET } from "../middleware/verify.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const auth_router = Router();

auth_router.post("/login", ResponseGenerator(Login));
auth_router.post("/register", ResponseGenerator(Register));

async function Login(req, res) {
  console.log("entered login");
  const { username, password } = req.body;
  const user = await Users.findOne({ username: username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { status_code: 401, result: { error: "Invalid credentials" } };
  }

  const auth_token = jwt.sign({ user_id: user._id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  res.cookie("auth_token", auth_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 6 * 60 * 60 * 1000,
  });

  return { status_code: 201, result: { auth_token } };
}

async function Register(req) {
  const { first, last, username, password } = req.body;
  if (!first || !username || !password) {
    return {
      status_code: 401,
      result: { error: "Required parameters missing" },
    };
  }

  const exists = await Users.findOne({ username: username });
  if (exists) {
    return { status_code: 409, result: { error: "Username already exists" } };
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const new_user = await Users.create({
    username: username,
    password: hashedPass,
    name: { first: first, last: last },
  });
  return {
    status_code: 201,
    result: { userid: new_user._id },
  };
}

export default auth_router;
