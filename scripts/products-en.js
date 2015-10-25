// TODO real words
var fs = require('fs');

var Chance = require('chance'),
    chance = new Chance();

function generateRecord() {
  var str = ';';
  str += chance.sentence({words: 3}) + ';' + chance.sentence() + ';' + chance.paragraph();
  return str;
}

var count = 10000;
var timestamp = chance.timestamp();

var stream = fs.createWriteStream('products-en-' + timestamp +'.txt');
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
