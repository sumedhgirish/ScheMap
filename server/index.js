import express from "express";
import { mongoose, Schema } from "mongoose";

// Set up database
const database_url = "mongodb://localhost:27017";
const database_name = "/schemap_db";
const db = await mongoose.createConnection(database_url + database_name);

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
const Project = db.model("Project", projectSchema);
let p1 = new Project({
  title: "Test Project",
});
console.log(await Project.find());

const userSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
    project_ids: Array,
    password: String,
  },
  {
    virtuals: {
      fullname: {
        get() {
          return this.name.first + " " + this.name.last;
        },
      },
      projects: {
        get() {},
      },
    },
  },
);
const User = db.model("User", userSchema);
let me = new User({
  name: { first: "Sumedh", last: "Girish" },
  password: "password1",
});

me.project_ids.push(p1._id);
console.log(await User.deleteOne());
