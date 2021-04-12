//Creacion de la plantilla HTML del reporte
module.exports = (data) => {
        const today = new Date();

        const {
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
        } = data

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

        let CapitalInicial = amount
        let TipoTasa = tipotasa
        let Quotas = quota
        let TipoInteres = tipoInteres
        let Frequency = frequency
        let DateStart = datestart


        let Tasa = rate
        let Capitalfinal = 0.0
        let InteresSemanal = 0.0
        let AbonoCapital = 0.0
        let SaldoFinal = 0.0
        let TotaldeInteres = 0.0
        let TotalAbonoCapital = 0.0, // si se usan, no borrar
            TotaldeCuotas = 0.0,
            TotaldeInteres2 = 0.0
        let Close = 0.0 //Para guardar el valor a prestar mas el costo de cierre
        let tasa = 0.0
        let SaldoInicial = 0.0
        let periodos = 0,
            contador = 0,
            days = 7

        let fecha = Date.parse(DateStart) + 1;
        fecha = new Date(fecha);
        fecha.setDate(fecha.getDate() + 1)

        //Obtenemos el valor de la tasa mensual
        if (TipoTasa === 'Mensual') {
            tasa = parseInt(Tasa) / 100
        } else if (TipoTasa === 'Anual') {
            tasa = (parseInt(Tasa) / 12) / 100
        }

        //Obtenemos el Valor del Costo de Cierre
        if (parseFloat(CapitalInicial) >= 5000) {
            Close = +parseFloat(CapitalInicial) * 0.04
        } else {
            Close = 200
        }

        //Calculo de los Periodos, redondeamos al entero mas alto, 10/4  = 3,  13/4  =4
        if (Frequency === 'Mensual') {
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

        let quotaRows = [] // arreglo de objetos

        //Calculo del interes Compuesto mediante numero de cuotas
        if (TipoInteres === 'Compuesto') {

            CapitalInicial = parseFloat(CapitalInicial) + (parseFloat(Close)) //3200 //este valor ira cambiando
                //let CapitalInicial1=parseFloat(CapitalInicial) + (parseFloat(Close))//3200 se usa este valor al finalnuevamente
                //Calculo de Interes Total Compuesto
            TotaldeInteres = (CapitalInicial * (Math.pow((1 + tasa), periodos) - 1)) //F4
                //Calculo del valor de la cuota
            let quotaValue = ((parseFloat(CapitalInicial) + parseFloat(TotaldeInteres)) / Quotas) //f4

            SaldoInicial = CapitalInicial //3200
            SaldoFinal = CapitalInicial //3200 Solo para que el while de inicio debe ser distinto de 0

            let cont = 0

            while (SaldoFinal !== 0) {

                Capitalfinal = (parseFloat(CapitalInicial) + parseFloat(CapitalInicial * tasa)) //3520 f2
                InteresSemanal = ((CapitalInicial * tasa) / contador) //80 f2
                AbonoCapital = (parseFloat(quotaValue) - parseFloat(InteresSemanal)) //f3

                for (let i = 0; i < contador; i++) {

                    if (SaldoInicial !== 0) {

                        //Localizamos la penultima fila para prepara el valor de cuota de pago de la ultima fila
                        if (parseFloat(SaldoFinal) + parseFloat(InteresSemanal) < quotaValue) {

                            AbonoCapital = SaldoFinal
                            quotaValue = AbonoCapital + InteresSemanal
                        }

                        TotaldeInteres2 += parseFloat(InteresSemanal)
                        TotaldeCuotas += parseFloat(quotaValue)
                        TotalAbonoCapital += parseFloat(AbonoCapital)

                        SaldoFinal = ((SaldoInicial) - (AbonoCapital)) //f3

                        //condicion para inicial el pago en la fecha seleccionada
                        if (cont === 0) {

                            quotaRows[cont] = {
                                cont: cont + 1,
                                SaldoInicial: SaldoInicial, //3200
                                InteresSemanal: InteresSemanal, //80
                                quotaValue: quotaValue, //354
                                AbonoCapital: AbonoCapital, //274
                                SaldoFinal: SaldoFinal,
                                day: NombreDay(fecha),
                                fecha: fecha.setDate(fecha.getDate())
                            }

                        } else {

                            quotaRows[cont] = {
                                cont: cont + 1,
                                SaldoInicial: SaldoInicial, //3200
                                InteresSemanal: InteresSemanal, //80
                                quotaValue: quotaValue, //354
                                AbonoCapital: AbonoCapital, //274
                                SaldoFinal: SaldoFinal,
                                day: NombreDay(fecha),
                                fecha: fecha.setDate(fecha.getDate() + days)
                            }
                        }

                        SaldoInicial = SaldoFinal
                        cont += 1

                        CapitalInicial = Capitalfinal
                    }

                }
            }
        }

        return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
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

                   <h3 class="justify-center">Cálculo de Préstamo</h3>   
                     
                     <hr />

                     <table>
                         <tr>
                            <th>Tipo de Préstamo:</th>
                            <td>${typeLoan}</td>
                              
                            <th>Monto Solicitado:</th>
                            <td>LPS. ${amount}</td>
                         </tr>

                         <tr>
                            <th>Tipo de Tasa:</th>
                            <td>${tipotasa}</td>
                              
                            <th>Valor de Tasa:</th>
                            <td>${rate}%</td>
                         </tr>

                         <tr>
                            <th>Tipo de Interes:</th>
                            <td>${tipoInteres}</td>
                              
                            <th>Frecuencia de Pago:</th>
                            <td>${frequency}</td>
                         </tr>

                         <tr>
                            <th>Número de Cuotas:</th>
                            <td>${quota}</td>
                              
                            <th>Valor de Cuota:</th>
                            <td>LPS. ${quotaValue}</td>
                         </tr>

                         <tr>
                           <th>Fecha de Inicio:</th>
                           <td>Lunes 01/01/2021</td>
                           
                           <th>Fecha de Finalizacion:</th>
                           <td>Lunes 30/03/2021</td>
                         </tr>
                        
                           <tr>
                              <th>Total de Interes:</th>
                              <td>LPS. ${totalInterest}</td>
                              
                              <th>Valor de Cierre:</th>
                              <td>LPS. ${closingCostVar}</td>
                           </tr>

                  </table>

                  <hr />
                  

                  <table>

                     <tr class="heading">
                        <td>No:</td>
                        <td>Fecha de Pago:</td>
                        <td>Saldo</td>
                        <td>Cuota</td>
                        <td>Interes</td>
                        <td>Abono Capital</td>
                        <td>Saldo Final</td>
                     </tr>

                     ${quotaRows?.map(quota=>(
                       `<tr class="item">
                           <td>${quota.cont}</td>
                           <td>${quota.day +" "+ (new Date(quota.fecha)).toLocaleDateString()}</td>
                           <td>LPS ${parseFloat(quota.SaldoInicial).toFixed(2)}</td>
                           <td>LPS ${parseFloat(quota.quotaValue).toFixed(2)}</td>
                           <td>LPS ${parseFloat(quota.InteresSemanal).toFixed(2)}</td>
                           <td>LPS ${parseFloat(quota.AbonoCapital).toFixed(2)}</td>
                           <td>LPS ${parseFloat(quota.SaldoFinal).toFixed(2)}</td>
                        </tr>`
                     ))}
                     </table>
                      <br /> <br /> 
                     <table>
                      <tr>
                        <td>_________________________</td>
                        <td>_________________________</td>
                      </tr>

                     <tr class="mt-0">
                        <td>Firma del Cliente</td>
                        <td>Firma del Promotor</td>
                     </tr>

                  </table>

             <br />

             
          </div>
       </body>
    </html>
    `;
};