import mongoose, { Schema } from "mongoose";

const IssueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  status: { type: String, enum: ["open", "closed"], default: "open" },
  repository: {
    type: Schema.types.ObjectId,
    ref: "Repository",
    required: true,
  },
});

const Issue = new mongoose.model("Issue", IssueSchema);

export default Issue;
