const express = require('express'); // Ensure express is required
const accountModel = require('../models/products'); // Assuming this is your account model
const bookingModel = require('../models/booking'); // Add the booking model import here
const Encrypt = require('../encrypt/encrypt');
const jwt = require('../jwt');
const router = express.Router();

class UserController {
    // Create user
    static async create(req, res) {
        const { username, email, password } = req.body;
        console.log(username);
        const user = new accountModel({ username, email, password });

        try {
            await user.save();
            res.status(200).json({ message: "User Created" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }

    // Validate user login
    static async validate(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }

            // Get user from database
            const user = await accountModel.findOne({ email });

            if (!user)
                return res.status(400).json({ error: "Invalid Credentials" });

            // Compare passwords
            const validated = Encrypt.validatePassword(password, user.password);

            if (!validated)
                return res.status(400).json({ error: "Unauthorized" });

            const data = {
                name: user.name,
                email: user.email,
            };

            const token = await jwt.createToken(process.env.SECRET_KEY, data, '1d');
            res.cookie('jwt_user', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            });

            return res.status(200).json({ message: "Logged In" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // POST route to handle lesson booking
    static async bookLesson(req, res) {
        try {
            const {
                location,
                lessonType,
                lessonDate,
                lessonTime,
                instructor,
                customerName,
                customerContact,
            } = req.body;

            // Check if all required fields are provided
            if (
                !location ||
                !lessonType ||
                !lessonDate ||
                !lessonTime ||
                !customerName ||
                !customerContact
            ) {
                return res.status(400).json({ message: 'Missing required fields.' });
            }

            // Create a new booking
            const newBooking = new bookingModel({
                location,
                lessonType,
                lessonDate,
                lessonTime,
                instructor,
                customerName,
                customerContact,
            });

            // Save the booking to the database
            const savedBooking = await newBooking.save();

            res.status(201).json(savedBooking); // Return the saved booking
        } catch (error) {
            console.error('Error saving booking:', error);
            res.status(500).json({ message: 'Failed to save booking' });
        }
    }
}

// Routes
// router.post('/create', UserController.create);
// router.post('/validate', UserController.validate);
// router.post('/lessons', UserController.bookLesson);

module.exports = UserController;