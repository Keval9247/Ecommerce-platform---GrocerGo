const express = require('express');
const router = express.Router();
const logincontroller = require('../controller/logincontroller');
const multer = require('multer')
const imageupload = require('../miidleware/uploadImage');
const authMiddleware = require('../miidleware/authMiddleware');


router.post('/add', logincontroller().signup);
router.post('/login', logincontroller().login);
router.post('/forgot-password', logincontroller().forgotPassword);

// List all products
// router.get('/list-products', logincontroller().ListProductsWithoutParams);
router.get('/list-products', logincontroller().listproducts);

router.post('/addProduct', authMiddleware,
    imageupload.imageupload.single('category'),
    logincontroller().addproduct,
)
router.get('/product/:id', authMiddleware, logincontroller().readOne);
router.post('/cart/add', authMiddleware,
    imageupload.imageupload.single('category'),
    logincontroller().addToCart);

router.delete('/cart/remove', authMiddleware, logincontroller().removeFromCart);
router.get('/cart', authMiddleware, logincontroller().getCart);

router.post('/create-payment', authMiddleware, logincontroller().createPayment);



module.exports = router;
