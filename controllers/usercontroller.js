import User from "../models/usermodels.js";
import mongoose from "mongoose";

export const getUsers =async (req, res, next) => {
    try{
        const users=await User.find();

        res.status(200).json({
            status:"success",
            data:users
        })
    }catch(error){
        next(error);
    }
}

export const getUserbyID =async (req, res, next) => {
    try{
        const id= req.params.id;
        const user=await User.findById(id).select("-password");
        if (!user){
            res.status(404).json({
                status:"error",
                message:"User not found"
            })
        }

        res.status(200).json({
            status:"success",
            data:user
        })
    }catch(error){
        next(error);
    }
}
