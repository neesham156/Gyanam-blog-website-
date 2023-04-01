import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "please provide a author for this admin."],
  },
  comment: [
    {
      type: new mongoose.Schema(
        {
          comment: {
            type: String,
          },
        },
        { timestamps: true }
      ),
      default: null,
    },
  ],

  blog: {
    type: String,
    required: [true, "Please provide a name for this Admin."],
  },
});
export default mongoose.models.Commet ||
  mongoose.model("Commet", CommentSchema);
