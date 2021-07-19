//Creacion de la plantilla HTML del reporte
module.exports = (data) => {
    const today = new Date();

    const {
        quota,
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

    /*let CapitalInicial = amount
    let DateStart = datestart

    let Tasa = rate
    let Capitalfinal = 0.0


    let fecha = Date.parse(DateStart) + 1;
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + 1)*/


    return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Reporte Trimestral</title>
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
                           <h3 class="texto">Reporte Trimestral</h3>   
                           <h3 class="texto">4 Periodo del año 2019</h3>  
                          </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="information">
               <td colspan="2">
               <hr />
                <table>
                        <tr>
                            <th>Declaracion:</th>
                            <td>86405386406</td>
                                
                            <th>RTN Prestamista:</th>
                            <td>18079015790858</td>
                        </tr>
                        <tr>
                            <th>Nombre Prestamista:</th>
                            <td>CREDISAS S DE RL DE C.V.</td>
                                
                            <th>Periodo:</th>
                            <td>4 - 2019</td>
                        </tr>
                    </table>
                 <hr />

                 <table>
                     <tr>
                        <th>#</th>
                        <th>Identidad Deudores</th>
                        <th>Cod. Depto</th>
                        <th>Cod. Mun</th>
                        <th>Valor de Prestamo</th>
                        <th>Valor Adeudado</th>
                        <th>% Mensual</th>
                        <th>Fecha Otorgado</th>
                        <th>Fecha Vencimiento</th>
                        <th>Tipo Garantia</th>
                     </tr>

                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>0801-1988-16155</td>
                        <td>08</td>
                        <td>01</td>
                        <td>LPS. 10,400.00</td>
                        <td>LPS. 2400.00</td>
                        <td>5%</td>
                        <td>2019-04-01</td>
                        <td>2019-10-31</td>
                        <td>Aval</td>
                     </tr>
                 

              </table>

              <hr />
         
      </div>
   </body>
</html>
`;
};