const express = require('express');
const routes = express.Router();
const recycleController = require('../controllers/recycleController');

// routers
routes.get('/', recycleController.homepage);
routes.get('/product/:id', recycleController.productDetails);
routes.get('/categories/:id', recycleController.categoryPageById);
routes.post('/search', recycleController.searchProduct);






module.exports = routes;