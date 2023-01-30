const express = require('express'); //express.js için
const app = express(); // express'in çalıştırılması için
const morgan = require('morgan'); // will log API requests
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Henlo1here:" + process.env.MONGO_ATLAS_PWD + "@henlo.2m8afdg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//app.use((req, res, next) => {
//    res.status(200).json({
//        message: 'it is working'
//    });  //200 OK bilgisi almak için ve string formatında olması için json metodu ile yazıyoruz
//})  //gelen istekler buradan geçiyor

app.use(morgan('dev')); // products ve orders'dan önce koyduk
// önce koyulmasının sebebi onlar çalışıyorken devrede olması için
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // json formatında çıkartılıp rahatça okunması için

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * olarak belirlemek erişimin herhangi bir adrese açık olduğunu belirtiyor
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next(); // next olmaz ise if çalışmadığı durumlarda diğer kısımlara geçmiyor
});

app.use('/products', productRoutes);    // /products'a gelen istekler productRoutes'u çağıracak oda 
// ./api/routes/products'u çağıracak
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = Error('Cant find anything here partner');
    error.status = 404;
    next(error); // error değişkenini iletir
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// /products veya /orders'ı bulamaz ise bir hata sayfası
// çıktısı vermek için

module.exports = app;