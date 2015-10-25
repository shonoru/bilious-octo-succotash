// ;23191;1288, brand_5;Sony;ACC-CSPW;pieces;


var categories = require('./categories.json');
var suppliers = require('./suppliers.json');

var fs = require('fs');

var Chance = require('chance'),
    chance = new Chance();

function generateRecord() {
  var randomCategorieInt = chance.integer({min: 0, max: 10});
  var randomSupplierInt = chance.integer({min: 0, max: 315});
  var categorie = categories.categories[randomCategorieInt];
  var supplier = suppliers.suppliers[randomSupplierInt];

  var str = ';';
  str += categorie.id;
  str += ',' + supplier.id + ';' + supplier.name.split(';')[0];
  str += ';' + chance.guid();
  str += ';pieces;';
  return str;
}

var count = 10000;
var timestamp = chance.timestamp();

// ;COUNT;categorie, supplier; supplier.name;random;pieces;

var stream = fs.createWriteStream('products-' + timestamp +'.txt');
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
