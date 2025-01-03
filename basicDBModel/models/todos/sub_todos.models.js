import mongoose from "mongoose";

const subtodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Subtodo = mongoose.model("Subtodo", subtodoSchema);
