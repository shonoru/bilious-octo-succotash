// ;15;warehouse_w;notSpecified;1;0;0;0;280916;0

// ;23355;;23355:warehouse_s;electro

var fs = require('fs');

var Chance = require('chance'),
    chance = new Chance();

function generateRecord() {
  var str = '';
  str += chance.integer({min: 0, max: 30});
  str += ';' + 'warehouse_n';
  str += ';notSpecified';
  str += ';' + chance.integer({min: 0, max: 5});
  str += ';0;0;0;'
  return str;
}

var count = 10000;
var timestamp = chance.timestamp();

var stream = fs.createWriteStream('products-stocklevels-' + timestamp +'.txt');
stream.once('open', function(fd) {
  for (var i = 0; i < 100; i++) {
    var record = ';';
    record += generateRecord();
    record += count + i;
    record += ';0'
    record += '\n';

    stream.write(record);
  }

  stream.end();
});
