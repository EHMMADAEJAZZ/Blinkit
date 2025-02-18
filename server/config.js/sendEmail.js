import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";
import { ApiErrors } from '../utils/apiErrors.js';
const sendEmail = async(email,subject,template)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === 465,  // true for 465, false for other ports

            
            auth: {
                user:process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from:process.env.SMTP_USER,
            to: email,
            subject,
            html: template
        };

        await transporter.sendMail(mailOptions);
        return true;
        
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes.
        throw new ApiErrors(error.message,error.statusCode);
    }
   
}

export default sendEmail
