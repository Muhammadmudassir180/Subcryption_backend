import subscriptionRoute from "../routes/subscriptionRoute.js";
import subscription  from "../models/subscriptionModel.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createsubscryption = async (req, res,next) => {
    try{
    const subscryption = await subscription.create({
        ... req.body,
        user: req.user._id,
        }
    );
    
    // Temporarily comment out Qstash workflow for testing
    // await workflowClient.trigger({
    //     url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })

    res.status(201).json({
        status:"success",
        data:subscryption

    });


    }catch(err){
        next(err);

    }
}

export const getUsersubscryption = async (req, res, next) => {
    try {
        // Properly check if the user is requesting their own subscriptions
        if (req.user._id.toString() !== req.params.id) {
            return res.status(401).json({
                status: "error",
                message: "You are not the owner of this account"
            });
        }
        const sub = await subscription.find({ user: req.params.id });
        res.status(200).json({
            status: "success",
            subscriptions: sub
        });
    } catch (err) {
        next(err);
    }
}
export const deletesubscryption = async (req, res,next) => {
    try{
        //check if the user is the same as token
        if (req.user._id !== req.user._id) {
            res.status(401).json({
                status:"error",
                message:"You are not the owner of this account"
            })
        }
        const sub= await subscription.findByIdAndDelete({user:req.params.id});
        res.status(200).json({
            status:"success",
            data:sub
        })

    }catch(err){
        next(err);
    }
}
export const getallsubscryption = async (req, res,next) => {
    try{
        //check if the user is the same as token
        if (req.user._id !== req.user._id) {
            res.status(401).json({
                status:"error",
                message:"You are not the owner of this account"
            })
        }
        const sub= await subscription.find();

        res.status(200).json({
            status:"success",
            data:sub
        })

    }catch(err){
        next(err);
    }
}
export const updatesubscryption = async (req, res,next) => {
    try{
        //check if the user is the same as token
        if (req.user._id !== req.user._id) {
            res.status(401).json({
                status:"error",
                message:"You are not the owner of this account"
            })
        }
        const sub= await subscription.findByIdAndUpdate({user:req.params.id});
        res.status(200).json({
            status:"success",
            data:sub
        })

    }catch(err){
        next(err);
    }
}
export const getsubscryptiondetails = async (req, res,next) => {
    try{
        //check if the user is the same as token
        if (req.user._id !== req.user._id) {
            res.status(401).json({
                status:"error",
                message:"You are not the owner of this account"
            })
        }
        const sub= await subscription.findById({user:req.params.id});
        res.status(200).json({
            status:"success",
            data:sub
        })

    }catch(err){
        next(err);
    }
}