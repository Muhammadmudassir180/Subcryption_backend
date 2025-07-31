
import jwt from "jsonwebtoken";
import User from "../models/usermodels.js";

// if someone is making a request to get the user details -> authorize the middle -> verify -> if valid -> next -> get user details

export const authorize= async (req,res,next)=> {
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        console.log("Received token:", token);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        
        if(!token){
            return res.status(401).json({
                status:"error",
                message:"No token provided"
            })
        }
        
        if(!process.env.JWT_SECRET){
            console.error("JWT_SECRET is not set!");
            return res.status(500).json({
                status:"error",
                message:"Server configuration error"
            })
        }
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        const user= await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({
                status:"error",
                message:"User not Found"
            })
        }
        console.log(user)
        req.user=user; //this will tells us which user is making the request.
        next();


    }
    catch(err){
        console.error("JWT verification error:", err);
        res.status(401).json({
            status:"error",
            message:"Unauthorized Token provided"
        })
    }
}