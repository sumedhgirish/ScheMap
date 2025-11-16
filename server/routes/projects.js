import { Router } from "express";
import { Projects } from "../database/schema.js";
import { ResponseGenerator } from "../utils/netutils.js";

// under /api/projects
const projects_router = Router();
projects_router.post("/list", ResponseGenerator(List));
projects_router.post("/create", ResponseGenerator(Create));
projects_router.post("/edit/:projectid", ResponseGenerator(Edit));
projects_router.post("/exit:projectid", ResponseGenerator(Exit));
projects_router.post("/addUser/:projectid", ResponseGenerator(AddUser));
// projects_router.post("/removeUser/:projectid");
// projects_router.post("/makeAdmin/:projectid");
// projects_router.post("/revokeAdmin/:projectid");

async function List(req) {
  const user = req.user;
  const projects = await Projects.find({ "permissions.view": user._id });
  return { status_code: 200, result: { projects } };
}

async function Create(req) {
  const { title, desc, admins, members } = req.body;
  const user = req.user;
  const new_project = await Projects.createNew(
    title,
    desc,
    user._id,
    members,
    admins,
  );
  return { status_code: 201, result: { project: new_project } };
}

async function Edit(req) {
  const { new_title, new_desc } = req.body;
  const user = req.user;
  const project = await Projects.findById(req.params.projectid);
  if (!project.permissions.edit.includes(user._id)) {
    return {
      status_code: 401,
      result: { error: "User is not authorized to edit project!" },
    };
  }
  // add sanitization
  if (new_title) {
    project.metadata.title = new_title;
  }
  if (new_desc) {
    project.metadata.desc = desc;
  }
  await project.save();
  return { status_code: 200, result: { project: project } };
}

async function Exit(req) {
  const user = req.user;
  const project = await Projects.findById(req.params.projectid);

  project.members = project.permissions.view.filter(
    (id) => id.toString() !== user._id.toString(),
  );

  project.permissions.admin = project.permissions.edit.filter(
    (id) => id.toString() !== user._id.toString(),
  );

  await project.save();
  return { status_code: 200, result: { project } };
}

async function AddUser(req) {
  const { new_user_id } = req.body;
  const user = req.user;
  const project = await Projects.findById(req.params.projectid);

  if (!project.permissions.edit.includes(user._id)) {
    return {
      status_code: 401,
      result: { error: "Unauthorized for adding users" },
    };
  }

  if (!project.permissions.view.includes(new_user_id)) {
    project.permissions.view.push(new_user_id);
  }

  await project.save();
  return { status_code: 200, result: { project } };
}

export default projects_router;
