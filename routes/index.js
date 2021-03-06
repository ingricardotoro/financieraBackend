const express = require('express')
const app = express()

//Ruta para la authenticacion
//app.use('/api/auth', require('./auth'))

//Ruta para la gestion de usuario
//app.use('/api/users', require('./user'))

//Ruta para la gestion de Clientes
app.use('/api/customers', require('./customers'))

//Ruta para la gestion de Clientes
app.use('/api/avals', require('./avals'))

//Ruta para la gestion de Solicitudes
app.use('/api/requests', require('./requests'))

//Ruta para la gestion de Prestamos
app.use('/api/loans', require('./loans'))

//Ruta para la gestion de Pagos
app.use('/api/payments', require('./payments'))

//Ruta para la gestion de reportes
app.use('/api/reports', require('./reports'))

module.exports = app