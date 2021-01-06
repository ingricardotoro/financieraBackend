//===============================
//ARCHIVO CON TODAS LAS RUTAS DE PAGOS
//Rutas : localhost:4000/api/payments
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')


//importamos los controladores que usaran en las rutas
const { findPaymentsByLoanId, createPayment, updateState } = require('../controllers/paymentsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos clientes (POST) .../api/payments
router.post('/', [
    check('loanId', 'El loanId es obligatorio').not().isEmpty(),
    check('dateToPay', 'El dateToPay del pago es obligatorio').not().isEmpty(),
    check('amountToPay', 'El amountToPay del pago es obligatorio').not().isEmpty(),
    check('amountToCapital', 'La amountToCapital del pago es obligatoria').not().isEmpty(),
    check('amountToInteres', 'El amountToInteres del pago es obligatorio').not().isEmpty(),
    validarCampo
], createPayment)

//Rutas para buscar pagos por ID de prestamos (POST) .../api/payments/findPaymentsByLoanId/:id
router.post('/findPaymentsByLoanId/:id', [
    check('id', 'El ID del prestamo es obligatorio').not().isEmpty(),
    validarCampo
], findPaymentsByLoanId)


//Funcion para actualizar el estado del PAgo  Pendiente-Pagado
router.put('/updateState/:id', [
    check('id', 'El valor de Pago es obligatorio').not().isEmpty(),
    validarCampo
], updateState)


module.exports = router