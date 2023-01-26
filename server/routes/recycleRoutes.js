const express = require('express');
const routes = express.Router();
const recycleController = require('../controllers/recycleController');

const { DecodeInformation, AuthCheck} = require("../controllers/Checker")

// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '../public/uploads'))
//     },
//     filename: function(req, file, cb){
//         const name = Date.now+'-'+file.original.name;
//         cb(null, name);
//     }
// });

// const upload = multer({ storage: storage });


// routers
routes.get('/', DecodeInformation, recycleController.homepage);
routes.get('/product/:id', DecodeInformation, recycleController.productDetails);
routes.get('/categories/:id', DecodeInformation, recycleController.categoryPageById);
routes.post('/search', DecodeInformation, recycleController.searchProduct);
routes.get('/locations', DecodeInformation, recycleController.locationPage);
routes.get('/locations/:id', DecodeInformation, recycleController.locationPageById);

routes.get('/userProfile/:id',AuthCheck, recycleController.profilePage);
routes.post('/userProfile/:id',AuthCheck, recycleController.updateProfileById);
routes.get('/userAds/:id', AuthCheck, recycleController.userAdsPage);
routes.get('/changePassword', AuthCheck, recycleController.changePasswordPage);
// routes.post("/changePassword/", AuthCheck, recycleController.updatePassword);

routes.get('/ads', AuthCheck, recycleController.adsPage);
routes.get('/postAds/:id', AuthCheck, recycleController.openSellForm);
routes.post('/postAds/:id', AuthCheck, recycleController.postAdsForm);
routes.get('/postRentAds/:id', AuthCheck, recycleController.openRentForm);
routes.post('/postRentAds/:id', AuthCheck, recycleController.postRentAdsForm);


routes.get('/mailConfirmation', recycleController.mailConfirmationStatusPage);

routes.get('/login', recycleController.userLogin);
routes.get('/register', recycleController.userRegister);
routes.get("/resetpassword",recycleController.userResetPassword);
routes.get("/register/verified",recycleController.importentMessage);
routes.get("/register/verify/:userId/:uniqueString",recycleController.verifyLink);
routes.post('/register', recycleController.userPostRegister);
routes.post("/login",recycleController.postUserLogin);

routes.delete("/",recycleController.LogoutUser);

module.exports = routes;