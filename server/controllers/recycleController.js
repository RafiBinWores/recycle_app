require('../models/database');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { search } = require('../routes/recycleRoutes');
const User = require('../models/User');


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
        let product = await Product.find({ $text: { $search: searchItem, $diacriticSensitive: true }});
        res.render('search', {title: 'Recycle | Search', product});
    } catch (error) {

        res.status(500).send({message: error.message || "Error Occured"});
    }

}


//get // userlogin
exports.userLogin = async(req, res) =>{

    res.render('login', {title: 'Recycle | Login'});
}

//post // user register
exports.userRegister = async(req, res) =>{

    res.render('register', {title: 'Recycle | Sign Up'});
}




















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
//             {
//                 "name": "Legos test",
//                 "price": "1000",
//                 "category": "Toys",
//                 "image1": "lego-1.jpg",
//                 "image2": "lego-2.jpg",
//                 "image3": "lego-3.jpg",
//                 "image4": "lego-4.jpg",
//                 "brand": "lego",
//                 "description": "star wars edition lego set ",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
//             {
//                 "name": "Mix toys combo test",
//                 "price": "2000",
//                 "category": "Toys",
//                 "image1": "toys-1.jpg",
//                 "image2": "toys-2.jpg",
//                 "image3": "toys-3.jpg",
//                 "image4": "toys-4.jpg",
//                 "brand": "Unknown",
//                 "description": "mix toys set.",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
//             {
//                 "name": "Washing Machine test",
//                 "price": "10,000",
//                 "category": "Electronics",
//                 "image1": "washing-1.jpg",
//                 "image2": "washing-2.jpg",
//                 "image3": "washing-3.jpg",
//                 "image4": "washing-4.jpg",
//                 "brand": "Lg",
//                 "description": "Almost  new just 4 month used.",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
//             {
//                 "name": "Lg ultrawide tv test",
//                 "price": "15,000",
//                 "category": "Electronics",
//                 "image1": "tv-1.jpg",
//                 "image2": "tv-2.jpg",
//                 "image3": "tv-3.jpg",
//                 "image4": "tv-4.jpg",
//                 "brand": "Lg",
//                 "description": "Almost  new just 1 month used. warranty available",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
//             {
//                 "name": "Badminton rackets test",
//                 "price": "800",
//                 "category": "Sports",
//                 "image1": "racket-1.jpg",
//                 "image2": "racket-2.jpg",
//                 "image3": "racket-3.jpg",
//                 "image4": "racket-4.jpg",
//                 "brand": "adidas",
//                 "description": "Almost  new. just 3 month used. ",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
//             {
//                 "name": "Football test",
//                 "price": "1,800",
//                 "category": "Sports",
//                 "image1": "football-1.jpg",
//                 "image2": "football-2.jpg",
//                 "image3": "football-3.jpg",
//                 "image4": "football-4.jpg",
//                 "brand": "adidas",
//                 "description": "Almost  new. just played few match.",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
//             {
//                 "name": "leather sofa",
//                 "price": "100,000",
//                 "category": "Home & Living",
//                 "image1": "sofa-1.jpg",
//                 "image2": "sofa-2.jpg",
//                 "image3": "sofa-3.jpg",
//                 "image4": "sofa-4.jpg",
//                 "brand": "apple",
//                 "description": "awidh awd89 a9a dnha9 daih d9awdc9aw9d hauc8awhdwd  awdgawd ",
//                 "pNumber": [
//                     "01706602203",
//                     "01626980009"
//                 ],
//             },
//             {
//                 "name": "chair test",
//                 "price": "8,000",
//                 "category": "Home & Living",
//                 "image1": "chair-1.jpg",
//                 "image2": "chair-2.jpg",
//                 "image3": "chair-3.jpg",
//                 "image4": "chair-4.jpg",
//                 "brand": "unknown",
//                 "description": "Almost  new. just 3 month used. ",
//                 "pNumber": [
//                     "01706602203",
//                 ],
//             },
            
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDammyProductData();