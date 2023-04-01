import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email for this Admin."],
      unique: true,
    
    },
    gender: {
      type: String,
      required: [true, "Please provide a gender for this Admin."],
     
    
    },

     education:{
      type:String,  
          required: [true, "Please provide a education for this admin."],
    },

    password: {
      type: String,
      required: [true, "Please provide a password for this admin."],
      maxlength: [200, "Name cannot be more than 60 characters"],
     
    },
    address:{
type:String,
    },
    phone_no:{
      type:Number,
      
    },
    is_active:{
    type:Boolean,
    
    default:true,  },
  
   
    slug:{
type:String, required: [true, "Please provide a slug for this Admin."],
unique:true,
    },
    

   
  },
  { timestamps: true }
);

export default mongoose.models.Author || mongoose.model("Author", AuthorSchema);
