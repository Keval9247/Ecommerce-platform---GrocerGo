const User = require("../models/User");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
// const products = require("../models/Product");
const Product = require("../models/Product");
const Cart = require('../models/Cart');
const sendEmail = require("../miidleware/sendEmail");
const uuid = require('uuid').v4
const stripe = require('stripe')('sk_test_51PbhHqDCseLm0wrzwqICMdQxhA3D2yeHKPxmPM5FLCMmTYtFp4fB2VMjXDS3LZNTMi03bEL9L6bPSycMmiXgwVo600s5CpcnOk')

const logincontroller = () => {
    return {
        readAll: async (req, res) => {
            try {
                const users = await User.find({}, ['name', 'email']);
                res.json(users);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        readOne: async (rea, res) => {
            try {
                const user = await Product.findById(rea.params.id, ['category', 'name', 'price', 'description']);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({
                    success: true,
                    message: "Product Retreived Successfully",
                    user: user
                })
                // res.json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        login: async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });
                console.log("🚀 ~ login: ~ user:", user.id)
                const payload = {
                    id: user._id,
                    // name: user.name,
                    email: user.email
                }
                if (!user) {
                    return res.status(400).json({ error: 'User not found' });
                }

                const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                // console.log("🚀 ~ login: ~ hashedPassword:", hashedPassword)
                if (hashedPassword !== user.password) {
                    return res.status(400).json({ error: 'Invalid credentials' });
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                // console.log("🚀 ~ login: ~ token:", token)

                res.cookie('token', `${token}`, { httpOnly: true })
                    .status(200).json({
                        success: true,
                        message: 'User logged in successfully',
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            token: token,
                            role: user.role
                        }
                    });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        signup: async (req, res) => {
            try {
                const { name, email, password, role } = req.body;
                console.log("🚀 ~ signup: ~ req.body:", req.body)
                const user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ error: 'User already exists' });
                }

                const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                const newUser = new User({ name, email, password: hashedPassword, token, role });
                await newUser.save();

                res.cookie('Authorization', `Bearer ${token}`)
                    .status(201).json({
                        success: true,
                        message: 'User registered successfully',
                        user: {
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email,
                            token: token,
                            role: newUser.role
                        }
                    });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        forgotPassword:async(req,res)=>{
            try{
                const user = await User.findOne({email: req.body.email});
                console.log("🚀 ~ forgotPassword:async ~ user:", user)
                if(!user){
                    return res.status(404).json({error: 'User not found'});
                }
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
                const resetLink = `http://localhost:3000/reset-password/${token}`;
                // Send email with reset link
                await sendEmail(user.email, 'Password Reset', `Click on this link to reset your password: ${resetLink}`);
                res.status(200).json({success: true, message: 'Reset password email sent'});
            }catch(error){
                res.status(500).json({error: error.message});
            }
        },
        ListProductsWithoutParams: async (req, res) => {
            try {
                const product = await Product.find({}, ['category', 'name', 'price', 'description']);
                if (!product) {
                    return res.status(404).json({ error: 'No products found' });
                }
                res.status(200).json({
                    success: true,
                    message: 'Products listed successfully',
                    count: product.length,
                    products: product,
                })
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        listproducts: async (req, res) => {
            try {
                const pagesize = 6;
                const pagenumber = parseInt(req.query.page ? req.query.page : 1);
                const startIndex = (pagenumber - 1) * pagesize;
                const endIndex = startIndex + pagesize;

                const product = await Product.find({}, ['category', 'name', 'price', 'description']);
                if (!product) {
                    return res.status(404).json({ error: 'No products found' });
                }
                const lastIndexForSliced = req.query.limit ? req.query.limit : product.length
                const slicedproducts = product.slice(startIndex, lastIndexForSliced);
                // console.log("🚀 ~ listproducts: ~ slicedproducts:", slicedproducts)

                // console.log("🚀 ~ listproducts: ~ endIndex:", endIndex)
                res.status(200).json({
                    success: true,
                    message: 'Products listed successfully',
                    count: slicedproducts.length,
                    currentPage: pagenumber,
                    totalPages: Math.ceil(product.length / pagesize),
                    products: slicedproducts,
                })
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        addproduct: async (req, res) => {
            try {
                const { name, price, description } = req.body;
                if (!req.file) {
                    return res.status(400).json({ error: 'No image provided' });
                }
                const Productname = await Product.findOne({ name });
                if (Productname) {
                    return res.status(400).json({ error: 'Product already exists' });
                }
                const imageUrl = `/images/${req.file.filename}`;

                const newProduct = new Product({ category: imageUrl, name, price, description });
                await newProduct.save();
                res.status(201).json({
                    success: true,
                    message: 'Product added successfully',
                    product: newProduct
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        createPayment: async (req, res) => {
            try {
                const { token, cartdata, totalPrice } = req.body;
                console.log("🚀 ~ createPayment: ~ product:", cartdata.items.map(item => item.price))
                // const { price, name } = product;

                if (!token || !token.email) {
                    return res.status(400).json({ error: 'Token or email is missing in the request' });
                }
                if (!cartdata || !cartdata.items) {
                    return res.status(400).json({ error: 'Product data (price, name) is missing in the request' });
                }
                // Create a customer with a payment method attached
                const customer = await stripe.customers.create({
                    email: token.email,
                    source: token.id, // This attaches the payment method (token) to the customer
                });
                const name = cartdata.items ? cartdata.items.map(item => item.name) : req.user.email
                console.log("🚀 ~ createPayment: ~ name:", name)

                // Create a PaymentIntent
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(totalPrice), // Convert to cents and round
                    currency: 'usd',
                    customer: customer.id,
                    description: `Purchase of ${name}`,
                    metadata: { idempotencyKey: uuid() },
                    payment_method_types: ['card'],
                    confirm: true, // Confirm the PaymentIntent immediately
                    off_session: true,
                    return_url: 'http://localhost:4000/', // Replace with your own return URL
                });
                console.log("🚀 ~ createPayment: ~ cartdata:", cartdata)
                res.status(200).json({
                    success: true,
                    message: 'Payment successful',
                    paymentIntentId: paymentIntent.id,
                });
            } catch (error) {
                console.error('Error creating payment:', error);
                res.status(500).json({ error: error.message });
            }
        },
        addToCart: async (req, res) => {
            try {
                console.log("🚀 ~ addToCart: ~ req.body:", req.body);
                if (!req.body) {
                    return res.status(400).json({ error: 'No image provided' });
                }

                const { price, productId, category } = req.body;
                const userId = req.user.id;

                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }

                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }

                let cart = await Cart.findOne({ userId: userId });
                if (!cart) {
                    cart = new Cart({ userId: userId, items: [] });
                }

                // Check if the product already exists in the cart
                const existingCartItem = cart.items.find(item => item.productId.toString() === productId);

                if (existingCartItem) {
                    // Increase quantity if the item already exists in the cart
                    existingCartItem.quantity++;
                } else {
                    // Add new item to cart if it doesn't exist
                    cart.items.push({
                        productId: productId,
                        quantity: 1, // Assuming quantity is 1 for a new item
                        price: price,
                        category: category // Assuming req.body contains the category
                    });
                }

                // Save the cart with updated items
                console.log("🚀 ~ addToCart: ~ cart:", cart);
                await cart.save();

                // Respond with success message and updated cart
                res.status(200).json({
                    success: true,
                    message: 'Product added to cart successfully',
                    cart: cart
                });
            } catch (error) {
                console.log('Error adding product to cart:', error);
                res.status(500).json({ error: error.message });
            }
        },

        getCart: async (req, res) => {
            try {
                const userId = req.user.id;
                let cart = await Cart.findOne({ userId: userId }, ['userId', 'category', 'items.productId', 'items.quantity', 'items.category', 'items.price'])
                console.log("🚀 ~ getCart: ~ cart:", cart)

                if (!cart) {
                    return res.status(404).json({ success: true, message: "Cart is Empty" });
                }

                res.status(200).json({
                    success: true,
                    message: 'Cart retrieved successfully',
                    cart: cart
                });
            } catch (error) {
                console.log('Error retrieving cart:', error);
                res.status(500).json({ error: error.message });
            }
        },

        removeFromCart: async (req, res) => {
            try {
                const { productId } = req.body;
                console.log("🚀 ~ removeFromCart: ~ productId:", productId)
                const userId = req.user.id;

                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }

                const cart = await Cart.findOne({ userId: userId });
                console.log("🚀 ~ removeFromCart: ~ a:", cart)
                // console.log("🚀 ~ removeFromCart: ~ cart:", cart)

                // if (!cart) {
                //     return res.status(404).json({ success: false, message: "Cart not found" });
                // }
                // const response = Cart.deleteOne

                cart.items = cart.items.filter(item => item.productId !== productId?.productId);
                // console.log("��� ~ removeFromCart: ~ b:", b)
                await cart.save();

                res.status(200).json({
                    success: true,
                    message: 'Product removed from cart successfully',
                    // cart: cart
                });
            } catch (error) {
                console.log('Error removing product from cart:', error);
                res.status(500).json({ error: error.message });
            }

        },
    }
}

module.exports = logincontroller;