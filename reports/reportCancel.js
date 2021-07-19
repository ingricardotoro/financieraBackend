//Creacion de la plantilla HTML del reporte
module.exports = (data) => {
    const today = new Date();

    /*const {
        quota,
        quotaValue,
        totalInterest,
        amount,
        rate,
        typeLoan,
        frequency,
        tipotasa,
        tipoInteres,
        closingCostVar,
        datestart
    } = data*/

    const dias = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
        'domingo',
    ];

    //funcion para obtener el nombre del
    const NombreDay = (date) => {
        let numeroDia = new Date(date).getDay();
        let nombreDia = dias[numeroDia];
        return nombreDia
    }

    //let CapitalInicial = amount
    //let TipoTasa = tipotasa


    // let Tasa = rate
    //let Capitalfinal = 0.0


    //let fecha = Date.parse(DateStart) + 1;
    // fecha = new Date(fecha);
    // fecha.setDate(fecha.getDate() + 1)

    //Calculo de los Periodos, redondeamos al entero mas alto, 10/4  = 3,  13/4  =4
    /* if (Frequency === 'Mensual') {
            periodos = parseInt(Quotas)
            days = 30
        } else if (Frequency === 'Quincenal') {
            periodos = Math.ceil(parseInt(Quotas) / 2)
            days = 14
        } else if (Frequency === 'Semanal') {
            periodos = Math.ceil(parseInt(Quotas) / 4)
            days = 7
        }

        if (Frequency === 'Semanal') { contador = 4 }
        if (Frequency === 'Quincenal') { contador = 2 }
        if (Frequency === 'Mensual') { contador = 1 }
 */
    let quotaRows = [] // arreglo de objetos


    return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
         .invoice-box {
         max-width: 1200px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica',
         color: #555;
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: left;
         }
         .invoice-box table tr.top table td {
         padding-bottom: 10px;
         }
         .invoice-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .texto {
           font-size: 18px;
           line-height: 7px;
           color: #333;
           }
         .invoice-box table tr.information table td {
         padding-bottom: 10px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">
         <table cellpadding="0" cellspacing="0">
            <tr class="top">
               <td colspan="2">
                  <table>
                     <tr>
                        <td class="title">
                          <h2 class="texto">CREDISAS S DE RL DE CV</h2>
                          <p class="texto">R.T.N. 18079015790858</p>
                          <p class="texto">BO. EL CENTRO FRENTE A EDIFICIO ALVARES</p>
                          <p class="texto">OLANCHITO, YORO</p>
                          <p class="texto">Tel: 9626-5516 WhatsApp:3395-1151</p>
                          <p class="texto">Email:credisascreditos@gmail.com</p>
                          
                        </td>
                        <td class="title">
                          <p class="texto">Fecha: ${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.</p>
                          <img  src="http://localhost:4000/logocredisa.png"
                           style="width:100%; max-width:156px;">
                          </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="information">
               <td colspan="2">
               <hr />

               <h3 class="justify-center">Préstamo Cancelados en Marzo-2020</h3>   
                 
                 <hr />

                 <table>
                   
                    <tr>
                    <th>#</th>
                    <th>Codigo</th>
                    <th>Identidad</th>
                    <th>Nombre de Cliente</th>
                    <th>Capital</th>
                    <th>Interes</th>
                    <th>Total</th>
                    <th>Fecha de Cancelacion</th>
                </tr>

                <tr>
                    <td>1</td>
                    <td>08</td>
                    <td>0801-1988-16155</td>
                    <td>MARVIN RICARDO TORO CRUZ</td>
                    <td>LPS. 10,400.00</td>
                    <td>LPS. 2500.00</td>
                    <td>LPS. 2400.00</td>
                    <td>2019-04-01</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>08</td>
                    <td>0801-1988-16155</td>
                    <td>MARVIN RICARDO TORO CRUZ</td>
                    <td>LPS. 10,400.00</td>
                    <td>LPS. 2500.00</td>
                    <td>LPS. 2400.00</td>
                    <td>2019-04-01</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>08</td>
                    <td>0801-1988-16155</td>
                    <td>MARVIN RICARDO TORO CRUZ</td>
                    <td>LPS. 10,400.00</td>
                    <td>LPS. 2500.00</td>
                    <td>LPS. 2400.00</td>
                    <td>2019-04-01</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>08</td>
                    <td>0801-1988-16155</td>
                    <td>MARVIN RICARDO TORO CRUZ</td>
                    <td>LPS. 10,400.00</td>
                    <td>LPS. 2500.00</td>
                    <td>LPS. 2400.00</td>
                    <td>2019-04-01</td>
                </tr>
                </table>

              <hr />
              
              <table>

                 <tr class="heading">
                    <td>No:</td>
                    <td>----</td>
                    <td>-------------</td>
                    <td>-------------</td>
                    <td>TOTAL LPS.</td>
                    <td>Total LPS.</td>
                    <td>Total LPS.</td>
                    <td>-------</td> 
                 </tr>

                 </table>
         <br />

      </div>
   </body>
</html>
`;
};