const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // special id for data
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);
//