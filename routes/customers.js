//===============================
//ARCHIVO CON TODAS LAS RUTAS DE CUSTOMERS
//Rutas : localhost:4000/api/customers
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')


//importamos los controladores que usaran en las rutas
const { createCustomer, listCustomer, deleteCustomer, updateCustomer, listCustomerByName } = require('../controllers/customersController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos clientes (POST) .../api/customers
router.post('/', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('codeCustomer', 'El codeCustomer es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], createCustomer)

//Ruta para listar a todos los clientes creados
router.get('/', listCustomer)
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