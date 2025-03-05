const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const sendEmail = async (fromEmail, formData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // App password
            },
        });

           // Generate HTML from EJS template
           const templatePath = path.join(__dirname, "../view/template.ejs");
           const emailHtml = await ejs.renderFile(templatePath, formData)

        const mailOptions = {
            from: `"${fromEmail}" <${process.env.EMAIL_USER}>`, // Display user's email, but send from authenticated email
            to: process.env.EMAIL_USER, // Your email (receiving the form submission)
           html: emailHtml,
            replyTo: fromEmail, // Allows replying to the user's email
        };
        console.log("mailOptions", mailOptions)
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = { sendEmail };
