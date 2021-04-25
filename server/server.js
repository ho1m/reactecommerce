require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 9090;
const mongoURI = process.env.MONGO_URI;
const serverURI = `http://localhost:${port}`;

// listener
app
  .listen(port, () => {
    console.log(`Listening on ${serverURI}`)
  });

// kopplar oss till mongodb databasen
mongoose
  .connect(mongoURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }, () => {
    console.log('**DB CONNECTED')
  });
