const express = require('express');
var afip_apis_1 = require("afip-apis");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

//SERVICIO DE OBTENCION DE TICKET DE ACCESO EN SERVICIO WSAA
app.post('/getSignature', async (req, res) => {

    //https://socket.dev/npm/package/afip-apis/overview/0.5.5
    try 
    {
        const DEFAULT_URLWSAAWSDL = req[`body`][`urlwsaa`];//"https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL"
        const DEFAULT_SERVICIO = req[`body`][`service`];//"wsfe";
        const DEFAULT_CERTIFICATE = req[`body`][`crt_file_route`];//"./files/ptlytest.crt";
        const DEFAULT_CERTIFICATE_KEY = req[`body`][`pk_file_route`];//"./files/PKPTLYTEST.key";

        var loginTicket = new afip_apis_1.LoginTicket();

        loginTicket.wsaaLogin(DEFAULT_SERVICIO, DEFAULT_URLWSAAWSDL, DEFAULT_CERTIFICATE, DEFAULT_CERTIFICATE_KEY)
        .then(function (r) {
            console.log(`\n`+r.header);
            console.log(`\n`+JSON.stringify(r));

            res.status(200).json({
                error: false,
                details: ``,
                info: r
            });

            return;

        })
        .catch(function (e){
            res.status(500).json({
                error: true,
                details: e,
                info: null
            });
            
            return;
        });
    }
    catch(e)
    {
        let details = `Excepción genereal en servicio "getSignature" - Details: ${JSON.stringify(e)}`;
        res.status(500).json({
          error: true,
          details: details,
          info: null
        });
    
        return;
    }
});

//
app.get("/", (req, res) => {
	res.json({
		Status: 'OK'
	})
}); 
  
//INICIAR SERVIDOR
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});