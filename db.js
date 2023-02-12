const mongoose = require('mongoose');

const conn = () => {
    mongoose.connect(process.env.mogodb_uri,{
        dbName: "Henlo1here",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( () => {
        console.log("Mongodb atlas bagli")
    }).catch( (err) => {
        console.log(`Mongodb baglanti hatasi ${err}`)
    });
};

module.exports = conn;