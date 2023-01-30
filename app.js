const express = require('express'); //express.js için
const app = express(); // express'in çalıştırılması için
const morgan = require('morgan'); // will log API requests
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//app.use((req, res, next) => {
//    res.status(200).json({
//        message: 'it is working'
//    });  //200 OK bilgisi almak için ve string formatında olması için json metodu ile yazıyoruz
//})  //gelen istekler buradan geçiyor

app.use(morgan('dev')); // products ve orders'dan önce koyduk
// önce koyulmasının sebebi onlar çalışıyorken devrede olması için
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // json formatında çıkartılıp rahatça okunması için


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