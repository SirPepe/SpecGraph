var fs = require('fs');
var spawn = require('child_process').spawn;

var escapeStringForRegExp = function (str){
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

createWhite = function(fileName){
  newFileName = fileName.split('.')[0] + '_w.svg';
  var str = fs.readFileSync(fileName, 'utf-8');
  var replaced = str.replace(/#000000/g, '==PLACEHOLDER==')
    .replace(/#ffffff/g, '#000000')
    .replace(/==PLACEHOLDER==/g, '#ffffff');
  fs.writeFileSync(newFileName, replaced);
  return newFileName;
};

translate = function(fileName, lang){
  dictionary = require('./languages/' + lang).dictionary;
  newFileName = fileName.split('.')[0] + '_' + lang + '.svg';
  var str = fs.readFileSync(fileName, 'utf-8');
  Object.keys(dictionary).forEach(function(key){
    var re = new RegExp(escapeStringForRegExp(key), 'g');
    str = str.replace(re, dictionary[key]);
  });
  fs.writeFileSync(newFileName, str);
  return newFileName;
};

toPNG = function(fileName){
  newFileName = fileName.split('.')[0] + '.png';
  var inkscape = spawn('inkscape', [
    fileName,
    '--export-png=../' + newFileName
  ]);
};


// German
de = 'graph.svg';
de_w = createWhite('graph.svg');
toPNG(de);
toPNG(de_w);


// English
en = translate('graph.svg', 'en');
en_w = createWhite(en);
toPNG(en);
toPNG(en_w);