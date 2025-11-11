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
    posts: Array
})
const Project = db.model(projectSchema);

const userSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
    projects: Array,
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
            get() {
                return this.projects.map(Project.findById);
            }
        }
    },
  },
);
const User = db.model("User", userSchema);
