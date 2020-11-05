//==========================
//Esta funcion nos permite recibir los errores que se reciben por req
//y los enviamos de una manera mas clara
//===========================

const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampo = (req, res = response, next) => {

    //obtenemos el resultado del error que llega
    const errors = validationResult(req)
    console.log(errors)

    //revisamos si tiene errores y los mostramos
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}

module.exports = { validarCampo }