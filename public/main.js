//Declaro la aplicacion Angular
angular.module('angularBooks', []);

function mainController($scope, $http) {
	//Formulario de ingreso de datos
	$scope.formData = {};

	// Permite actualizar los datos en la pagina luego de realizar una acción
	$scope.init = function() {
		
		$http.get('/books')
		.success(function(data) {
			$scope.books = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	};
	
	
	// Agrega un libro
	$scope.createBook = function(){
		$http.post('/books', $scope.formData)
			.success(function(data) {
			//Limpia el formulario de ingreso de datos	
				$scope.formData = {};
				$scope.init();
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	// Borra un libro
	$scope.deleteBook = function(id) {
		$http.delete('/books/' + id)
			.success(function() {
				$scope.init();
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
	
	// Borra todos los libros de la biblioteca
	$scope.deleteAllBooks = function() {
		$http.delete('/books')
			.success(function(data) {
				$scope.init();
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
	
	$scope.init();	
}
