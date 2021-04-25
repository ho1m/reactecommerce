const Cart = require('../../models/cartsModel');

module.exports = {
  getOrders (req, res) {
    //router.get('/checkedout/:userid', verifyToken, cartsMethods.getOrders);
    Cart.find({ user_id: req.params.userId, checked_out: true })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
  getCart (req, res) {
    Cart.findOne({ _id: req.params.cartid })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
  createCart (req, res) {
    Cart.create(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err))
  },
  createCartProduct (req, res) {
    Cart.updateOne({ _id: req.params.cartId }, { $push: { 
      products: {product: req.body, quantity: 1} 
    }})
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err))
  },
  changeCartProduct (req, res) {
    const type = req.params.type;
    Cart.updateOne({
      _id: req.params.cartId,
      products: {
        $elemMatch: {'product._id': req.params.productId}
      }
    }, {
      $inc: {
        'products.$.quantity': type === 'add' ? 1 : -1
      }
    })
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err))
  },
  deleteCartProduct (req, res) {
    Cart.updateOne({
      _id: req.params.cartId,
    }, { 
      $pull: { products: { 'product._id': req.params.productId } } 
    })
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err))
  },
  cartCheckedOut (req, res) {
    Cart.updateOne({ _id: req.params.cartId }, {
      checked_out: true
    }).then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  }
}

