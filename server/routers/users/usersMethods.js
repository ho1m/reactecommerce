const User = require('../../models/usersModel');
const bcrypt = require('bcrypt');
const auth = require('../../authentication/auth');

module.exports = {
  registerUser (req, res) {
    User.exists({ email: req.body.email }, (err, exists) => {
      if (err) return res.status(401).json(err);
      if (exists) {
        res.status(409).json({
          message: 'Email is in-use.'
        })
      } else {
        const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
        User.create({
          email: req.body.email,
          passwordHash: hash,
          name: req.body.name
        })
          .then(() => res.status(201).json({
            message: 'User has been created successfully!'
          }))
          .catch(err => res.status(500).json(err))
      }
    })
  },
  loginUser (req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).json(err);
      if (user) {
        const match = bcrypt.compareSync(req.body.password, user.passwordHash);
        if (match) {
          res.status(200).json({
            user: {
              _id: user._id,
              email: user.email,
              name: user.name,
            },
            currentCart: user.current_cart,
            token: auth.generateToken(user._id)
          })
        } else {
          res.status(409).json({
            message: 'Password does not match the email.'
          })
        }
      } else {
        res.status(404).json({
          message: `Email is incorrect.`
        })
      }
    })
  },
  updateCart (req, res) {
    /// updatecartid/:userId
    User.updateOne({ _id: req.params.userId }, {
      current_cart: req.body.current_cart
    }).then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  }
}
