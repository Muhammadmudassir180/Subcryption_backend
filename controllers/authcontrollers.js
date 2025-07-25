import mongoose from "mongoose"
import User from "../models/usermodels.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


// req body is the object containing the data coming from the client(POST request)
export const signup = async (req, res, next) => {
    // database operations have to be atomic. Either they have to do all the operations or Noting
    // Nothing, Means insert works completely or it doesn't 
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Logic to create a new user 
        const { name, email, password } = req.body;
        const existsemail = await User.findOne({ email });

        if (existsemail) {

            const error = new Error("User Already Exit");
            error.statusCode = 409;
            throw error;
        }
        //hashing password before saving it 
        const salt = await bcrypt.genSalt(10);
        const hasedpassword = await bcrypt.hash(password, salt);

        const newusers = await User.create([{ name: name, email: email, password: hasedpassword }], { timestamps:session });
        const token = jwt.sign({ userId: newusers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        await session.commitTransaction();
        await session.endSession();
        res.status(201).json(
            {
                message: "User Created Successfully",
                data: {
                    token,
                    user: newusers[0],
                }
            }

        );

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);

    }

}

export const signin = async (req, res, next) => {
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if (!user){
            const error= new Error("User Not Exit");
            error.statusCode = 404;
            throw error;

        }
        const isPassoword=await bcrypt.compare(password, user.password);
        if(!isPassoword){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }
        const token= jwt.sign({userId:user._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success:true,
            data:{
                token,
                user,}
        });



    }catch(error){
       next(error);


    }
}

export const signout = async (req, res, next) => {

}