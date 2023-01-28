const express = require('express'); //express.js için

const app = express(); // express'in çalıştırılması için

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
//app.use((req, res, next) => {
//    res.status(200).json({
//        message: 'it is working'
//    });  //200 OK bilgisi almak için ve string formatında olması için json metodu ile yazıyoruz
//})  //gelen istekler buradan geçiyor

app.use('/products', productRoutes);    // /products'a gelen istekler productRoutes'u çağıracak oda 
                                        // ./api/routes/products'u çağıracak
app.use('/orders', orderRoutes);

module.exports = app;