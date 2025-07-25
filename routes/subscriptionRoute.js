import { Router } from "express";
import {authorize} from "../middleware/authmiddleware.js";
import {
    createsubscryption,
    deletesubscryption, getsubscryptiondetails,
    getUsersubscryption,
    updatesubscryption
} from "../controllers/subscriptioncontroller.js";
const subRoute=Router();

subRoute.get("/",(req,res)=>
    res.send({
        title: "Get all the subsciption"

    })
);

subRoute.get("/:id",authorize,getsubscryptiondetails);


subRoute.post("/",authorize, createsubscryption);
subRoute.put("/:id",authorize,updatesubscryption);

subRoute.delete("/:id",authorize, deletesubscryption);
subRoute.get("/user/:id", authorize ,getUsersubscryption);

subRoute.put("/:id/cancel",authorize,deletesubscryption);
subRoute.get("/upcoming-renewals",(req,res)=>
    res.send({
        title: "Cancel subscription"

    })
);
export default subRoute;

