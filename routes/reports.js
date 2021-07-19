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
const {
    reportCalculator,
    fetchReportCalculator,
    reportTrimestral,
    fetchReportTrimestral,
    reportCancel,
    fetchReportCancel,
    reportIngresos,
    fetchReportIngresos,
    reportColocados,
    fetchReportColocados,
    reportMora,
    fetchReportMora


} = require('../controllers/reportsController')

//=======================
//RUTAS
//=======================

//Ruta para GENERAR el reporte del calculo en la seccion de calculadora
router.post('/reportCalculator', reportCalculator)

//Ruta para ENVIAR el reporte del calculo en la seccion de calculadora
router.get('/fetchReportCalculator', fetchReportCalculator)


//Ruta para GENERAR el reporte Trimestral
router.post('/report_trimestral', reportTrimestral)
    //Ruta para ENVIAR el reporte Trimestral
router.get('/fetchReportTrimestral', fetchReportTrimestral)

//Ruta para GENERAR el reporte de Ingresos Mensuales
router.post('/report_ingresos', reportIngresos)
    //Ruta para ENVIAR el reporte de Ingresos Mensuales
router.get('/fetchReportIngresos', fetchReportIngresos)

//Ruta para GENERAR el reporte de nuevos Prestamos Colocados
router.post('/report_colocados', reportColocados)
    //Ruta para ENVIAR el reporte de nuevos Prestamos Colocados
router.get('/fetchReportColocados', fetchReportColocados)

//Ruta para GENERAR el reporte de Mora Activa
router.post('/report_mora', reportMora)
    //Ruta para ENVIAR el reporte de de Mora Activa
router.get('/fetchReportMora', fetchReportMora)



//Ruta para GENERAR el reporte de Prestamos Cancelados
router.post('/report_cancel', reportCancel)
    //Ruta para ENVIAR el reporte de Prestamos Cancelados
router.get('/fetchReportCancel', fetchReportCancel)


module.exports = router