import express from "express";
import jwt from "jsonwebtoken";
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
  console.log(req.body);
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const auth_token = jwt.sign({ username: username }, JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ auth_token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
