import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
