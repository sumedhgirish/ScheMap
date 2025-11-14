import { Schema } from "mongoose";

const projectSchema = new Schema({
  metadata: {
    title: String,
    desc: String,
    creationDate: Date,
  },

  content: {
    todo: {
      completed: [String],
      pending: [String],
      ignored: [String],
    },

    chat: [
      {
        message: String,
        sender: { type: Schema.Types.ObjectId, ref: "Users" },
      },
    ],

    posts: [
      {
        title: String,
        author: { type: Schema.Types.ObjectId, ref: "Users" },
        content: String,
        creationDate: Date,
      },
    ],
  },

  permissions: {
    view: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    edit: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
});

projectSchema.statics.createNew = function (
  title,
  desc,
  owner,
  view = [],
  edit = [],
) {
  const uniqueView = Array.from(new Set([owner, ...view]));
  const uniqueEdit = Array.from(new Set([owner, ...edit]));

  return this.create({
    metadata: {
      title,
      desc,
      creationDate: new Date(),
    },
    content: {
      todo: {
        completed: [],
        pending: [],
        ignored: [],
      },
      chat: [],
      posts: [],
    },
    permissions: {
      view: uniqueView,
      edit: uniqueEdit,
    },
  });
};

export default projectSchema;
