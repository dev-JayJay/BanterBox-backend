import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailTransporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: `${process.env.SMTP_MAIL_USER}`,
      pass: `${process.env.SMTP_MAIL_PASSWORD}`
    }
})

export default mailTransporter;