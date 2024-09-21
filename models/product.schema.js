import mongoose from "mongoose";

const productSchema= mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please give an Product Name"],
        trim: true,
        maxLength: [120,"Product's name should be less than 120 characters "]
    },
    price:{
        type: Number,
        required: [true,"Give some price for the product please"],
        maxLength:[5,"The price should be max of 5 digits"]
        //I will going to change this
    },
    description: {
        type: String,

    },
    photos: [
        {
            secure_url:{
                type:String,
                required:[true,"please give an image of product"]
            }
        }
    ],
    stock: {
        type:Number,
        default:0
    },
    sold: {
        type:Number,
        default:0
    },
    collectionId:{

        //It is for storing the Id
        type: mongoose.Schema.Types.ObjectId,
        ref:"Collection",
        
    }
},
{
    timestamps: true
})

export default mongoose.model("Product",productSchema);