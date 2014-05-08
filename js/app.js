/**
 * App
 */
var app = angular
			.module('WhoApp', [
				'ngAnimate',
				'ngSanitize',
				'ngRoute']
			)
			.run(function () {
				FastClick.attach(document.body);
			});

/**
 * Controller
 */
app.controller('WhoController', [
		'$scope',
		'$http',
		'$window',
		function($scope, $http, $window)
{
	// Get people
	$scope.people = {};

	// Get JSON
	$http.get('js/pessoas.json').success(function (r) {
		$scope.people = r;
	});
}]);

app.controller('ModalController', [
		'$scope',
		'$http',
		'$window',
		'$routeParams',
		'$location',
		function ($scope, $http, $window, $route, $location)
{

	// Modal
	$scope.modal = {};

	// Open modal
	var markdown = new $window.Showdown.converter(),
		html = '';

	$http.get('pessoas/' + $route.slug + '.md', {cache: false}).success(function (r) {
		angular
			.element(document.querySelector('.modal-content'))
			.html(markdown.makeHtml(r));

		$scope.modal.on = true;
	});

	$scope.disable = function () {
		$scope.modal.on = false;
		$location.path('/').replace();
	}
}]);

/**
 * Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/:slug', {
			templateUrl: 'modal.html',
			controller: 'ModalController'
		});
}]);