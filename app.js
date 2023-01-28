const express = require('express'); //express.js için

const app = express(); // express'in çalıştırılması için

app.use((req, res, next) => {
    res.status(200).json({
        message: 'it is working'
    });  //200 OK bilgisi almak için ve string formatında olması için json metodu ile yazıyoruz
})  //gelen istekler buradan geçiyor

module.exports = app;