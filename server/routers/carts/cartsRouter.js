const router = require('express').Router();
const cartsMethods = require('./cartsMethods');
const { verifyToken } = require('../../authentication/auth');

// här får vi alla carts som har checked_out = true av en användare
router.get('/checkedout/:userId', verifyToken, cartsMethods.getOrders);

// här får vi en specific cart
router.get('/one/:cartid', cartsMethods.getCart);

// här skapar vi en cart, när t.ex. en användare trycker på add to cart
router.post('/create', cartsMethods.createCart);

// här slutför vi en cart
router.patch('/checkedout/:cartId', cartsMethods.cartCheckedOut);

// vi lägger produkt till cart
router.patch('/:cartId/products/create', cartsMethods.createCartProduct);

// vi ökar eller minskar antal produkt inom cart
router.patch('/:cartId/products/:productId/:type', cartsMethods.changeCartProduct);

// vi tar bort produkt från cart
router.delete('/:cartId/products/:productId', cartsMethods.deleteCartProduct);

module.exports = router;