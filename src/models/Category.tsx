import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
    },
    slug: {
      type: String,
      required: [true, "Please provide a username for this Admin."],
      unique: true,
    },
    is_active:{
        type:Boolean,
        default:true,
    }

    
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
