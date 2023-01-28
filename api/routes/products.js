const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET istekleri buradan isliyor'
    });
}); // sadece / olmasının sebebi /products yazarsak aradığı şey /products/products olacak

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'POST istekleri buradan isliyor'
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