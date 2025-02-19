import mailTransporter from '../config/mail.config.js';
import { responseMessage } from './response.util.js';
import nodemailer from 'nodemailer';



export const sendMail = async (to, subject, htmlContent, response) => {
    const mailOptions = {
        from: 'banterbox@example.com', 
        to, 
        subject, 
        html: htmlContent, 
      };

      try {
        const info = await mailTransporter.sendMail(mailOptions);
        // console.log('Email sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
        return true;
    } catch (error) {
        console.error(`Error sending email via Nodemailer: ${error.message}`);
        return false;
    }
}