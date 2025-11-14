import projectSchema from "./project.js";
import userSchema from "./user.js";
import { mongoose } from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/schemap_db";
const db = await mongoose.createConnection(MONGO_URL);

const Projects = db.model("Projects", projectSchema);
const Users = db.model("Users", userSchema);

async function DeleteEmptyProjects() {
  console.log("Garbage collecting empty projects!");
  await Projects.deleteMany({ "permissions.view": { $size: 0 } });
}

// Delete empty projects every hour
setInterval(DeleteEmptyProjects, 1000 * 60 * 60);

export { Projects, Users };
