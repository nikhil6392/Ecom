import User from "../models/user.schema.js"
import config from "../config/index.js"

export const isLoggedIn = asyncHandler(async(req_,res,next)=>{
    let token;

    if(
        req.cookies.token|(re.header.authorization && req.header.authorization.startsWith("Bearer"))
    ){
        token = req.cookies.token || req.header.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomError("Not authorized to access this route",401)
    }

    try {
        const decodeJwtPayload=JWT.verify(token,config.JWT_SECRET)
        req.user - await User.findByID(decodeJwtPayload._id,"name email role")
        next()
        
    } catch (error) {
        throw new CustomError("Not authorized to access this route",401)
    }
})
