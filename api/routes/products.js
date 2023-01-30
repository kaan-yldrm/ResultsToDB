const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../Models/productModel');
//productModel.js'den Product'u getirmek için

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET istekleri buradan isliyor'
    });
}); // sadece / olmasının sebebi /products yazarsak aradığı şey /products/products olacak

router.post('/', (req, res, next) => {
//    const product = {
//        name: req.body.name,
//        price: req.body.price
//    };

// alttaki MongoAtlas ile beraber çalışmasında
// üstteki ise postman'dan giriş yaparken kullandığın

const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price        
    });

    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    // product bilgilerini kaydeder ve sonucunu çıkartır, hata verdiyse hatayı çıkartır.
    res.status(201).json({
        message: 'POST istekleri buradan isliyor',
        createdProduct: product
    });
});


router.get('/:productID', (req, res, next) => { // Burada /Products'un altına yeni alt birimler ekliyoruz
    const id = req.params.productID;
    if ( id === 'kaan') {
        res.status(200).json ({
            message: 'you have found me'        // /products/kaan girersen bu çıktıyı veriyor
        });
    } else {
        res.status(200).json ({
            message: 'Yeni bir Id girdin'       // /products/xxx yani herhangi bir şey girdiğinde bu çıktıyı veriyor
        });
    }
});
 
router.patch('/productID', (req, res, next) => {
    res.status(200).json ({
        message: 'Yeni Id yi guncelledin'
    });
});

router.delete('/productID', (req, res, next) => {
    res.status(200).json ({
        message: 'Id yi sildin'
    });
});



module.exports = router; // ile router artık server tarafından kullanılabilir hale geliyor.