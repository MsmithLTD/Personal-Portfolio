const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a transporter using environment variables
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.CONTACT_EMAIL,   // your Gmail
                pass: process.env.CONTACT_PASS     // Gmail App Password
            }
        });

        // Send the email
        await transporter.sendMail({
            from: process.env.CONTACT_EMAIL, 
            to: process.env.CONTACT_EMAIL,      // your Gmail
            replyTo: email,
            subject: `Portfolio Contact Form — ${name}`,
            text: message,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br>${message}</p>`
        });

        res.status(200).json({ success: true, message: "Message sent!" });
    } catch (err) {
        console.error("Email send error:", err);
        res.status(500).json({ success: false, error: "Failed to send email." });
    }
});

module.exports = router;