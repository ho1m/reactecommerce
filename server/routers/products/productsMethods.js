const Product = require('../../models/productsModel');

module.exports = {
  getProducts (req, res) {
    Product.find()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
  getProduct (req, res) {
    Product.findOne({ _id: req.params.productid})
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
  createProduct (req, res) {
    Product.exists({ name: req.body.name }, (err, exists) => {
      if (err) return res.status(401).json(err);
      if (exists) {
        res.status(409).json({ message: 'Product exists already' })
      } else {
        Product.create(req.body)
          .then(data => res.status(200).json(data))
          .catch(err => res.status(500).json(err))
      }
    })
  },
  updateProduct (req, res) {
    Product.updateOne({ _id: req.params.productid }, req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },
  deleteProduct (req, res) {
    Product.deleteOne({ _id: req.params.productid })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  }
}
