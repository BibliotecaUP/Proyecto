const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose = require('mongoose');
var async = require("async"); //agregado
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
// Conecto con la base de datos
mongoose.Promise = global.Promise;//agregado

mongoose.connect('mongodb://localhost/book', {useMongoClient: true});//agregado
mongoose.connection.on('error', function(err) {//agregado
    console.log('Error de conexión a Mongo: ' + err);//agregado
});
mongoose.connection.on('open', function(err) {//agregado
    console.log('Conectado a Mongo!');//agregado
});

// Con bodyParser permitimos que pueda parsear JSON
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
// EL methodOverride() nos permite implementar y personalizar métodos HTTP
//app.use(methodOverride());


// Importo Modelo y Controlador
//  var models   = require('./models/model')(app, mongoose);
//  var TempCtrl = require('./Controllers/CTemps');

var bookSchema = mongoose.Schema({
		id:   { type: Number },
    nombre:    { type: String },//{ type: Date, default: Date.now },
    isbn:     { type: String }
},
{
    timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
    }
    
});

var bookModel = mongoose.model('Book', bookSchema);

app.get('/', function(req, res) {
	res.send("Bienvenido al servidor de biblioteca");
	console.log('INDEX');
	console.log(__dirname);
});

// Endpoint para la biblioteca

//////////       ENDPOINTS   /////////////
// GET /books - Devuelve todas los libros del modelo
app.get('/books', function (req, res) {
        bookModel.find(function(err, bookModel) {
    	if(err) res.send(500, err.message);
			res.status(200).jsonp(bookModel);
			console.log('GET /books')
    });
});

// POST /books - Almacena libros
app.post('/books', function (req, res) {
	
  var theBook = new bookModel({
		id: req.body.id,
		nombre: req.body.nombre,
		isbn: req.body.isbn
	})
        
  theBook.save(function(err) {
    res.send(req.body);
		console.log("POST");
  });
});

//Endpoint para un libro
app.get('/books/:id', function (req, res) {
        bookModel.find(function(err, bookModel) {
    	if(err) res.send(500, err.message);
			res.status(200).jsonp(bookModel);
			console.log('GET /books/:id')
    });
});

// Inicio el server
app.listen(3000, function() {
  console.log("Node server corriendo en http://localhost:3000");
  console.log("o en https://Proyecto_Bliblioteca-martinmgc674408.codeanyapp.com");
});
