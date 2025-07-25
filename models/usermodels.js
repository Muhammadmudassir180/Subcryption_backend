import mongoose  from "mongoose";

const userSchema=new mongoose.Schema(
    {
    name:{
            type: String,
            required: [true, "User Name is required"],
            minLength: 2, 
            maxLength: 50,
            trim:true
        },

    email:{
         type: String,
            required: [true, "User Email is required"],
            minLength: 2, 
            maxLength: 255,
            unique:true,
            lowercase:true,
            match: [/\S+@\S+\.\S+/, "Please fill a valid email address."],
            trim:true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: 2, 
        maxLength: 255,
    }
},{timestamp:true});


const User=mongoose.model("User", userSchema);

export default User;