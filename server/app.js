// dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// routers
const usersRouter = require('./routers/users/usersRouter');
const cartsRouter = require('./routers/carts/cartsRouter');
const productsRouter = require('./routers/products/productsRouter');

//
const app = express();

// middleware
app.use(cors(), morgan('dev'), helmet(), express.json());

app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
app.use('/products', productsRouter);

//
module.exports = app;
