import nodemailer from "nodemailer";
import {EMAIL_PASSWORD} from "./env.js";
export const accountEmail = "muhammadmudassir180@gmail.com" ;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:"muhammadmudassir180@gmail.com",
        pass:EMAIL_PASSWORD
    }
})
export default transporter;