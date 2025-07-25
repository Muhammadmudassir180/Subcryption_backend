import { Router } from "express";
import { signin, signout, signup } from "../controllers/authcontrollers.js"

const authRoute=Router();


//path:/api/v1/auth/sign-up 
authRoute.post("/sign-up", signup);

// path:/api/v1/auth/sign-in
authRoute.post("/sign-in",signin);

// //path:/api/v1/auth/sign-out
// authRoute.post("/sign-out", signout);


export default authRoute;
