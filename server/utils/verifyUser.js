import sendEmail from "../config.js/sendEmail.js";
import { ApiResponse } from "./apiResponse.js";
import { FORGET_PASSWORD_EMAIL_TEMPLATE, VERIFY_EMAIL_TEMLATE } from "./EmailTemplates.js";

export const verifyUser=async(email,subject,name,verifyLink,res)=>{
   try {
    await sendEmail(email,subject,VERIFY_EMAIL_TEMLATE.replace('{username}',name)
    .replace('{verifyLink}',verifyLink))
    return res.status(201).json(
      new ApiResponse(201, 'Verfication link has been sent successfully to your Email Address')
    );
   } catch (error) {
    return res
      .status(500)
      .json({
         success: false,
         status:500,
         message: error.message,
         error: error,
 
      });
   }
}
export const sendForgotPasswordUrl=async(email,subject,name,resetUrl,res)=>{
   try {
    const data =await sendEmail(email,subject,FORGET_PASSWORD_EMAIL_TEMPLATE.replace('{username}',name).replace('{resetLink}',resetUrl))
    return res.status(201).json(
      new ApiResponse(201, 'Reset Password Link Sent successfully to your email address')
    );
   } catch (error) {
    return res
      .status(500)
      .json({
         success: false,
         status:500,
         message: error.message,
         error: error,
 
      });
   }
}