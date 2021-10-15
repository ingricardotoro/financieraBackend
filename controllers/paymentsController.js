const moment = require('moment');
const Payment = require('../models/Payment');
const Customer = require('../models/Customer');
const { route } = require('../routes/loans');

const createPayment = async(req, res) => {
    const {
        loanId,
        code,
        dateToPay,
        amountToPay,
        amountToCapital,
        amountToInteres,
    } = req.body;

    newPayment = new Payment({
        loanId,
        code,
        dateToPay,
        amountToPay,
        amountToCapital,
        amountToInteres,
    });

    try {
        if (await newPayment.save()) {
            res.status(201).json({
                ok: true,
                msg: 'PAGO Realizado exitosamente',
                newLoan,
            });
        } else {
            res.status(500).json({
                ok: false,
                msg: 'Error Realizando Nuevo Pago',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating New Payment',
        });
    }
};

//buscamos el id del cliente mediante codeCustomer
const findCustomerByCode = (code) => {
    let id_customer = null;
    Customer.find({ codeCustomer: code }, '_id')
        //.populate('personId')
        .exec(function(err, customer) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            //confirmamos que el cliente exista
            if (customer[0] !== undefined) {
                //console.log(customer[0]);
                id_customer = customer[0]._id;
                return id_customer;
            }
        });
};

//Funcion para recibir el archivo de pagos
const UploadPaymentFile = async(req, res) => {
    newsPayments = req.body.rows;
    newsPayments.map((payment) => {
        //let codeCustomer = customer[0]
        //console.log(payment[3]);
        if (payment[3] !== undefined) {
            //separamos la fila en arreglos despues de la letra C
            let words = payment[3].split('C');

            //nos centramos en el ultimo objeto del arreglo
            let code = words[words.length - 1];

            //confirmamos que el codigo sea nuemerico
            const regex = /[A-Z,a-z]/g;
            const found = code.match(regex);
            if (!found) {
                // solo aceptara codigos numericos
                let id = findCustomerByCode('C' + parseInt(code));
                console.log(id);
                //obtener los datos del este cliente por codigo
                /*findCustomerByCode('C' + parseInt(code))
                                    .then((data) => {
                                        id = data;
                                        console.log(id);
                                    })
                                    .catch((err) => {
                                        console.log('ERR=' + err);
                                    });*/

                //obtener el id prestamos actualmente activo id payment
                //obtener el codigo de proximo pago pendiente  code
                //enviar el pago
            } // finaliza la comprobacion de solo numericos
        }

        /*if (customer[0] !== 'codeCustomer') {
                                                                                                                                                                                                                                                                                                                                                                                                                                //  customer.numCustomer = customer[0]

                                                                                                                                                                                                                                                                                                                                                                                                                                savePerson(customer).then((newPerson) => {

                                                                                                                                                                                                                                                                                                                                                                                                                                    saveCustomer(newPerson, codeCustomer).then((newCustomer) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                        console.log("Customer creado. " + newCustomer)
                                                                                                                                                                                                                                                                                                                                                                                                                                    })

                                                                                                                                                                                                                                                                                                                                                                                                                                }).catch((err) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                    console.log("Err=" + err)
                                                                                                                                                                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                                                                                                                                                            }*/
    });
    //rows.map((row) => codes.push(row[row.length - 1]));

    //console.log(rows);
    //console.log(codes);

    return res.status(200).json({
        ok: true,
    });
};

const findPaymentsByLoanId = async(req, res) => {
    let id = req.params.id;

    await Payment.find({ loanId: id })
        .sort('dateToPay')
        .exec(function(err, payments) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            res.status(200).json({
                ok: true,
                msg: 'Pagos Encontrados',
                payments,
            });
        });
};

//Realizamos pago solo a intereses
const pagosDeAbono = async(data, id, payment, res) => {
    let Data = {};

    let estatus = '';
    if (parseFloat(payment.balance) > 0) {
        // en caso de ser un nuevo abono, o pagar el saldo pendiente
        console.log('PAGANDO MAS ABONO');
        /*let deudaActual =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        parseFloat(payment.balance) +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        parseFloat(data.amountToMora) +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        parseFloat(data.otherPay) -
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        parseFloat(data.discount);*/
        //en caso de pagar el total del saldo pendiente
        if (parseFloat(data.amountPayed) === payment.balance) {
            estatus = 'Pagada';
        }
        if (parseFloat(data.amountPayed) < payment.balance) {
            estatus = 'Abonado';
        }

        let balanceString = (
            parseFloat(payment.balance) - parseFloat(data.amountPayed)
        ).toFixed(2);

        Data = {
            statusPay: estatus,
            methodPayed: data.methodPayed,
            amountPayed: parseFloat(data.amountPayed) + parseFloat(payment.amountPayed),
            amountToMora: parseFloat(data.amountToMora),
            otherPay: parseFloat(data.otherPay),
            discount: parseFloat(data.discount),
            balance: parseFloat(balanceString),

            inFavor: parseFloat(0.0),

            datePayed: moment(),
        };
    } else {
        // en caso de ser el primer abono a pagar
        console.log('PRIMER ABONO');

        let deudaActual =
            parseFloat(payment.amountToPay) +
            parseFloat(data.amountToMora) +
            parseFloat(data.otherPay) -
            parseFloat(data.discount);

        if (parseFloat(data.amountPayed) >= deudaActual) {
            // en caso de pagar la cuota completa
            estatus = 'Pagada';
        }
        if (parseFloat(data.amountPayed) < deudaActual) {
            estatus = 'Abonado';
        }

        let balanceString = (
            parseFloat(payment.amountToPay) +
            parseFloat(data.otherPay) +
            parseFloat(data.amountToMora) -
            parseFloat(data.discount) -
            parseFloat(data.amountPayed)
        ).toFixed(2);

        Data = {
            statusPay: estatus,
            methodPayed: data.methodPayed,
            amountPayed: parseFloat(data.amountPayed),
            amountToMora: parseFloat(data.amountToMora),
            otherPay: parseFloat(data.otherPay),
            discount: parseFloat(data.discount),
            balance: parseFloat(balanceString),
            inFavor: parseFloat(0.0),
            datePayed: moment(),
        };
    }

    console.log(Data);

    await Payment.findByIdAndUpdate(id, Data, (err, paymentDB) => {
        //en caso de tener algun error en save()
        if (err) {
            return res.status(500).json({
                ok: false,
                msj: 'GRAN Error Actualizando Pago de abono',
                err,
            });
        }

        //evaluaremos si NO se modifico el pago
        if (!paymentDB) {
            res.status(500).json({
                ok: false,
                msj: 'Error Actualizando Pago de abono',
                err,
            });
            console.log(err);
        }

        //en caso de que Si se actualizo el pago
        res.status(200).json({
            ok: true,
            msj: 'Pago de Abono actualizado Exitosamente',
        });
    });
};

const getPaymnetByLoanIdAndCode = async(loanId, code) => {
    await Payment.find({ loanId, code }).exec(function(err, payment) {
        //en caso de obtener un error en la Busqueda
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        if (err) {
            console.log('HAY ERRROR EN getPaymnetByLoanIdAndCode');
        }

        console.log('PAGO=' + JSON.stringify(payment));

        return payment;
    });
};

const calcularMora = (payment, frecuency) => {
    let moraString = '';
    let moradiariaString = '';

    let fechaFin = moment(); //today
    let fechaI = moment(payment[0].dateToPay);
    let duration = fechaFin.diff(fechaI, 'days');
    duration = parseInt(duration) + 1;

    if (duration > parseInt(frecuency)) {
        moraString = (parseFloat(payment[0].amountToPay) * 0.03).toFixed(2); //para obtener solo 2 digitos de resultado
        moradiariaString = (parseFloat(moraString) / parseInt(frecuency)).toFixed(
            2
        ); //para obtener solo 2 digitos de resultado
    }

    console.log('duration=' + duration);

    let moraDeCuotaString = (parseFloat(moradiariaString) * duration).toFixed(2);

    console.log('moraDeCuota=' + parseFloat(moraDeCuotaString));
    console.log('amountToPay=' + payment[0].amountToPay);

    let finalDeuda = 0.0;
    //en caso de calcular la deuda de un payment que tenga abonos
    if (payment[0].statusPay === 'Abonado') {
        finalDeuda = parseFloat(payment[0].balance) + parseFloat(moraDeCuotaString);
    } else {
        finalDeuda =
            parseFloat(payment[0].amountToPay) + parseFloat(moraDeCuotaString);
    }

    return parseFloat(finalDeuda);
};

const calcularDeuda = (payment, frecuency) => {
    console.log('paymentDEUDA=' + JSON.stringify(payment));
    //console.log('frecuency=' + frecuency);ok

    let moraString = '';
    let moradiariaString = '';

    let fechaFin = moment(); //today
    let fechaI = moment(payment[0].dateToPay);
    let duration = fechaFin.diff(fechaI, 'days');
    duration = parseInt(duration) + 1;

    if (duration > parseInt(frecuency)) {
        moraString = (parseFloat(payment[0].amountToPay) * 0.03).toFixed(2); //para obtener solo 2 digitos de resultado
        moradiariaString = (parseFloat(moraString) / parseInt(frecuency)).toFixed(
            2
        ); //para obtener solo 2 digitos de resultado
    }

    console.log('duration=' + duration);

    let moraDeCuotaString = (parseFloat(moradiariaString) * duration).toFixed(2);

    console.log('moraDeCuota=' + parseFloat(moraDeCuotaString));
    console.log('amountToPay=' + payment[0].amountToPay);

    let finalDeuda = 0.0;
    //en caso de calcular la deuda de un payment que tenga abonos
    if (payment[0].statusPay === 'Abonado') {
        finalDeuda = parseFloat(payment[0].balance) + parseFloat(moraDeCuotaString);
    } else {
        finalDeuda =
            parseFloat(payment[0].amountToPay) + parseFloat(moraDeCuotaString);
    }

    return parseFloat(finalDeuda);
};

const PagarCuotaExacta = async(payment, data) => {
    let amountPayed = (
        parseFloat(payment[0].amountToPay) +
        parseFloat(data.amountToMora) +
        parseFloat(data.otherPay) -
        parseFloat(data.discount)
    ).toFixed(2);

    Data = {
        statusPay: 'Pagada',
        methodPayed: data.methodPayed,
        amountPayed: parseFloat(amountPayed),
        amountToMora: parseFloat(data.amountToMora),
        otherPay: parseFloat(data.otherPay),
        discount: parseFloat(data.discount),
        balance: parseFloat(0.0),
        inFavor: parseFloat(0.0),
        datePayed: moment(),
    };

    //await Payment.findByIdAndUpdate(id, Data, (err, paymentDB) => {

    await Payment.findByIdAndUpdate(payment[0]._id, Data, (err, paymentDB) => {
        console.log('Pagando Cuota Exacta');
        //en caso de tener algun error en save()
        if (err) {
            console.log('Error actulizando Pago:' + err);
        }

        //evaluaremos si NO se modifico el pago
        if (!paymentDB) {
            console.log('Error actualizando paymentDB:' + err);
        }
        if (paymentDB) {
            console.log('Cuota Exacta PAGADA');
        }
    });
};

const DarAbono = async(payment, Abono, data, deudaActual) => {
    if (payment[0].statusPay === 'Abonado') {
        console.log('SEGUNDO ABONO');
        // en caso que ya tenga abonos anteriores
        let sumaDeAbonos = parseFloat(payment[0].amountPayed) + parseFloat(Abono);
        console.log('amountPayed=' + payment[0].amountPayed);
        console.log('Abono=' + Abono);
        console.log('SUMA DE ABONO=' + sumaDeAbonos);
        let nuevoStatus = '';

        if (sumaDeAbonos === payment[0].amountToPay) {
            console.log('ESTATUS PAGADA');
            nuevoStatus = 'Pagada';
        } else {
            console.log('ESTATUS ABONADO');
            nuevoStatus = 'Abonado';
        }

        Data = {
            statusPay: nuevoStatus,
            methodPayed: data.methodPayed,
            amountPayed: sumaDeAbonos,
            datePayed: moment(),
            balance: parseFloat(deudaActual) - parseFloat(Abono),
        };
    } else {
        console.log('PRIMER ABONO o PAGO COMPLETO');

        // en caso de ser el primer abono
        Data = {
            statusPay: 'Abonado',
            methodPayed: data.methodPayed,
            amountPayed: parseFloat(Abono),
            datePayed: moment(),
            balance: parseFloat(payment[0].amountToPay) - parseFloat(Abono), //la deuda que queda
        };
    }
    console.log('DATA=' + JSON.stringify(Data));
    await Payment.findByIdAndUpdate(
        payment[0]._id,
        Data, {
            new: true, //devuelve el objeto actualizado
        },
        (err, paymentDB) => {
            //en caso de tener algun error en save()
            if (err) {
                console.log('Error actulizando Abono de Pago2:' + err);
            }

            //evaluaremos si NO se modifico el pago
            if (!paymentDB) {
                console.log('Error actulizando Abono de paymentDB:' + err);
            }
        }
    );
};

const PagarCuotasRecursivas = async(saldoAFavor, data, loanId, code, res) => {
    console.log('loanId=' + loanId); //ok
    console.log('code=' + code); //ok
    console.log('saldoAFavor=' + saldoAFavor); //ok
    let deudaR = 0.0;
    let saldoAFavorR = 0.0;

    //Volvemos a buscar el payment en caso que sea recursivo
    await Payment.find({ loanId, code }).exec(function(err, payment) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        //Calculamos la deuda a pagar de este peyment cuota + mora
        //ahora limitamos el resultado a solo dos digitos
        deudaR = calcularDeuda(payment, data.frecuency).toFixed(2);

        console.log('deudaR=' + parseFloat(deudaR)); //ok

        //Calculamos si hay saldo a favor despues de pagar la deuda calculada
        saldoAFavorR = (parseFloat(saldoAFavor) - parseFloat(deudaR)).toFixed(2);
        saldoAFavor = parseFloat(saldoAFavorR);
        console.log('saldoAFavorR-X=' + saldoAFavor);

        //en caso de ser cuota exacta
        if (saldoAFavorR >= 0) {
            console.log('PagarCuotaExacta');
            //pagosDeAbono(data, payment._id, payment, res);
            PagarCuotaExacta(payment, data); //pagamos la cuota exacta y retornamos el sobrante
            /*res.status(200).json({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ok: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              msg: 'Payment Realizado',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          });*/
        }

        //en caso que el saldoAFavor mas que esta cuota completa
        if (saldoAFavorR > 0) {
            PagarCuotasRecursivas(
                saldoAFavorR,
                data,
                loanId,
                parseInt(payment[0].code) + 1,
                res
            );
        }

        if (saldoAFavorR < 0) {
            console.log('SaLDO A FAVOR=' + saldoAFavorR);
            //en caso que el saldo a favor no cubra la cuota siguiente,
            //solo sera un abono, o es la ultima cuota
            // como es negativo lo multiplicamos por -1
            let DeudaDeEstePago = parseFloat(deudaR);
            DarAbono(payment, saldoAFavorR * -1, data, DeudaDeEstePago);
            /*res.status(200).json({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ok: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        msg: 'Payment Abonado Exitosamente',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });*/
        }
    });
};

const updatePayment = async(req, res) => {
    let id = req.params.id; //Id del payment que esta pagando

    //Determinamos si este pago existe
    await Payment.findById(id).exec(async function(err, payment) {
        //en caso de obtener un error en la Busqueda
        if (err) {
            return res.status(500).json({
                ok: false,
                msj: 'Error en updatePayment',
                err,
            });
        }

        //Determinar si el pago es menos, igual o superior a la cuota
        let deuda =
            parseFloat(payment.amountToPay) +
            parseFloat(req.body.otherPay) +
            parseFloat(req.body.amountToMora) -
            parseFloat(req.body.discount);

        if (parseFloat(req.body.amountPayed) < deuda) {
            console.log('PAGO MENOR (ABONO)');
            pagosDeAbono(req.body, id, payment, res);
        } else {
            console.log('PAGO IGUAL O SUPERIOR');
            //PagoSuperior(req.body, payment, res);
            PagarCuotasRecursivas(
                parseFloat(req.body.amountPayed),
                req.body,
                payment.loanId,
                parseInt(payment.code),
                res
            );
        }

        res.status(200).json({
            ok: true,
            msg: 'Payment Abonado Exitosamente',
        });
    });
};

const findPaymentById = async(req, res) => {
    let id = req.params.id;

    await Payment.findById(id).exec(function(err, payment) {
        //en caso de obtener un error en la Busqueda
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Payment Encontrado',
            payment,
        });
    });
};

module.exports = {
    findPaymentsByLoanId,
    updatePayment,
    createPayment,
    findPaymentById,
    UploadPaymentFile,
};