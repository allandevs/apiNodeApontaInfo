// 'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require ('./config')
const cors = require('cors');

 const app = express();
const router = express.Router();

//conecta ao banco
mongoose.connect(  config.connectionString ,{ useUnifiedTopology: true,useNewUrlParser: true } )
// mongoose.connect('mongodb://admin:admin@cluster0.dvf4k.azure.mongodb.net') 


//carrega os modelsclear

const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//carrega as rotas

const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
// const orderRoute = require ('./routes/order-route')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

  app.use(cors(corsOptions))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
// app.use('/orders', orderRoute);

// app.use(cors()) //Essa linha aqui
// app.use((req, res, next) => {
// 	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
//     res.header("Access-Control-Allow-Origin", "*");
// 	//Quais são os métodos que a conexão pode realizar na API
//     res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     app.use(cors());
//     next();
// });

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

module.exports = app;