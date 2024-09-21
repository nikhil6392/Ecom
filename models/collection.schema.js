import mongoose from "mongoose";

const collectionSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please give a category"],
        trim: true,
        maxLength: [120,"Collection should not be more than 120"],
 }
 
 },
 {
    timestamps:true
 }
)

export default mongoose.model("Collection",collectionSchema);