import nodemailer from 'nodemailer';
import config from '../config/config.js';
import createError from 'http-errors';
import { Resend } from 'resend';

const sendEmailWithSMTP = async ({ subject, text, html }, to) => {

    // return console.log({ subject, text, html }, to);
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: false,
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASSWORD
        }
    });

    // Message object
    let message = {
        from: 'sandeep rajak believerdev031@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

const sendEmailWithResend = async (messageBody, to) => {
    // messageBody is a Object of Subject,Text & Html.
    try {
        const resend = new Resend(config.RESEND_TOKEN);
        const data = await resend.emails.send({
            from: config.RESEND_EMAIL,
            to,
            ...messageBody
        });
        return data
    } catch (error) {
        throw createError(409, error.message)
    }
}

export { sendEmailWithSMTP, sendEmailWithResend }