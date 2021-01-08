const Loan = require('../models/Loans')

//Funcion para buscar el ultimo codigo utilizado
const lastCodeLoan = async(req, res) => {

        await Loan.find({}, 'codeLoan').sort({ codeLoan: -1 }).limit(1)
            .exec(function(err, LastCode) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Ultimo Codigo",
                    LastCode
                })

            });

    }
    //funcion para listar todos los Prestamos
const listLoans = async(req, res) => {

    await Loan.find({}).sort([
            ['codeLoan', -1]
        ])
        .populate({
            path: 'requestId',
            populate: {
                path: 'customerId',
                populate: {
                    path: 'personId',
                    model: 'Person',
                }
            }
        })
        .exec(function(err, loans) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Prestamos",
                loans
            })

            console.log(loans)

        });
}

//funcion para crear nuevos Avales
const createLoan = async(req, res) => {

    const {

        codeLoan,
        requestId,
        amountInitial,
        totalToPay,
        dateaproved

    } = req.body

    newLoan = new Loan({
        codeLoan,
        requestId,
        amountInitial,
        totalToPay,
        dateaproved
    })


    try {
        if (await newLoan.save()) {

            res.status(201).json({
                ok: true,
                msg: 'Prestamos creado exitosamente',
                newLoan
            })

        } else {
            res.status(500).json({
                ok: false,
                msg: 'Error Creando Nuevo Prestamos',
            })
        }
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New Loan"
        })
    }

}

module.exports = { lastCodeLoan, listLoans, createLoan }