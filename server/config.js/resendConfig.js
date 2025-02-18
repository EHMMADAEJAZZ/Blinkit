import { Resend } from 'resend';
import { ApiErrors } from '../utils/apiErrors.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to,subject,html)=>{
    try {
        const { data, error } = await resend.emails.send({
    from: 'BLINKIT <onboarding@resend.dev>',
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message)
  }
return data
    } catch (error) {
       throw new ApiErrors(error.message,error.statusCode);
    }
}

export default sendEmail
