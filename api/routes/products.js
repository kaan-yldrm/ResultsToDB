const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../Models/productModel');  //productModel.js'den Product'u getirmek için



router.get('/', (req, res, next) => {
    Product.find()
    
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


//router.get('/', (req, res, next) => {
//    res.status(200).json({
//        message: 'GET istekleri buradan isliyor'
//    });
//}); // sadece / olmasının sebebi /products yazarsak aradığı şey /products/products olacak


//    const product = {
//        name: req.body.name,
//        price: req.body.price
//    };

// alttaki MongoAtlas ile beraber çalışmasında
// üstteki ise postman'dan giriş yaparken kullandığın
router.post('/', (req, res, next) => {
const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price        
    });

    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'POST istekleri buradan isliyor',
            createdProduct: product // POSTMAN'deki yaptığım girdiler ile burada bilgiler ile product'u oluşturuyor
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });  // product bilgilerini kaydeder ve sonucunu çıkartır, hata verdiyse hatayı çıkartır.
});


//router.get('/:productID', (req, res, next) => { // Burada /Products'un altına yeni alt birimler ekliyoruz
//const id = req.params.productID;
//    if ( id === 'kaan') {
//        res.status(200).json ({
//            message: 'you have found me'        // /products/kaan girersen bu çıktıyı veriyor
//        });
//    } else {
//        res.status(200).json ({
//            message: 'Yeni bir Id girdin'       // /products/xxx yani herhangi bir şey girdiğinde bu çıktıyı veriyor
//        });
//    }
//});


router.get("/:productID", (req, res, next) => {//
    const id = req.params.productID;
    Product.findById(id, {$set: req.body}, {new:true})
    .exec()
    .then(doc => {
        console.log("From database", doc); // işlemi paylaşıp kaydetmek için
        if (doc) {
            res.status(200).json(doc);
        }   else {
            res.status(404).json({message: "No valid entry found"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
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