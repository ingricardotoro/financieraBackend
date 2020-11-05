const Customer = require('../models/Customer')
    //const Contact = require('../models/contact')

//funcion para listar todos los clientes
const listCustomer = async(req, res) => {

    await Customer.find({})
    //.populate('personid')
    .exec(function(err, customers) {
        //en caso de obtener un error en la Busqueda
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            msg: "Lista de Clientes",
            customers
        })

        console.log(customers);
    });
}

const listCustomerByName = async(req, res) => {

}

//funcion para crear nuevos clientes
const createCustomer = async(req, res) => {

    const {
        
        codeCustomer,
        name,
        lastname,
        identidad,
        gender,
        rtn,
        fec_nac,
        phone1,
        phone2,
        email1,
        email2,
        profesion,
        city,
        location,
        photo,
        Loanctive,
        defaulter,
        active
    } = req.body


        //creamos una instancia del objeto Persona
        newCustomer = new Customer({
            codeCustomer,
            name,
            lastname,
            identidad,
            gender,
            rtn,
            fec_nac,
            phone1,
            phone2,
            email1,
            email2,
            profesion,
            city,
            location,
            photo,
            Loanctive,
            defaulter,
            active
        })

        try {

            if(await newCustomer.save()) {
            
                //Cliente creado exitosamente
                res.status(201).json({
                    ok: true,
                    msg: 'Cliente creado exitosamente',
                    newCustomer
                })
            }
            else{
                res.status(500).json({
                    ok: false,
                    msg: "Error creating New Customer"
                })
            }
                
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error creating New Customer"
            })
        }
  
}

const deleteCustomer = async(req, res) => {

}

const updateCustomer = async(req, res) => {

}

module.exports = { createCustomer, listCustomer, deleteCustomer, updateCustomer, listCustomerByName }