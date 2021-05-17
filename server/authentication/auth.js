require('dotenv').config();
const jwt = require('jsonwebtoken');

const key = process.env.SECRET_KEY;

module.exports = {
  generateToken (id, role = 'user') {
    return jwt.sign({id, role}, key);
  },

  verifyToken (req, res, next) {
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
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { role } = jwt.decode(token, key)
      if (role === 'admin') {
        next()
      }
    } catch (error) {
      res.status(409).json({
        ...error,
        message: 'Unauthorized'
      });
    }
  }
};
