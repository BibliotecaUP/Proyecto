console.log('Server online');
const HTTP = require('http');
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const FS = require('fs');

const SERVER = EXPRESS();
SERVER.use(BODY_PARSER.json());

//const jsonParser = BODY_PARSER.json();
/*
const BOOKS = [
    {nombre: 'Juego de Tronos', isbn:2123456 },
    {nombre: 'Choque de reyes ', isbn:3423454 },
    {nombre: 'Tormenta de espadas', isbn:7564567 },
    {nombre: 'Festín de cuervos', isbn:3454463 },
    {nombre: 'Danza de dragones', isbn:22345544 },
    {nombre: 'Tormenta de espadas', isbn:34545334 },
];
*/
var books = {
  '01' : {nombre:'Juego de Tronos', isbn:'2123456'},
  '02' : {nombre:'Choque de reyes', isbn:'3423454'},
  '03' : {nombre:'Choque de reyes', isbn:'7564567'},
  '04' : {nombre:'Choque de reyes', isbn:'3454463'},
  '05' : {nombre:'Choque de reyes', isbn:'22345544'},
  '06' : {nombre:'Choque de reyes', isbn:'34545334'},
}

//FS.readfile('./index.htmal','utf8',function())

SERVER.get('/', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send('Entraste a la BIBLIOTECA');
});

SERVER.get('/books', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send(books);
});

SERVER.get('/books/:id', function (req, res) {
  console.log(req.params);  
  res.send(books[req.params.id]);
});


SERVER.post('/books', function (req, res) {
    BOOKS.push(req.body);
    res.send(books);
});

SERVER.listen(3000, function () {
    console.log('API on port 3000!')
});


/*-------MODULO-----------------------------------------------------------------*/
/*
var mymodule = require('./modules/module-1.js');
SERVER.get('/users/:id',mymodule.getuserById);
console.log(mymoodule);


//En el modulo module-1.js
module.exports = function(){
  console.log('new module');
  return w;
  
}
*/