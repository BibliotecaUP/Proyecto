const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');

const SERVER = EXPRESS();
SERVER.use(BODY_PARSER.json());


const CLIENTES = [
    {nombre: 'Diego', edad:20 },
    {nombre: 'Agustin', edad: 22 },
    {nombre: 'Alvaro', edad:24 }
];

SERVER.get('/clientes/:nombre', function (req, res) {
    res.send(CLIENTES);
});

SERVER.post('/clientes', function (req, res) {
    CLIENTES.push(req.body);
    res.send(req.body);
});

SERVER.listen(process.env.PORT || 3000, function () {
    console.log('API andando con express...');
});