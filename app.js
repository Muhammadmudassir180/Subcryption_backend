import express from "express";
import { PORT } from "./config/env.js";   
import UserRoute from "./routes/userRoute.js";  
import subRoute from "./routes/subscriptionRoute.js";   
import authRoute from "./routes/authroute.js"; 
import connect_db from "./database/mongodb.js";
import errormiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import {arcjetMiddleware} from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflowroute.js";
import cors from "cors";

const corsoptions = {
    origin:['http://localhost:3000',"http://192.168.100.8:3000","https://payment.nucleartech.online",],
    credentials:true
}
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false})); //this is the middleware that helps to return the form data in a simple format
app.use(cookieParser());// this middleware helps to store the data of user
// app.use(arcjetMiddleware);
app.use(cors(corsoptions));
app.options('*', cors({
  origin: ['http://localhost:3000','https://payment.nucleartech.online'],
  credentials: true
}));


app.use("/api/v1/auth",authRoute);
app.use("/api/v1/subscription",subRoute);
app.use("/api/v1/user",UserRoute);
app.use("/api/v1/workflow",workflowRouter);
app.use(errormiddleware)


app.listen(PORT, async ()=>{
console.log(`Subscription Tracker API running on http://localhost:${PORT}`)
await connect_db()
});