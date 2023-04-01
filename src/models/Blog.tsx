import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
    },
    image: {
      type: String,
      required: [true, "please provide a image for this admin"],
    },
    author: {
      type: String,
      required: [true, "Please provide a username for this Admin."],
    },

    description: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
    },
    category: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
    },
    slug: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
      unique: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    like: {
      type: Boolean,
    },
    comment: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
