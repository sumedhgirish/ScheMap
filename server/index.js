import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { mongoose, Schema } from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/schemap_db";
const PORT = 5000;
const JWT_SECRET = "this_is_a_secret_key";

const db = await mongoose.createConnection(MONGO_URL);

const projectSchema = new Schema({
  title: String,
  desc: String,
  todo: {
    completed: Array,
    pending: Array,
    ignored: Array,
  },
  chat: Array,
  posts: Array,
});

const userSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
    project_ids: Array,
    username: String,
    password: String,
  },
  {
    toJSON: { virtuals: true },
    virtuals: {
      fullname: {
        get() {
          return this.name.first + " " + this.name.last;
        },
      },
    },
  },
);

const Project = db.model("Project", projectSchema);
const User = db.model("User", userSchema);

const app = express();
app.use(express.json());

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const auth_token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ auth_token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { first, last, username, password } = req.body;
    console.log(req.body);
    if (!first || !username || !password) {
      return res.status(401).json({ error: "Required parameters missing" });
    }

    const exists = await User.findOne({ username: username });
    console.log(exists);
    if (exists) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPass,
      name: { first: first, last: last },
      project_ids: [],
    });
    console.log(newUser);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    console.log(req.body);
    const { auth_token } = req.body;
    const { id } = jwt.verify(auth_token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const projects = await Project.find({ _id: { $in: user.project_ids } });
    return res.status(201).json({ user: user, projects: projects });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
