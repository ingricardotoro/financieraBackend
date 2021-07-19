const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf') /* en caso de tener error phantom npm link phantomjs-prebuilt*/
    //var TemplateReportCalculator = fs.readFileSync('../reports/reportCalculator.html', 'utf8');
var options = { format: 'Letter' };
var optionsTim = { format: 'Letter', orientation: 'landscape' };
var optionsIngresos = { format: 'Letter', orientation: 'landscape' };
var optionsColocados = { format: 'Letter', orientation: 'landscape' };
var optionsMora = { format: 'Letter', orientation: 'landscape' };
var optionsCancel = { format: 'Letter', orientation: 'landscape' };

const TemplateReportCalculator = require('../reports/reportCalculator');
const TemplateReportTrimestral = require('../reports/reportTrimestral');
const TemplateReportIngresos = require('../reports/reportIngresos');
const TemplateReportColocados = require('../reports/reportColocados');
const TemplateReportMora = require('../reports/reportMora');
const TemplateReportCancel = require('../reports/reportCancel');

//funcion para generar el reporte PDF del calculo en la seccion de la calculadora
const reportCalculator = (req, res) => {

    //creamos el archivo PDF
    pdf.create(TemplateReportCalculator(req.body), { options }).toFile(`${__dirname}/../reports/calculatorReports/result.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject())
        } else {
            //console.log(res)
            res.send(Promise.resolve())
        }
    })
}

const fetchReportCalculator = (req, res) => {
    try {
        res.sendFile(path.resolve(`${__dirname}/../reports/calculatorReports/result.pdf`))
    } catch (error) {
        console.log(error)
    }
}


/******REPORTE TRIMEMSTRAL */

//funcion para generar el reporte TRIMESTRAL
const reportTrimestral = (req, res) => {
    //creamos el archivo PDF
    pdf.create(TemplateReportTrimestral(req.body), optionsTim).toFile(`${__dirname}/../reports/trimestralReports/Reporte_Trimestral.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject())
        } else {
            //console.log(res)
            res.send(Promise.resolve())
        }
    })
}

const fetchReportTrimestral = (req, res) => {
        try {
            res.sendFile(path.resolve(`${__dirname}/../reports/trimestralReports/Reporte_Trimestral.pdf`))
        } catch (error) {
            console.log(error)
        }
    }
    /*******END TRIMEMSTRAL*/

//funcion para generar el reporte Ingresos Mensuales
const reportIngresos = (req, res) => {
    //creamos el archivo PDF
    pdf.create(TemplateReportIngresos(req.body), optionsIngresos).toFile(`${__dirname}/../reports/ingresosReports/Reporte_Ingresos.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject())
        } else {
            //console.log(res)
            res.send(Promise.resolve())
        }
    })
}

const fetchReportIngresos = (req, res) => {
        try {
            res.sendFile(path.resolve(`${__dirname}/../reports/ingresosReports/Reporte_Ingresos.pdf`))
        } catch (error) {
            console.log(error)
        }
    }
    /*******END Ingresos Mensuales */


//funcion para generar el reporte Nuevos Prestamos Colocados
const reportColocados = (req, res) => {
    //creamos el archivo PDF
    pdf.create(TemplateReportColocados(req.body), optionsColocados).toFile(`${__dirname}/../reports/colocadosReports/Reporte_Colocados.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject())
        } else {
            //console.log(res)
            res.send(Promise.resolve())
        }
    })
}

const fetchReportColocados = (req, res) => {
        try {
            res.sendFile(path.resolve(`${__dirname}/../reports/colocadosReports/Reporte_Colocados.pdf`))
        } catch (error) {
            console.log(error)
        }
    }
    /*******END Nuevos Prestamos Colocados */



/******REPORTE CANCELADOS */
//funcion para generar el reporte de CANCELADOS
const reportCancel = (req, res) => {
    //creamos el archivo PDF
    pdf.create(TemplateReportCancel(req.body), optionsCancel).toFile(`${__dirname}/../reports/cancelReports/Reporte_Cancelados.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject())
        } else {
            //console.log(res)
            res.send(Promise.resolve())
        }
    })
}

const fetchReportCancel = (req, res) => {
        try {
            res.sendFile(path.resolve(`${__dirname}/../reports/cancelReports/Reporte_Cancelados.pdf`))
        } catch (error) {
            console.log(error)
        }
    }
    /*******END CANCELADOS */



//funcion para generar el reporte de Mora
const reportMora = (req, res) => {
    //creamos el archivo PDF
    pdf.create(TemplateReportMora(req.body), optionsMora).toFile(`${__dirname}/../reports/moraReports/Reporte_Mora.pdf`, (err) => {
        if (err) {
            res.send(Promise.reject())
        } else {
            //console.log(res)
            res.send(Promise.resolve())
        }
    })
}

const fetchReportMora = (req, res) => {
        try {
            res.sendFile(path.resolve(`${__dirname}/../reports/moraReports/Reporte_Mora.pdf`))
        } catch (error) {
            console.log(error)
        }
    }
    /*******END Nuevos Prestamos Colocados */



module.exports = {
    reportCalculator,
    fetchReportCalculator,
    reportTrimestral,
    fetchReportTrimestral,
    reportCancel,
    fetchReportCancel,
    reportIngresos,
    fetchReportIngresos,
    reportColocados,
    fetchReportColocados,
    reportMora,
    fetchReportMora
}