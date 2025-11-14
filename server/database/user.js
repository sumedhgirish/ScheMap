import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
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

export default userSchema;
