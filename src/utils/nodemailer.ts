import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/user.model';

export async function nodeMailer({ email, emailType, userId }:any) {
   try {
       const hashedToken = await bcryptjs.hash(userId.toString(),10)
       if(emailType ===  'VERIFY') {
            await User.findByIdAndUpdate(userId, {
               verifyToken : hashedToken,
               verifyTokenExpiry : Date.now() + 3600000
           })
       } else if(emailType === "RESET") {
           await User.findByIdAndUpdate(userId, {
               forgotPasswordToken :hashedToken,
               forgotPasswordTokenExpiry : Date.now() + 3600000
           })
       }
   
       const transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
               user: process.env.MAIL_TRAP_USER,
               pass: process.env.MAIL_TRAP_PASSWORD
           }
         });
   
       const mailOptions = {
           from: '"mrshubhamu@gmail.com',
           to: email, 
           subject: emailType === 'VERIFY' ? 'verify your email' : "Reset your password", 
           html: `<p>Click <a href="${process.env.DOMAIN}/api/users/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
           or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
           </p>`, // html body
       }
       
       const mailResponse = await transport.sendMail(mailOptions);
       return mailResponse
    
   } catch (error) {
      console.log('Error in SendEmail',error)
   }
}