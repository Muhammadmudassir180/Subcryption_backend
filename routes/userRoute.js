import { Router } from "express";
import {getUserbyID, getUsers} from "../controllers/usercontroller.js";
import {authorize} from "../middleware/authmiddleware.js";
const UserRoute=Router()

UserRoute.get("/",getUsers);

UserRoute.get("/:id",authorize,getUserbyID);

UserRoute.post("/",(req,res)=>
    res.send({title:"Create a new user data"})
);

UserRoute.put("/:id",(req,res)=>
    res.send({title:"Update a  user data"})
);


UserRoute.delete("/:id",(req,res)=>
    res.send({title:"Delete the user data"})
);

export default UserRoute;
    