import User from '../models/user.schema'
import asyncHandler from "../services/asyncHandler"
import CustomError from '../utils/customError'
import mailerHelper from "../utils/mailHelper"
import crypto from "crypto"

export const cookieOptions = {
    expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

/**
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User signUp controller for creating new user
 * @parameters name,email,password
 * @returns User Object
 **********************/
export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!(name || email || password)) {
        throw new CustomError("Please Fill all fields", 400)
    }
    //Check user's Existence 
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new CustomError("User already exists", 401)
    }
    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()
    console.log(user)
    user.password = undefined

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})

    /**
     * @Login
     * @route http://localhost:4000/api/auth/login
     * @description User login controller for login user
     * @parameters name,email,password
     * @returns User Object
     **********************/
    export const login = asyncHandler(async (req, res) => {
        const { email, password } = req.body

        if (!(email || password)) {
            throw new CustomError("Please Fill all fields", 400)
        }


        //we are chaining the select method for matching the password of the user
        const user = await User.findOne({ email }).select('+password')
        if (!user) {

            ///we are give this error message where user would get the invalid it is an security measure for not getting hacked
            throw new CustomError("Invalid credentials", 400)
        }
        const passwordMatched = await user.comparePassword(password);

        if (!passwordMatched) {
            throw new CustomError("Invalid Credentials", 400);
        }
        const token = user.getJwtToken()
        user.password = undefined

        res.cookie("token", token, cookieOptions)
        return res.status(201).json({
            success: true,
            token,
            user
        })
    })

    /**
        * @Logout
        * @route http://localhost:4000/api/auth/login
        * @description User logout controller for logout user
        * @parameters 
        * @returns User Object
        **********************/
    export const logout = asyncHandler(async (req, res) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    })

/**
        * @forgotPassword
        * @route http://localhost:4000/api/auth/password/forgot
        * @description user will submit the email we will generate a token
        * @parameters 
        * @returns success message-email send
        **********************/

export const forgotPassword = asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user=await User.findOne({email})

    if(!user){
        throw new CustomError('User not found',404)
    }
    const resetToken=user.generateForgotPassword()

    await user.save({validateBeforeSave: false})

    const resetUrl =
        `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`
    const text=`Your password reset url is \n\n${resetUrl}\n\n`
    try{
        await mailerHelper({
            email:user.email,
            subject:"Password email for website",
            text: text
        })
        res.status(200).json({
            success:true,
            message:`email send to ${user.email}`
        })
    }catch(error){

        user.forgotPasswordToken=undefined;
        user.forgotPasswordExpiry =undefined;

        await user.save({validateBeforeSave: false})
        throw new CustomError(error.message ||"Email wasn't existed",500)

    }    

    
})


/**
        * @resetPassword
        * @route http://localhost:4000/api/auth/password/reset/:resetPasswordToken
        * @description user will be able to reset the password on url password
        * @parameters token from url, password and confirmPass
        * @returns User Object     **********************/

export const resetPassword = asyncHandler(async(req,res)=>{
    const {token:resetToken} =req.params
    const {password,confirmPassword}=req.body

   const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

   const user=await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry:{$gt:Date.now()}
    })

    if(!user){
        throw new CustomError(`Password token is invalid or expired`,400)
    }

    if(password !==confirmPassword){
        throw new CustomError('Password and confirm password does not match',400)
    }

    user.password= password
    user.forgotPasswordToken=undefined
    user.forgotPasswordExpiry=undefined

    await user.save();

    const token =user.getJwtToken()
    user.password- undefined

    //helper method for the 
    res.cookie("token",token,cookieOptions)
    res.status(200).json({
        success:true,
        user,

    })


})

/**
        * @GetProfile
        * @request_type Get
        * @route http://localhost:4000/api/auth/profile
        * @description get user profile
        * @parameters 
        * @returns User Object     **********************/


export const getProfile = asyncHandler(async(req,res)=>{
    const {user} = req
    if(!user){
        throw new CustomError("User not found",404)
    }
    res.status(200,json({
        success:true,
        user
    }))
})







