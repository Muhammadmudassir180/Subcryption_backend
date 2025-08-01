
import subscription  from "../models/subscriptionModel.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createsubscryption = async (req, res,next) => {
    try {
        const Subscription = await subscription.create({
        ...req.body,
        user: req.user._id,
        });
        res.status(201).json({ success: true, data: Subscription });

        // const { workflowRunId } = await workflowClient.trigger({
        // url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        // body: {
        //     SubscriptionId: Subscription.id,
        // },
        // headers: {
        //     'content-type': 'application/json',
        // },
        // retries: 0,
        // })

        // res.status(201).json({ success: true, data: { Subscription, workflowRunId } });
    } catch (e) {
        next(e);
    }
}

export const getUsersubscryption = async (req, res,next) => {

 try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const Subscriptions = await subscription.find({ user: req.params.id });
    if (!Subscriptions || Subscriptions.length === 0) {
      return res.status(404).json({ success: false, message: 'No subscriptions found for this user' });
    }
    res.status(200).json({ success: true, data: Subscriptions });
  } catch (e) {
    next(e);
  }
}
export const deletesubscryption = async (req, res,next) => {
    try{
        //check if the user is the same as token
        // if (req.user._id !== req.user._id) {
        //     res.status(401).json({
        //         status:"error",
        //         message:"You are not the owner of this account"
        //     })
        // }
        const sub= await subscription.findOneAndDelete(req.params.id);
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
        // check if the user is the same as token
        if (req.user._id !== req.user._id) {
            res.status(401).json({
                status:"error",
                message:"You are not the owner of this account"
            })
        }
        const sub= await subscription.findByIdAndUpdate(req.params.id,req.body);
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