
const mongoose = require('mongoose');

const db = ()=>{
    try {
        mongoose.connect(
            "mongodb+srv://rahulsinghrajput:EQzMfC4p9neIXyac@cluster0.kzobk.mongodb.net/birdio?retryWrites=true&w=majority"
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const connection = mongoose.connection

        connection.once('open', () => {
            console.log('Database Connected')
        })
    } catch (err) {
        console.log("database connection failed")
    }

}

module.exports = db;
