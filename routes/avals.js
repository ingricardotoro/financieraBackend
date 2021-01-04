//===============================
//ARCHIVO CON TODAS LAS RUTAS DE AVALES
//Rutas : localhost:4000/api/avals
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')


//importamos los controladores que usaran en las rutas
const { findAvalById, createAval, listAval, deleteAval, updateAval, listAvalByName, lastCodeAval, updateActiveAval } = require('../controllers/avalsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos clientes (POST) .../api/avals
router.post('/', [
    check('codeAval', 'El codeAval es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], createAval)

//Rutas para buscar avales por ID (POST) .../api/customers/findCustomerById/:id
router.post('/findAvalById/:id', [
    check('id', 'El ID del Aval es obligatorio').not().isEmpty(),
    validarCampo
], findAvalById)

//Ruta para listar a todos los avales creados
router.get('/', listAval)

router.get('/lastCode', lastCodeAval)

router.delete('/delete/:id', [
    check('id', 'El ID del Aval es obligatorio').not().isEmpty(),
    validarCampo
], deleteAval)

//Rutas para crear actualizar Avales (PUT) .../api/avals/update/id
router.put('/update/:id', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('codeAval', 'El codeAval es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], updateAval)

//Funcion para actualizar el estado del Aval  Active-NoActivo
router.put('/updateActive/:id', [
    check('active', 'El valor de Active es obligatorio').not().isEmpty(),
    validarCampo
], updateActiveAval)


module.exports = router