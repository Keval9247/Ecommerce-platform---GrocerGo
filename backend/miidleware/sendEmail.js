// utils/sendEmail.js
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, htmlContent) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    let info = await transporter.sendMail({
        from: `"Keval Badarakhiya ~ " <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;