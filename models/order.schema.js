import mongoose from "mongoose";

const orderSchema= mongoose.Schema({
    //i will change it to product list
    products:{
        type:[
            {
                productId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                count:Number,
                price: Number
            }
        ],
        required: true,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    phoneNumber: {
        type: Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    coupon:String,
    transactionId: String,
    status: {
        type:String,
        enum:["ORDERED","SHIPPED","DELIVERED","CANCELLED"],
        default: "ORDERED",
    },
    //can we give payment mode

},{timestamps:true})

export default mongoose.model("Order",orderSchema);