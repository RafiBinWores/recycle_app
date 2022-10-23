require('../models/database');

/* packages */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url = require("url");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
/* models */
const User = require('../models/User');
const UserVerification = require('../models/UserVerification');

const Category = require('../models/Category');
const Product = require('../models/Product');
const { search } = require('../routes/recycleRoutes');


let transporter = nodemailer.createTransport({

    service : "gmail",
    auth : {
  
      user : process.env. AUTH_EMAIL,
      pass : process.env.AUTH_PASS,
    }
  
  
  })


// get / homepage
exports.homepage = async(req, res) => {

    try {
        const limitNumber = 8;
        const categories = await Category.find({}).limit(limitNumber);

        const latest = await Product.find({}).sort({_id: -1});

        const usedProduct = { latest };


        res.render('index', { title: 'Recycle | Home Page', categories, usedProduct});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// get / product /id 
exports.productDetails = async(req, res) => {

    try {
        let productId = req.params.id;

        const product = await Product.findById(productId);

        res.render('product', { title: 'Recycle | single ad page', product});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// get categoryPageByID
// categoryPageByID
exports.categoryPageById = async(req, res) => {

    try {
        let categoryId = req.params.id;
        const limitNumber = 8;
        const categories = await Category.find({}).limit(limitNumber).sort({name: 1});

        const categoryById = await Product.find({'category': categoryId}).sort({_id: -1});

        res.render('categories', { title: 'Recycle | Explore Categories', categoryById, categories, categoryId});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// post / search

exports.searchProduct = async(req, res) =>{

    //Search
    try {
        let searchItem = req.body.searchItem;
        const categories = await Category.find({}).sort({name: 1});

        let product = await Product.find({ $text: { $search: searchItem, $diacriticSensitive: true }});

        res.render('search', {title: 'Recycle | Search', product, categories});
    } catch (error) {

        res.status(500).send({message: error.message || "Error Occured"});
    }

}

//get // userProfile page 
exports.profilePage = async(req, res) =>{

    res.render('userProfile', {title: 'Recycle | Your Profile'});
}





//get // user ads page 
exports.userAdsPage = async(req, res) =>{

    // console.log(req.user.userid);
    res.render('userAds', {title: 'Recycle | Your Ads'});
}

//get // mail confirmation page
exports.mailConfirmationStatusPage = async(req, res) =>{

    res.render('mailConfirmation', {title: 'Recycle | Verify your email addess'});
}


//get // userlogin
exports.userLogin = async(req, res) =>{

    // check user is already logged in or not 
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(cookies){
        let token = cookies[process.env.COOKIE_NAME];

        if(token){
            res.redirect("/");
        }else{
            res.render('login', {title: 'Recycle | Login'});
        }

    }else{
    res.render('login', {title: 'Recycle | Login'});
    }
}

//get // user register
exports.userRegister = async(req, res) =>{

    res.render('register', {title: 'Recycle | Sign Up'});
}

// get // reset password
exports.userResetPassword = async(req,res) => {
    
    res.render('resetPassword', {title: 'Recycle | Reset Password' });
}

// get // open the sell form 
exports.openSellForm = async(req,res) => {

    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')

    res.render('postAds', {title: 'Recycle | Post Your Ads', infoErrorsObj, infoSubmitObj});
}


// post // post ad form
exports.postAdsForm = async(req,res) => {

    try {

        let imageUploadFile1;
        let uploadPath1;
        let newImageName1;

        let imageUploadFile2;
        let uploadPath2;
        let newImageName2;

        let imageUploadFile3;
        let uploadPath3;
        let newImageName3;
        
        let imageUploadFile4;
        let uploadPath4;
        let newImageName4;

        if(!req.files || Object.keys(req.files).length == 0){
        console.log('No Files uploaded.');
        } else {

            imageUploadFile1 = req.files.image1;
            imageUploadFile2 = req.files.image2;
            imageUploadFile3 = req.files.image3;
            imageUploadFile4 = req.files.image4;

            newImageName1 = Date.now() + imageUploadFile1.name;
            newImageName2 = Date.now() + imageUploadFile2.name;
            newImageName3 = Date.now() + imageUploadFile3.name;
            newImageName4 = Date.now() + imageUploadFile4.name;

            uploadPath1 = require('path').resolve('./') + '/public/uploads/' + newImageName1;
            uploadPath2 = require('path').resolve('./') + '/public/uploads/' + newImageName2;
            uploadPath3 = require('path').resolve('./') + '/public/uploads/' + newImageName3;
            uploadPath4 = require('path').resolve('./') + '/public/uploads/' + newImageName4;

            imageUploadFile1.mv(uploadPath1, function(err){
                if(err) return res.satus(500).send(err);
            })
            imageUploadFile2.mv(uploadPath2, function(err){
                if(err) return res.satus(500).send(err);
            })
            imageUploadFile3.mv(uploadPath3, function(err){
                if(err) return res.satus(500).send(err);
            })
            imageUploadFile4.mv(uploadPath4, function(err){
                if(err) return res.satus(500).send(err);
            })
        }
        
        const newProduct = new Product({

            ownerId: req.params._id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            location: req.body.location,
            image1: newImageName1,
            image2: newImageName2,
            image3: newImageName3,
            image4: newImageName4,
            brand: req.body.brand,
            description: req.body.description,
            pNumber: req.body.pNumber,
               
        });

        await newProduct.save();
      
        req.flash('infoSubmit', 'Product has been added.');
        res.redirect('postAds');
    } catch (error) {

        req.flash('infoErrors', error);
        res.redirect('postAds');
    }
}



// post // user registration
exports.userPostRegister = async(req,res) => {
   

    const {email,password,confirmpassword} = req.body;

    if(password.length < 8){
        res.render("register",{
            title: 'Recycle | Sign Up',
            message : "please provide at least 8 character for password"
        })
    }
    else if( password != confirmpassword){
        res.render("register",{
            title: 'Recycle | Sign Up',
            message : "password didn't match properly"
        })
    }
    else{

        try{

            const hashedPassword = await bcrypt.hash(password,10);

            // check for existing user
            const SingleUser = await User.findOne({ email: email });

            if(SingleUser){
                res.render("register",{
                    message: "User Already Exists"
                })
            }else{

                const newUser = new User({
                    email: email,
                    password: hashedPassword,
                    isVerified: false,
                });

                const result = await newUser.save();

                sendEmail(result,res);
            }
        }catch(error)
        {
            console.log(error);
            res.render("register",{
                message: "Unknown error occured"
            })
        }
    }
}

// open important message html
exports.importentMessage = async(req,res) => {
    res.sendFile(
        path.join(__dirname +"./../../views/message.html")
    )
}

// verifying clickable link from email
exports.verifyLink = async(req,res) => {

    try {
        const { userId, uniqueString } = req.params;
        const user_verification = await UserVerification.find({ userId });

        if(user_verification.length > 0)
        {
            const { expiresAt } = user_verification[0];
            const hasheduniqueString = user_verification[0].uniqueString;

            if(expiresAt < Date.now())
            {
                const deleteId = await UserVerification.deleteOne({ userId });

                const deleteUserData = await User.deleteOne({ _id: userId });

                let message = "Link has been expired. Please sign up again. ";
                  // res.redirect(`/register/verified/error=true&message=${message}`);
                  res.redirect(
                    url.format({
                      pathname: "/register/verified/",
                      query: {
                        error: true,
                        message: message,
                      },
                    })
                  );
            }else{

                const compareString = await bcrypt.compare(uniqueString, hasheduniqueString);

                if(compareString){

                    const updateUser_verdict = await User.updateOne({ _id: userId}, { isVerified: true });

                    const delete_existing_verification =
                    await UserVerification.deleteOne({ userId });

                    res.sendFile(
                        path.join(__dirname +"./../../views/message.html")
                    )
                }else{

                    let message =
                  "Invalid verification details passed. Check your inbox.";
                res.redirect(
                  url.format({
                    pathname: "/register/verified/",
                    query: {
                      error: true,
                      message: message,
                    },
                  })
                );

                }
            }
        }else{

            let message = encodeURIComponent(
                "Account record doesn't exist or has been verified already. Please sign up or log in. "
              );

              res.redirect(
                url.format({
                  pathname: "/register/verified/",
                  query: {
                    error: true,
                    message: message,
                  },
                })
              );
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            error: error.message,
        })
    }
}


// post userlogin request
exports.postUserLogin = async(req,res) =>{
    
    try {

        let { useremail, userpassword } = req.body;

    // check user exists or not
    const CheckExistence = await User.find({ email: useremail });

    if(CheckExistence.length > 0)
    {
        // check the user already verified or not
        if(!CheckExistence[0].isVerified){

            // send a message
            res.render("login",{
                message: "Email hasn't been verified.",
            });
        } else {

            const hashedPassword = CheckExistence[0].password;

            const passwordCheck = await bcrypt.compare(userpassword,hashedPassword);

            if(passwordCheck){
                const token = jwt.sign({
                    useremail: CheckExistence[0].email,
                    userid: CheckExistence[0]._id,
                    
                },process.env.JWT_TOKEN,
                {
                    expiresIn: process.env.JWT_EXPIRE,
                });

                res.cookie(process.env.COOKIE_NAME,token,{
                    expires: new Date(
                        Date.now() + parseInt(process.env.JWT_EXPIRE)
                    ),
                    httpOnly: true,
                    signed: true
                });

                res.redirect("/");
            }else{

                res.render("login", {
                    message: "password is incorrect!",
                  });
            }
        }
    }else{

        res.render("login", {
            message: "Invalid credentials entered!",
          });
    }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).render("login",{
            message: "An error occured while checking for exisiting user",

        });
    }
}

// delete cookie and log out user
exports.LogoutUser = async (req,res) =>{
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("signing out")
}








const sendEmail = ({ _id, email}, res) => {

    const currentUrl = `${process.env.APP_URL}`;
    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email Address",
        html: `<h2> Welcome to Recycle</h2>
                       <p> verify your email address to complete the signup and login into your account</p>  
                       <p> This link expires in <b>1 hour </b></p>
                       <p> <a href=${
                         currentUrl + "register/verify/" + _id + "/" + uniqueString
                       }> click here </a> to proceed </p>`,
      };

      bcrypt
      .hash(uniqueString,10)
      .then((hashedString) => {

        const newVerification = new UserVerification({

            userId: _id,
            uniqueString: hashedString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000, 
        });

        newVerification
        .save()
        .then(() => {

            transporter
            .sendMail(mailOptions)
            .then(() => {

                res.render("mailConfirmation");
                console.log(`Email send to ${email}`);
            })
            .catch((error) => {

                let message =
                "Verification email failed! Please try again later.";

              res.redirect(
                url.format({
                  pathname: "/register/verified/",
                  query: {
                    error: true,
                    message: message,
                  },
                })
              );
       


            })

        })
        .catch(() => {

            res.json({
                message:
                  "An error occured while saving verification email data! Please try again later.",
              });

        })

      })
      .catch(() => {

        res.json({
            message:
              "An error occured while hashing email data! Please try again later.",
          });

      })

}




// moment 





// async function insertDammyCategoryData(){
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Mobiles",
//                 "image": "smartphone.png"
//             },
//             {
//                 "name": "Electronics",
//                 "image": "tv.png"
//             },
//             {
//                 "name": "Home & Living",
//                 "image": "furniture.png"
//             },
//             {
//                 "name": "Fashion & Beauty",
//                 "image": "fashion.png"
//             },
//             {
//                 "name": "Sports",
//                 "image": "sport.png"
//             },
//             {
//                 "name": "Toys",
//                 "image": "blocks.png"
//             },
//             {
//                 "name": "Bikes",
//                 "image": "bycicle.png"
//             },
//             {
//                 "name": "Books",
//                 "image": "open-book.png"
//             }
        
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDammyCategoryData();








// async function insertDammyProductData(){
//     try {
//         await Product.insertMany([
//             {
//                 "name": "Samsung Galaxy S22 test",
//                 "price": "50,000",
//                 "category": "Mobiles",
//                 "location": "Chandpur",
//                 "image1": "s22-1.jpg",
//                 "image2": "s22-2.jpg",
//                 "image3": "s22-3.jpg",
//                 "image4": "s22-4.jpg",
//                 "brand": "Samsung",
//                 "description": "Almost  new just 1 month used. ",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
// //             {
// //                 "name": "Legos test",
// //                 "price": "1000",
// //                 "category": "Toys",
// //                 "image1": "lego-1.jpg",
// //                 "image2": "lego-2.jpg",
// //                 "image3": "lego-3.jpg",
// //                 "image4": "lego-4.jpg",
// //                 "brand": "lego",
// //                 "description": "star wars edition lego set ",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
// //             {
// //                 "name": "Mix toys combo test",
// //                 "price": "2000",
// //                 "category": "Toys",
// //                 "image1": "toys-1.jpg",
// //                 "image2": "toys-2.jpg",
// //                 "image3": "toys-3.jpg",
// //                 "image4": "toys-4.jpg",
// //                 "brand": "Unknown",
// //                 "description": "mix toys set.",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
// //             {
// //                 "name": "Washing Machine test",
// //                 "price": "10,000",
// //                 "category": "Electronics",
// //                 "image1": "washing-1.jpg",
// //                 "image2": "washing-2.jpg",
// //                 "image3": "washing-3.jpg",
// //                 "image4": "washing-4.jpg",
// //                 "brand": "Lg",
// //                 "description": "Almost  new just 4 month used.",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
// //             {
// //                 "name": "Lg ultrawide tv test",
// //                 "price": "15,000",
// //                 "category": "Electronics",
// //                 "image1": "tv-1.jpg",
// //                 "image2": "tv-2.jpg",
// //                 "image3": "tv-3.jpg",
// //                 "image4": "tv-4.jpg",
// //                 "brand": "Lg",
// //                 "description": "Almost  new just 1 month used. warranty available",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
// //             {
// //                 "name": "Badminton rackets test",
// //                 "price": "800",
// //                 "category": "Sports",
// //                 "image1": "racket-1.jpg",
// //                 "image2": "racket-2.jpg",
// //                 "image3": "racket-3.jpg",
// //                 "image4": "racket-4.jpg",
// //                 "brand": "adidas",
// //                 "description": "Almost  new. just 3 month used. ",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
// //             {
// //                 "name": "Football test",
// //                 "price": "1,800",
// //                 "category": "Sports",
// //                 "image1": "football-1.jpg",
// //                 "image2": "football-2.jpg",
// //                 "image3": "football-3.jpg",
// //                 "image4": "football-4.jpg",
// //                 "brand": "adidas",
// //                 "description": "Almost  new. just played few match.",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
// //             {
// //                 "name": "leather sofa",
// //                 "price": "100,000",
// //                 "category": "Home & Living",
// //                 "image1": "sofa-1.jpg",
// //                 "image2": "sofa-2.jpg",
// //                 "image3": "sofa-3.jpg",
// //                 "image4": "sofa-4.jpg",
// //                 "brand": "apple",
// //                 "description": "awidh awd89 a9a dnha9 daih d9awdc9aw9d hauc8awhdwd  awdgawd ",
// //                 "pNumber": [
// //                     "01706602203",
// //                     "01626980009"
// //                 ],
// //             },
// //             {
// //                 "name": "chair test",
// //                 "price": "8,000",
// //                 "category": "Home & Living",
// //                 "image1": "chair-1.jpg",
// //                 "image2": "chair-2.jpg",
// //                 "image3": "chair-3.jpg",
// //                 "image4": "chair-4.jpg",
// //                 "brand": "unknown",
// //                 "description": "Almost  new. just 3 month used. ",
// //                 "pNumber": [
// //                     "01706602203",
// //                 ],
// //             },
            
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDammyProductData();