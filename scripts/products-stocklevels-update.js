// ;23355;;23355:warehouse_s;electro

var fs = require('fs');

var Chance = require('chance'),
    chance = new Chance();

function generateRecord() {
  var str = '';
  str += ':' + 'warehouse_n';
  str += ';future';
  return str;
}

var count = 10000;
var timestamp = chance.timestamp();

var stream = fs.createWriteStream('products-stocklevels-update-' + timestamp +'.txt');
stream.once('open', function(fd) {
  for (var i = 0; i < 100; i++) {
    var productId = count + i;
    var record = ';';
    record += productId + ';;' + productId;
    record += ':';
    record += generateRecord();
    record += '\n';

    stream.write(record);
  }

  stream.end();
});
