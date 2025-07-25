import subscriptionRoute from "../routes/subscriptionRoute.js";
import subscription  from "../models/subscriptionModel.js";

export const createsubscryption = async (req, res,next) => {
    try{
    const subscryption = await subscription.create({
        ... req.body,
        user: req.user._id,
        }
    );

    res.status(201).json({
        status:"success",
        data:subscryption

    });


    }catch(err){
        next(err);

    }
}

export const getUsersubscryption = async (req, res,next) => {
    try{
        //check if the user is the same as token
        if (req.user._id !== req.user._id) {
            res.status(401).json({
                status:"error",
                message:"You are not the owner of this account"
            })
        }
        const sub= await subscription.find({user:req.params.id});
        res.status(200).json({
            status:"success",
            data:sub
        })

    }catch(err){
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