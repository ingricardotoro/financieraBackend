//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Solicitudes
//Rutas : localhost:4000/api/requests
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')


//importamos los controladores que usaran en las rutas
const { createRequest, listRequest, deleteRequest, updateRequest } = require('../controllers/requestsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos solicitudes (POST) .../api/request
router.post('/', [
    check('customerId', 'El customerId es obligatorio').not().isEmpty(),
    check('codeRequest', 'El codeRequest es obligatorio').not().isEmpty(),
    check('typeLoan', 'El tipo de Solicitud de la persona es obligatorio').not().isEmpty(),
    check('amount', 'El monto de la solicitud es obligatorio').not().isEmpty(),
    check('rate', 'La tasa de interes es obligatoria').not().isEmpty(),
    check('frequency', 'La frecuendia de pagos es obligatoria').not().isEmpty(),
    check('quota', 'El numeo de cuotas es obligatoria').not().isEmpty(),
    check('quotaValue', 'El valor de la cuota es obligatoria').not().isEmpty(),
    check('totalInterest', 'El total de interes es obligatoria').not().isEmpty(),
    check('closingCost', 'El costo de Cierre es obligatorio').not().isEmpty(),
    check('startDate', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('sucursal', 'La Sucursal es obligatoria').not().isEmpty(),
    //check('stateRequest', 'La Sucursal es obligatoria').not().isEmpty(),
    //check('createdBy', 'El id del usuario es obligatorio').not().isEmpty(),

    validarCampo
], createRequest)

//Ruta para listar a todos los clientes creados
router.get('/', listRequest)
    //Ruta para buscar los clientes filtrados por nombre enviado por URL
    //router.get('/:name', listCustomerByName)

//Rutas para crear actualizar cliente por ID (DELETE) .../api/customer/delete/id
//router.delete('/delete/:id', deleteCustomer)

//Rutas para crear actualizar clientes (PUT) .../api/customers/update/id
/*router.put('/update/:id', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('codeCustomer', 'El codeCustomer es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    //check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], updateCustomer)*/


module.exports = router