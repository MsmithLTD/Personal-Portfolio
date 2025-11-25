// models/booking.js
const mongoose = require('mongoose');

// Define booking schema
const bookingSchema = new mongoose.Schema({
    location: { type: String, required: true },
    lessonType: { type: String, required: true },
    lessonDate: { type: String, required: true },
    lessonTime: { type: String, required: true },
    instructor: { type: String, required: true },
    customerName: { type: String, required: true },
    customerContact: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;