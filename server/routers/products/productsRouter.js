const router = require('express').Router();
const productsMethods = require('./productsMethods');
const { verifyToken } = require('../../authentication/auth');

// vi får alla tillgängliga produkter
router.get('/getall', productsMethods.getProducts);

// vi får en specific produkt
router.get('/getone/:productid', productsMethods.getProduct)

// vi skapar en produkt
router.post('/create', verifyToken, productsMethods.createProduct)

// vi uppdaterar en produkt
router.patch('/update/:productid', verifyToken, productsMethods.updateProduct)

// vi tar bort en produkt
router.delete('/delete', verifyToken, productsMethods.deleteProduct)

module.exports = router;