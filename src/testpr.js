const Dymo = require("dymojs"),
  dymo = new Dymo();
  var QRCode = require('qrcode')


dymo.getPrinters().then(result => {
  console.log(result);
});

QRCode.toString('my name is tareq!',{type:'terminal'}, function (err, url) {
    console.log(url)
  })
    