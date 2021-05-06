require('dotenv').config();
const jwt = require('jsonwebtoken');

const key = process.env.SECRET_KEY;

module.exports = {
  generateToken (id, role = 'user') {
    return jwt.sign({id, role}, key);
  },

  verifyToken (req, res, next) {
    console.log(req.headers.authorization)
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, key)
      next();
    } catch (error) {
      res.status(409).json({
        ...error,
        message: 'Unauthorized'
      });
    }
  },

  verifyAdmin (req, res, next) {
    console.log("hello");
    const token = req.headers.authorization.split(' ')[1];
    const ting = jwt.decode(token, key)
    console.log(ting, "*****")
    next()
  }
};
