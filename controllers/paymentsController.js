const moment = require('moment')
const Payment = require('../models/Payment')

const createPayment = async(req, res) => {

    const {
        loanId,
        code,
        dateToPay,
        amountToPay,
        amountToCapital,
        amountToInteres

    } = req.body

    newPayment = new Payment({
        loanId,
        code,
        dateToPay,
        amountToPay,
        amountToCapital,
        amountToInteres
    })


    try {
        if (await newPayment.save()) {

            res.status(201).json({
                ok: true,
                msg: 'PAGO Realizado exitosamente',
                newLoan
            })

        } else {
            res.status(500).json({
                ok: false,
                msg: 'Error Realizando Nuevo Pago',
            })
        }
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New Payment"
        })
    }

}


const findPaymentsByLoanId = async(req, res) => {

    let id = req.params.id

    await Payment.find({ loanId: id }).sort('dateToPay')
        .exec(function(err, payments) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Pagos Encontrados",
                payments
            })

        });
}


//Realizamos pago solo a intereses
const pagosDeAbono = async(data, id, payment, res) => {

    let Data = {}

    let estatus = ''
    if (parseFloat(payment.balance) > 0) { // en caso de ser un nuevo abono, o pagar el saldo pendiente

        let deudaActual = parseFloat(payment.balance) + parseFloat(data.amountToMora) + parseFloat(data.otherPay) - parseFloat(data.discount)
            //en caso de pagar el total del saldo pendiente
        if (parseFloat(data.amountPayed) === deudaActual) {
            estatus = 'Pagada'
        }
        if (parseFloat(data.amountPayed) < deudaActual) {
            estatus = 'Abonado'
        }

        Data = {

            statusPay: estatus,
            methodPayed: data.methodPayed,
            amountPayed: parseFloat(data.amountPayed) + parseFloat(payment.amountPayed),
            amountToMora: parseFloat(data.amountToMora),
            otherPay: (parseFloat(data.otherPay)),
            discount: (parseFloat(data.discount)),

            balance: (parseFloat(payment.balance)) +
                (parseFloat(data.otherPay)) +
                (parseFloat(data.amountToMora)) -
                (parseFloat(data.discount)) -
                (parseFloat(data.amountPayed)),

            inFavor: parseFloat(0.0),

            datePayed: Date.now()

        }

    } else { // en caso de ser el primer abono a pagar

        let deudaActual = parseFloat(payment.amountToPay) + parseFloat(data.amountToMora) + parseFloat(data.otherPay) - parseFloat(data.discount)

        if (parseFloat(data.amountPayed) === deudaActual) { // en caso de pagar la cuota completa
            estatus = 'Pagada'
        }
        if (parseFloat(data.amountPayed) < deudaActual) {
            estatus = 'Abonado'
        }

        Data = {

            statusPay: estatus,
            methodPayed: data.methodPayed,
            amountPayed: parseFloat(data.amountPayed),
            amountToMora: (parseFloat(data.amountToMora)),
            otherPay: (parseFloat(data.otherPay)),
            discount: (parseFloat(data.discount)),

            balance: (parseFloat(payment.amountToPay)) +
                (parseFloat(data.otherPay)) +
                (parseFloat(data.amountToMora)) -
                (parseFloat(data.discount)) -
                (parseFloat(data.amountPayed)),

            inFavor: parseFloat(0.0),

            datePayed: Date.now()

        }
    }

    //console.log(Data)

    await Payment.findByIdAndUpdate(id, Data, {
        new: true, //devuelve el objeto actualizado
    }, (err, paymentDB) => {

        //en caso de tener algun error en save()
        if (err) {

            return res.status(500).json({
                ok: false,
                msj: "Error Actualizando Pago a Intereres",
                err
            })
        }

        //evaluaremos si NO se modifico el pago
        if (!paymentDB) {
            res.status(500).json({
                ok: false,
                msj: "Error Actualizando Pago a Intereres",
                err
            })
        }

        //en caso de que Si se actualizo el pago
        res.status(200).json({
            ok: true,
            msj: "Pago a Intereses actualizado Exitosamente",
        })

    })
}

const getPaymnetByLoanIdAndCode = async(loanId, code) => {

    await Payment.find({ loanId, code })
        .exec(function(err, payment) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return payment

        });
}

const calcularDeuda = (payment, frecuency) => {

    let moradiaria = 0

    let fechaFin = moment() //today

    let fechaI = moment(payment.dayToPay);
    let duration = fechaFin.diff(fechaI, 'days')
    duration = parseInt(duration) + 1

    let mora = 0.0
    if (duration > parseInt(frecuency)) {
        mora = parseFloat(payment.amountToPay) * 0.03
        moradiaria = parseFloat(mora) / parseInt(frecuency)
    }

    let moraDeCuota = parseFloat(moradiaria) * (duration)

    return parseFloat(payment.amountToPay) + parseFloat(moraDeCuota)
}

const PagarCuotaExacta = async(payment, data) => {

    Data = {
        statusPay: 'Pagada',
        methodPayed: data.methodPayed,
        amountPayed: parseFloat(payment.amountToPay),
        amountToMora: parseFloat(payment.amountToMora),
        otherPay: (parseFloat(0.0)),
        discount: (parseFloat(0.0)),
        balance: (parseFloat(0.0)),
        inFavor: parseFloat(0.0),
        datePayed: Date.now()
    }

    await Payment.findByIdAndUpdate(payment._id, Data, {
        new: true, //devuelve el objeto actualizado
    }, (err, paymentDB) => {

        //en caso de tener algun error en save()
        if (err) {

            console.log("Error actulizando Pago:" + err)
        }

        //evaluaremos si NO se modifico el pago
        if (!paymentDB) {
            console.log("Error actulizando paymentDB:" + err)
        }

    })

}

const DarAbono = async(payment, Abono, data) => {

    Data = {
        statusPay: 'Abono',
        methodPayed: data.methodPayed,
        amountPayed: parseFloat(Abono),
        datePayed: Date.now()
    }

    await Payment.findByIdAndUpdate(payment._id, Data, {
        new: true, //devuelve el objeto actualizado
    }, (err, paymentDB) => {

        //en caso de tener algun error en save()
        if (err) {

            console.log("Error actulizando Abono de Pago:" + err)
        }

        //evaluaremos si NO se modifico el pago
        if (!paymentDB) {
            console.log("Error actulizando Abono de paymentDB:" + err)
        }

    })

}

const PagarCuotasRecursivas = (saldoAFavor, data, loanId, code) => {

    let payment = getPaymnetByLoanIdAndCode(loanId, code)
    let deudaR = calcularDeuda(payment, data.frecuency) // total de cuota + mora
    let saldoAFavorR = saldoAFavor - deudaR

    //en caso que el saldoAFavor cubra la cuota completa o mas
    if (saldoAFavorR >= 0) {
        PagarCuotaExacta(payment, data) //pagamos la cuota exacta y retornamos el sobrante
            //obtenemos siguiente pago
        if (saldoAFavorR > 0) { // al pagar todo lo posible o la ultimo cuota no vuelve a repetir la funcion
            return PagarCuotasRecursivas(saldoAFavorR, data, loanId, parseInt(payment.code) + 1);
        }
    } else {
        //en caso que el saldo a favor no cubra la cuota siguiente, solo sera un abono, o es la ultima cuota
        DarAbono(payment, saldoAFavorR, data)
    }
}

const PagoSuperior = (data, payment, res) => {
    //confirmamos que el valor pagado sea mayor a la deuda de esta primera cuota
    let saldoAFavor = parseFloat(data.amountPayed) - (parseFloat(payment.amountToPay) + parseFloat(data.amountToMora) + parseFloat(data.otherPay) - parseFloat(data.discount))

    if (saldoAFavor > 0) {
        //si sobra saldo a Favor lo enviamos a pagar recursivamente otras cuotas
        PagarCuotasRecursivas(parseFloat(data.amountPayed), data, payment.loanId, parseInt(payment.code))
    }

    //en caso de que Si se actualizon los pagos
    res.status(200).json({
        ok: true,
        msj: "Pagos ralizados Exitosamente ",
    })


}

const updatePayment = async(req, res) => {

    let id = req.params.id //Id del payment que esta pagando

    await Payment.findById(id)
        .exec(async function(err, payment) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msj: "Error en updatePayment",
                    err
                })
            }
            /***********en caso de pagar menos que la cuota designada**********/

            console.log(parseFloat(req.body.amountPayed).toFixed(2) + "---" + parseFloat(payment.amountToPay).toFixed(2))

            let deuda = parseFloat(payment.amountToPay) + parseFloat(req.body.otherPay) + parseFloat(req.body.amountToMora) - parseFloat(req.body.discount)

            if (parseFloat(req.body.amountPayed) <= deuda) {

                console.log("PAGO IGUAL O MENOR")
                pagosDeAbono(req.body, id, payment, res)

            } else {
                console.log("PAGO SUPERIOR")
                PagoSuperior(req.body, payment, res)
            }

        })


    //if (parseFloat(req.body.amountPayed).toFixed(2) < parseFloat(cuota).toFixed(2)) {


    //}


    //en caso de pagar la cuota exacta requerida
    /*if (parseFloat(req.body.amountPayed).toFixed(2) >= parseFloat(cuota).toFixed(2)) {


        let saldoAFavor = parseFloat(req.body.amountPayed).toFixed(2) -
            parseFloat(cuota).toFixed(2) -
            parseFloat(req.body.amountToMora).toFixed(2) -
            parseFloat(req.body.otherPay).toFixed(2)

        //en caso de sobrar dinero despues de pagar la cuota , mora y otros pagos
        if (saldoAFavor > 0) {

            //debemos acreditar saldo a favor en el siguiente pago

        } else { //en caso que halla pagado la cantidad exacta que debe en esta cuota

            try {

                let data = {

                    statusPay: 'Pagada',
                    methodPayed: req.body.methodPayed,
                    amountPayed: req.body.amountPayed,
                    //amountToCapital: req.body.amountToCapital,
                    //amountToInteres: req.body.amountToInteres,
                    amountToMora: req.body.amountToMora,
                    otherPay: req.body.otherPay,
                    discount: req.body.discount,
                    datePayed: Date.now()

                }

                await Payment.findByIdAndUpdate(id, data, {
                    new: true, //devuelve el objeto actualizado
                }, (err, paymentDB) => {

                    //en caso de tener algun error en save()
                    if (err) {

                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    //evaluaremos si NO se modifico el pago
                    if (!paymentDB) {
                        res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    //en caso de que Si se actualizo el pago
                    res.status(200).json({
                        ok: true,
                        msj: "Estado de Pado actualizado Exitosamente  (Pagada)",
                    })

                })
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    ok: false,
                    msg: "Error actualizando Pago"
                })
            }

        }

    }*/

}

const findPaymentById = async(req, res) => {

    let id = req.params.id

    await Payment.findById(id)
        .exec(function(err, payment) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Payment Encontrado",
                payment
            })

        });
}


module.exports = { findPaymentsByLoanId, updatePayment, createPayment, findPaymentById }