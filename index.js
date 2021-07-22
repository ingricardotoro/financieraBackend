const express = require('express')
const cors = require('cors')

const dbConnection = require('./database/database')
require('./config/config')

require('dotenv').config() // establecer uso de arvhivo env

//creacion del servidor express
const app = express()

//implementamos cors, para la seguridad en las peticiones
app.use(cors())

//definir el directorio publico
app.use(express.static(__dirname + '/public/customers/photos'))

//para permitir el contenido de peticiones json en req.body 
app.use(express.json({ limit: '50mb' }))

//hacemos el llamado de las rutas del routes
app.use(require('./routes/index'))

//========================
//Conectamos la base de datos
dbConnection()
    //============================

//Establecer el puerto del servidor
let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server on Port ${PORT} `)
})