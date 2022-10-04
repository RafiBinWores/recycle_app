const express = require('express');
const routes = express.Router();
const recycleController = require('../controllers/recycleController');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// routers
routes.get('/', recycleController.homepage);
routes.get('/product/:id', recycleController.productDetails);
routes.get('/categories/:id', recycleController.categoryPageById);
routes.post('/search', recycleController.searchProduct);

routes.get('/login', recycleController.userLogin);
routes.get('/register', recycleController.userRegister);
routes.post('/register', recycleController.userRegister);




module.exports = routes;