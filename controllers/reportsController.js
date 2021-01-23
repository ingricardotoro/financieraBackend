const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf') /* en caso de tener error phantom npm link phantomjs-prebuilt*/
    //var TemplateReportCalculator = fs.readFileSync('../reports/reportCalculator.html', 'utf8');
var options = { format: 'Letter' };
const TemplateReportCalculator = require('../reports/reportCalculator');

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

module.exports = { reportCalculator, fetchReportCalculator }