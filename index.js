const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(expresslayouts);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recycleRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));