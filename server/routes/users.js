import { Router } from "express";
import { ResponseGenerator } from "../utils/netutils.js";
import { Projects, Users } from "../database/schema.js";

const users_router = Router();

users_router.post("/current", ResponseGenerator(GetCurrUser));
users_router.post("/list/:projectid", ResponseGenerator(FindUsers));

async function GetCurrUser(req) {
  return { status_code: 200, result: { user: req.user } };
}

async function FindUsers(req) {
  const user = req.user;
  const project = await Projects.findById(req.params.projectid);

  if (!project.permissions.view.includes(user._id)) {
    return {
      status_code: 401,
      result: { error: "Unauthorized for viewing members" },
    };
  }

  const users = await Users.find();
  return { status_code: 200, result: { users: users } };
}

export default users_router;
