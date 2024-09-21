import mongoose from 'mongoose'
import AuthRoles from '../utils/authRoles'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'
import config from '../config/index'


const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Name is required"],
            maxLength:[50,"Name should be less than 50 characters"]
        },
        email:{
            type: String,
            required:[true,"Please give an email"],
            unique:true
        },
        password:{
            type: String,
            required: [true,"Password is required"],
            minLength: [8,"Password should be at least 8 characters"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default:AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timeStamp: true
    }
);

//Encrypting the password
userSchema.pre("save",async function(next) {
    if(!(this.isModified("password"))) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
});

//Comparing the password 
userSchema.methods = {
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password)
    },

    //we need to token 
    getJwtToken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role
            },
            config.JWT_SECRET,
            {
                expiresIn:config.JWT_EXPIRY
            }
        )
    },

    generateForgotPasswordToken: function(){

        const forgotToken = crypto.randomBytes(20).toString('hex');

        //saving it to Database
        this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest("hex")
         
        //I want to give the user 5 minutes to change the password 
        this.forgotPasswordExpiry = Date.now() + 5*60*300

        return forgotToken;
    }
}

export default mongoose.model("User", userSchema);
