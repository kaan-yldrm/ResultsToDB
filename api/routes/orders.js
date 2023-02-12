const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json ({
        message: 'Siparisler getirildi'
    });
}); // yine /orders/orders olmasın diye tek / ile bitirdik, asıl işlemi app.js de yapacağız

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json ({ // 201 success için
        message: 'Siparis olusturuldu',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => { // : ile dinakmik oluyor
    res.status(200).json ({
        message: 'Siparis detayi',
        orderId: req.params.orderId,
        quantity: req.body.quantity
    });
});

router.delete('/:orderId', (req, res, next) => { // : ile dinakmik oluyor
    res.status(200).json ({
        message: 'Siparis silindi',
        orderId: req.params.orderId
    });
});


module.exports = router;
