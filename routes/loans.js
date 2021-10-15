//===============================
//ARCHIVO CON TODAS LAS RUTAS DE PRESTAMOS
//Rutas : localhost:4000/api/loans
//===============================

const { Router } = require('express');

const router = Router();
const { check } = require('express-validator');

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo');

//importamos los controladores que usaran en las rutas
const {
    createLoan,
    listLoans,
    lastCodeLoan,
} = require('../controllers/loansController');

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos clientes (POST) .../api/loans
router.post(
    '/', [
        check('requestId', 'El requestId es obligatorio').not().isEmpty(),
        check('amountInitial', 'El amountInitial del prestamo es obligatorio')
        .not()
        .isEmpty(),
        check('totalToPay', 'El totalToPay del prestamos es obligatorio')
        .not()
        .isEmpty(),
        check('dateaproved', 'El dateaproved del prestamos es obligatorio')
        .not()
        .isEmpty(),
        validarCampo,
    ],
    createLoan
);

//Ruta para listar a todos los prestasmos creados
router.get('/', listLoans);

//Ruta para buscar el ultimo valor de codigo utilizado
router.get('/lastCode', lastCodeLoan);

//Rutas para crear eliminar por ID (DELETE) .../api/customer/delete/id
/*router.delete('/delete/:id', [
    check('id', 'El ID del Customer es obligatorio').not().isEmpty(),
    validarCampo
], deleteCustomer)*/

//Rutas para crear actualizar clientes (PUT) .../api/customers/update/id
/*router.put('/update/:id', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('codeCustomer', 'El codeCustomer es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], updateCustomer)*/

//Funcion para actualizar el estado del Cliente  Active-NoActivo
/*router.put('/updateActive/:id', [
    check('LoanActive', 'El valor de Active es obligatorio').not().isEmpty(),
    validarCampo
], updateActiveCustomer)*/

module.exports = router;