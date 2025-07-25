import mongoose from "mongoose";
import { DB_URL, NODE_ENV} from "../config/env.js";
// const DB_URL= "mongodb://localhost:27017"
console.log(DB_URL);

if(!DB_URL){
    throw new Error ("Please provide MongoDB_URL inside env.js file ");
}

const connect_db= async()=>
{
    try{
        await mongoose.connect(DB_URL);
        console.log("Connected to Database Successfully");

    }catch(error){
        console.error("Error connecting to Database",error);
        process.exit();
    }
}

export default connect_db;