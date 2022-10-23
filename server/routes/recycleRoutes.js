const express = require('express');
const routes = express.Router();
const recycleController = require('../controllers/recycleController');

const { DecodeInformation, AuthCheck} = require("../controllers/Checker")


// routers
routes.get('/', DecodeInformation, recycleController.homepage);
routes.get('/product/:id', DecodeInformation, recycleController.productDetails);
routes.get('/categories/:id', DecodeInformation, recycleController.categoryPageById);
routes.post('/search', DecodeInformation, recycleController.searchProduct);

routes.get('/userProfile',AuthCheck, recycleController.profilePage);
routes.get('/userAds', AuthCheck, recycleController.userAdsPage);
routes.get('/mailConfirmation', recycleController.mailConfirmationStatusPage);

routes.get("/postAds",AuthCheck,recycleController.openSellForm);
routes.post("/postAds",AuthCheck,recycleController.postAdsForm);

routes.get('/login', recycleController.userLogin);
routes.get('/register', recycleController.userRegister);
routes.get("/resetpassword",recycleController.userResetPassword);
routes.get("/register/verified",recycleController.importentMessage);
routes.get("/register/verify/:userId/:uniqueString",recycleController.verifyLink);
routes.post('/register', recycleController.userPostRegister);
routes.post("/login",recycleController.postUserLogin);

routes.delete("/",recycleController.LogoutUser);

module.exports = routes;