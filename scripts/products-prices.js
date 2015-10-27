var fs = require('fs');

var Chance = require('chance'),
    chance = new Chance();

function generateRecord() {
  // ;0001;5,00 GBP, 5,50 EUR, 7,48 USD, 765,33 JPY

  // ;107701;pieces;USD;179,93;1;1;false
  var str = ';';
  str += 'pieces';
  str += ';' + 'USD';
  str += ';' + chance.dollar().substr(1).split('.').join(',');
  str += ';1;1;false'
  return str;

}
var count = 10000;
var timestamp = chance.timestamp();

var stream = fs.createWriteStream('products-prices-' + timestamp +'.txt');
stream.once('open', function(fd) {
  for (var i = 0; i < 100; i++) {
    var record = ';';
    record += count + i;
    record += generateRecord();
    record += '\n';

    stream.write(record);
  }

  stream.end();
});
