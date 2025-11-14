import { Router } from "express";
import { ResponseGenerator } from "../utils/netutils.js";

const users_router = Router();

users_router.post("/current", ResponseGenerator(GetCurrUser));

async function GetCurrUser(req) {
  return { status_code: 200, result: { user: req.user } };
}

export default users_router;
