import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  repositories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Repository",
      default: [],
    },
  ],
  followedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  starredRepositories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Repository",
      default: [],
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
