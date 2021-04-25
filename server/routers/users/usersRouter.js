const router = require('express').Router();
const usersMethods = require('./usersMethods');
const { verifyToken } = require('../../authentication/auth');

// vi registrerar en användare
router.post('/register', usersMethods.registerUser);

// vi verfierer en användare och returnerar token med användarens basic info
router.post('/login', usersMethods.loginUser);

// vi ändrar current_cart, antingen lägger vi cart id eller tar bort
router.patch('/updatecartid/:userId', verifyToken, usersMethods.updateCart);

module.exports = router;