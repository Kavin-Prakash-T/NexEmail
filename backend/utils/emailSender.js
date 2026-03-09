const nodemailer = require("nodemailer");

const emailSender = async (options) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.USER_PASS) {
            throw new Error('Error credentials are not set in environment variables');
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: `<p>${options.text}</p>`
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Error sending email:', error.message);
    }
}