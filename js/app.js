/**
 * App
 */
var app = angular
			.module('WhoApp', [
				'ngAnimate',
				'ngSanitize',
				'ngRoute']
			)
			.run(function ($rootScope, $route) {
				// For 300ms mobile tap
				FastClick.attach(document.body);

				// Save the active person click
				$rootScope.active = {};
			});

/**
 * Controller
 */
app.controller('WhoController', [
		'$scope',
		'$http',
		'$window',
		'$rootScope',
		function($scope, $http, $window, $rootScope)
{
	// Get people
	$scope.people = {};

	// Get JSON
	$http.get('js/pessoas.json').success(function (r) {
		$scope.people = r;
	});

	// Active person
	$scope.activeItem = function (p) {
		$rootScope.active = p;
	};
}]);

app.controller('ModalController', [
		'$scope',
		'$http',
		'$window',
		'$route',
		'$location',
		'$rootScope',
		function ($scope, $http, $window, $route, $location, $rootScope)
{

	// Modal
	$scope.modal = {};

	// Open modal
	var markdown = new $window.Showdown.converter(),
		html = '',
		url = $rootScope.active.md || 'pessoas/' + $route.current.params.slug + '.md';

	$http.get(url, {cache: false}).success(function (r) {
		angular
			.element(document.querySelector('.modal-content'))
			.html(markdown.makeHtml(r));

		$scope.modal.on = true;

		$window.scrollTo(0, 0);
	});

	$scope.disable = function () {
		$scope.modal.on = false;
		$rootScope.active = {};
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
			controller: 'ModalController',
			title: 'teste'
		})
		.otherwise({
			redirectTo : '/'
		});
}]);