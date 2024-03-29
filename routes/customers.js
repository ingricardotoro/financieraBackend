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
const { uploadPhotoCustomer, findCustomerById, createCustomer, listCustomer, deleteCustomer, updateCustomer, listCustomerByName, lastCodeCustomer, updateActiveCustomer, uploadCustomer } = require('../controllers/customersController')
const { upload } = require('../lib/fileHelper')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos clientes (POST) .../api/customers
router.post('/', [
    check('numCustomer', 'El numero de Cliente es obligatorio').not().isEmpty(),
    check('codeCustomer', 'El codeCustomer es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], createCustomer)

//Rutas para buscar clientes por ID (POST) .../api/customers/findCustomerById/:id
router.post('/findCustomerById/:id', [
    check('id', 'El Id del Customer es obligatorio').not().isEmpty(),
    validarCampo
], findCustomerById)

//Rutas para subir excel de nuevos clientes (POST) .../api/customers/upload
router.post('/upload', [
    //check('id', 'El Id del Customer es obligatorio').not().isEmpty(),
    validarCampo
], uploadCustomer)

//Ruta para listar a todos los clientes creados
router.get('/', listCustomer)
    //Ruta para buscar los clientes filtrados por nombre enviado por URL
    //router.get('/:name', listCustomerByName)
router.get('/lastCode', lastCodeCustomer)

//Rutas para crear actualizar cliente por ID (DELETE) .../api/customer/delete/id
router.delete('/delete/:id', [
        check('id', 'El ID del Customer es obligatorio').not().isEmpty(),
        validarCampo
    ], deleteCustomer)
    //mateo bonilla 2B
    //Rutas para crear actualizar clientes (PUT) .../api/customers/update/id
router.put('/update/:id', [
    check('personId', 'El personId es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], updateCustomer)


//router.post('/updatephoto', upload.single('file'))
//router.post('/subirfoto', upload.single('file'))
router.post('/subirfoto/:personid', upload.single('file'), uploadPhotoCustomer)

//Funcion para actualizar el estado del Cliente  Active-NoActivo
router.put('/updateActive/:id', [
    check('active', 'El valor de Active es obligatorio').not().isEmpty(),
    validarCampo
], updateActiveCustomer)


module.exports = router