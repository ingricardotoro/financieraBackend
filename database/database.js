const mongoose = require('mongoose')
require('../config/config')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB Connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar DataBase')
    }
}


module.exports = dbConnection