import jwt from "jsonwebtoken"

export const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });

    // send jwt in cookies
    res.cookie("jwt",token,{
        // 7 days in milliseconds
        maxAge : 7*24*60*60*1000, //ms
        httpOnly : true, //prevent XSS attacks cross-site scripting attacks (not accessible via JS)
        sameSite : "strict", //CSRF attacks cross-site request forgery attacks
        // true for production, false for development (which we are in)
        secure : process.env.NODE_ENV!=="development"
    });

    return token;
}