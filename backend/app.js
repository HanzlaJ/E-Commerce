const express = require('express');
const app = express();


const cookieparser = require('cookie-parser');

app.use(express.json());
app.use(cookieparser());

//import product routes
const product = require('./routes/productRoute');
app.use('/api/v1',product);

//import user routes
const user = require('./routes/userRoute');
app.use('/api/v1',user);

// import order

const order = require('./routes/orderRoute');
app.use('/api/v1',order);

//import middleware
const errorMiddleWare = require('./middleware/error');
app.use(errorMiddleWare);

module.exports = app;