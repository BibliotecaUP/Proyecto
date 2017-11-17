// Declaro constante para requerir los módulos
const express = require("express"), //Manejo de paquetes
      app = express(),
      bodyParser  = require("body-parser"), //Parseador de json, te parsea el body
      mongoose = require('mongoose'); //Agrega manejo de estructura a mongodb
app.use(bodyParser.json()); //la app va a usar el modulo de bodyParser
app.use(express.static(__dirname + "/public")); //La app usa una ruta estatica donde se almacena el index, imagenes, etc. 

// Conecto con la base de datos
mongoose.connect('mongodb://localhost/book', {useMongoClient: true});// Creo la conexion local
mongoose.connection.on('error', function(err) {
    console.log('Error de conexión a Mongo: ' + err);
});
mongoose.connection.on('open', function(err) {
    console.log('Conectado a Mongo!');
});

//Declaro un esquema de mongoose para la colección
var bookSchema = mongoose.Schema({
		id:   { type: Number },
    nombre:    { type: String },
    isbn:     { type: String }
},
{
    timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
    }
    
});

//Creo un modelo de colección utilizando el esquema creado antes. 
var bookModel = mongoose.model('Book', bookSchema);

//////////       ENDPOINTS DE LA BIBLIOTECA   /////////////
//Endpoint raíz. Invoca al index.html
app.get('/', function(req, res) {
	res.send("Bienvenido al servidor de biblioteca");
	console.log('INDEX');
	console.log(__dirname);
});

// GET /books - Devuelve todas los libros del modelo
app.get('/books', function (req, res) {
        bookModel.find(function(err, bookModel) {
					//Si hay error devuelvo status code 500
    	if(err) res.send(500, err.message);
					//Si no hay error devuelvo 200 OK con el body del JSON
			res.status(200).jsonp(bookModel);
			console.log('GET /books')
    });
});

// POST que crea un libro y devuelve todos tras la creación
app.post('/books', function(req, res) {	
	console.log(req.body.nombre);
	//Inserto un libro a la colección con los parámetros recibidos
	bookModel.create({
		id: req.body.id,
		nombre: req.body.nombre,
		isbn: req.body.isbn,
		done: false
	}, function(err, book){
		//Si hay error lo devuelvo por pantalla 
		if(err) {
			res.send(err);
		}
		
		console.log("POST");


//Busco todos los libros de la colección y los devuelvo por pantalla para actualizar la vista. 
		bookModel.find(function(err, books) {
			if(err){
				res.send(err);
			}
			res.json(books);
		});
		
	});
});

//GET para un libro
app.get('/books/:id', function (req, res) {
        bookModel.find(function(err, bookModel) {
    	if(err) res.send(500, err.message);
			res.status(200).jsonp(bookModel);
			console.log('GET /books/:id')
    });
});

// Borra un libro específico y devuelve todos tras borrarlo.
app.delete('/books/:id', function(req, res) {		
	bookModel.remove({ id: req.params.id }, function (err, bookModel) {
  	if(err){
			res.send(err);
		}
		res.status(200).jsonp(bookModel);
		console.log('DELETE /books/:id');		
});
});

//Borra todos los libros
app.delete('/books', function(req, res) {		
	bookModel.remove({ }, function (err) {
  	if(err){
			res.send(err);
		}
		res.status(200).jsonp(bookModel);
		console.log('DELETE /books');
});
});

// Inicio el server
app.listen(3000, function() {
  console.log("Node server corriendo en http://localhost:3000");
  console.log("o en https://proyecto_biblioteca-martinmgc674408.codeanyapp.com/");
});
