const session = require('express-session');

const connectMongo = require('connect-mongo');

const mongoose = require('mongoose');

module.exports = app => {
    app.set('trust proxy', 1);

    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 60000
            }, 
            store: connectMongo.create({
                mongoUrl: process.env.MONGODB_URI
            })
        })
    );
};