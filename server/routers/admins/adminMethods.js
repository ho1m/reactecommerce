const Admin = require('../../models/adminsModel');
const User = require('../../models/usersModel');
const Cart = require('../../models/cartsModel');
const bcrypt = require('bcrypt');
const auth = require('../../authentication/auth');

module.exports = {
  registerAdmin (req, res) {
    Admin.exists({ email: req.body.email }, (err, exists) => {
      if (err) return res.status(401).json(err);
      if (exists) {
        res.status(409).json({
          message: 'Email is in-use.'
        })
      } else {
        const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
        Admin.create({
          email: req.body.email,
          passwordHash: hash,
          name: req.body.name
        })
          .then(() => res.status(201).json({
            message: 'Admin has been created successfully!'
          }))
          .catch(err => res.status(500).json(err))
      }
    })
  },
  loginAdmin (req, res) {
    Admin.findOne({ email: req.body.email }, (err, admin) => {
      if (err) return res.status(500).json(err);
      if (admin) {
        const match = bcrypt.compareSync(req.body.password, admin.passwordHash);
        if (match) {
          res.status(200).json({
            user: {
              _id: admin._id,
              email: admin.email,
              name: admin.name,
            },
            currentCart: admin.current_cart,
            token: auth.generateToken(admin._id, 'admin')
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
  orderStatusChange (req, res) {
    Cart.updateOne({ _id: req.params.orderId }, req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
  updateUser (req, res) {
    User.updateOne({ _id: req.params.userId }, req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
}