const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Manager = require('./backend/dbManager');
const Unprotected = require('./routes/unprotected');
const authenticationRouter = require('./routes/authentication');
const lessonRoutes = require('./backend/controllers/controllers');
const contactRouter = require('./routes/contact'); // ⭐ add this

class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this._initializeMiddleware();
        this._initializeViewEngine();
        this._initializeRoutes();
    }

    _initializeViewEngine() {
        this.app.set('views', [path.join(__dirname, 'views')]);
        this.app.set('view engine', 'ejs');
    }

    _initializeMiddleware() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    _initializeRoutes() {
        this.app.use('/', Unprotected.router);
        this.app.use('/auth', authenticationRouter.router);
        this.app.use('/api', lessonRoutes);
        this.app.use('/contact', contactRouter); // ⭐ enable contact form
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }

    static initializeDatabase() {
        Manager.connect();
    }
}

const port = process.env.PORT || 3001;
const server = new Server(port);

Server.initializeDatabase();
server.start();

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    mongoose.disconnect().then(() => {
        console.log('Database disconnected.');
        process.exit();
    });
});