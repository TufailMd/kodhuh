import mongoose, { Schema } from "mongoose";

const RepositorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  visibility: { type: Boolean, default: true },
  content: [{ type: String, default: [] }],
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  issues: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    default: [],
  },
});

const Repository = mongoose.model("Repository", RepositorySchema);

export default Repository;
