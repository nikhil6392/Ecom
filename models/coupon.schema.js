import mongoose from "mongoose";

const couponSchema=mongoose.model({
    code:{
        type: String,
        required:[true,"Please provide a coupon name"]

    },
    discount : {
        type:Number,
        default: 0
    },
    active:{
        type: Boolean,
        default: true
    }
},
{
    timestamps:true
})

export default mongoose.model("Coupon",couponSchema);