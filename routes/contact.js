const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.CONTACT_EMAIL,
                pass: process.env.CONTACT_PASS
            }
        });

        await transporter.sendMail({
            from: email,
            to: process.env.CONTACT_EMAIL,
            subject: `Portfolio Contact Form — ${name}`,
            text: message
        });

        res.status(200).send("Message sent!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Email failed.");
    }
});

module.exports = router;