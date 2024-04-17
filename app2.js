"use strict";

var afip_apis_1 = require("afip-apis");

var DEFAULT_URLWSAAWSDL = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL";
var DEFAULT_SERVICIO = "wsfe";
var DEFAULT_CERTIFICATE = "./files/ptlytest.crt";
var DEFAULT_CERTIFICATE_KEY = "./files/PKPTLYTEST.key";
var loginTicket = new afip_apis_1.LoginTicket();
loginTicket.wsaaLogin(DEFAULT_SERVICIO, DEFAULT_URLWSAAWSDL, DEFAULT_CERTIFICATE, DEFAULT_CERTIFICATE_KEY)
  .then(function (r) {
    console.log(`\n`+r.header);
    console.log(`\n`+JSON.stringify(r));

    return JSON.stringify(r);
    /*var wsfev1 = new afip_apis_1.Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
    return wsfev1.FEDummy({})
      .then(function (d) {
        console.log(d);
      });*/
  })
  .catch(function (e) { return console.error(e); });