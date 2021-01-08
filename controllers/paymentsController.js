const Payment = require('../models/Payment')

const createPayment = async(req, res) => {

    const {

        loanId,
        dateToPay,
        amountToPay,
        amountToCapital,
        amountToInteres

    } = req.body

    newPayment = new Payment({
        loanId,
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


const updateState = async(req, res) => {

    let id = req.params.id

    try {

        let data = {

            statusPay: 'Pagada',
            methodPayed: req.body.methodPayed,
            amountPayed: req.body.amountPayed,
            amountToMora: req.body.amountToMora,
            otherPay: req.body.otherPay,
            discount: req.body.discount,
            datePayed: req.body.datePayed

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


module.exports = { findPaymentsByLoanId, updateState, createPayment }