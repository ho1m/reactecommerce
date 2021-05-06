const router = require('express').Router();
const adminMethods = require('./adminMethods');
const { verifyAdmin } = require('../../authentication/auth');


router.post('/register', adminMethods.registerAdmin)
router.post('/login', adminMethods.loginAdmin)
router.patch('/order/:orderId/status', verifyAdmin, adminMethods.orderStatusChange)
router.patch('/user/:userId', verifyAdmin, adminMethods.updateUser)


module.exports = router;
