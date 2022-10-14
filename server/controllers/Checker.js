// this file is responsible for
// checking wheither user is logged in or not

const jwt = require("jsonwebtoken");

const AuthCheck = (req,res,next) => {

  try {

    const token = req.signedCookies[process.env.COOKIE_NAME];

    const decoded = jwt.verify(token,process.env.JWT_TOKEN);

    req.user = decoded;
    res.locals.userInformation = decoded;

    next();
    
  } catch (error) {
    res.redirect("/login");
  }
} 

const DecodeInformation = (req, res, next) => {
  const token = req.signedCookies[process.env.COOKIE_NAME];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded;

    res.locals.userInformation = decoded;

  } catch (error) {
   
    // noting to do here execpt
    res.locals.userInformation = {}
  }

  next();
};

module.exports = {
  AuthCheck,
  DecodeInformation
}