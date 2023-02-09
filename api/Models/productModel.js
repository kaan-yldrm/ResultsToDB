const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // special id for data
    name: String,
    price: Number
});

//async function run() {
//    await mongoose.connect('localhost:3000');
//    mongoose.model('Product', productSchema);
//}
//await mongoose.model('Product').findOne();
//
module.exports = mongoose.model('Product', productSchema);