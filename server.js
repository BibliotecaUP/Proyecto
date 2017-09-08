console.log('Server online');
const HTTP = require('http');
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');

const SERVER = EXPRESS();
SERVER.use(BODY_PARSER.json());

//const jsonParser = BODY_PARSER.json();

const BOOKS = [
    {nombre: 'Juego de Tronos', isbn:2123456 },
    {nombre: 'Choque de reyes ', isbn:3423454 },
    {nombre: 'Tormenta de espadas', isbn:7564567 },
    {nombre: 'Festín de cuervos', isbn:3454463 },
    {nombre: 'Danza de dragones', isbn:22345544 },
    {nombre: 'Tormenta de espadas', isbn:34545334 },
];

SERVER.get('/books', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send(BOOKS);
});

SERVER.post('/books', function (req, res) {
    BOOKS.push(req.body);
    res.send(BOOKS);
});

SERVER.listen(3000, function () {
    console.log('API on port 3000!')
});


