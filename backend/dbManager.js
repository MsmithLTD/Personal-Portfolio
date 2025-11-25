const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Booking = require('./models/booking'); // Import the existing Booking model

class Manager {
    static connect() {
        const mongoDB = process.env.DB_CONN;
        if (!mongoDB) {
            console.error('Error: Database connection string (DB_CONN) is not defined in the environment variables.');
            return;
        }

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Database Connected'))
            .catch(err => console.error('Database Connection Error:', err));

        const db = mongoose.connection;

        db.on('close', () => console.log('Database Closed'));
        db.on('disconnected', () => console.log('Database Disconnected'));
        db.on('open', () => console.log('Database Opened'));
        db.on('reconnected', () => console.log('Database Reconnected'));
        db.on('reconnecting', () => console.log('Database Reconnecting'));
        db.on('disconnecting', () => console.log('Database Disconnecting'));
    }

    static disconnect() {
        mongoose.disconnect()
            .then(() => console.log('Database Disconnected'))
            .catch(err => console.error('Database Disconnection Error:', err));
    }

    // Now you can use the Booking model in other parts of your application
    static getBookingModel() {
        return Booking;
    }
}

module.exports = Manager;