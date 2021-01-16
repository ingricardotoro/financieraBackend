//===============================
//ARCHIVO CON TODAS LAS RUTAS DE REPORTES
//Rutas : localhost:4000/api/reports
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')


//importamos los controladores que usaran en las rutas
const { reportCalculator, fetchReportCalculator } = require('../controllers/reportsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos clientes (POST) .../api/avals
/*router.post('/', [
    check('codeAval', 'El codeAval es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], createAval)*/


//Ruta para GENERAR el reporte del calculo en la seccion de calculadora
router.post('/reportCalculator', reportCalculator)

//Ruta para ENVIAR el reporte del calculo en la seccion de calculadora
router.get('/fetchReportCalculator', fetchReportCalculator)


module.exports = router