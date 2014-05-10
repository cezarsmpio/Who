/**
 * App
 */
var app = angular
			.module('WhoApp', [
				'ngSanitize',
				'ngRoute']
			)
			.run(function ($rootScope, $route, $http, $window) {
				// For 300ms mobile tap
				FastClick.attach(document.body);

				// Save the active person click
				$rootScope.pessoa = {};

				$rootScope.$watch('pessoa', function () {
					$rootScope.title = 'Who? ' + ($rootScope.pessoa.nome || 'Entrevistas') + ' | UXDEV';
				});

				// Get persons
				$http.get('js/pessoas.json', {cache: false}).success(function (r) {
					$rootScope.pessoas = r;
				});
			});

/**
 * Underscore
 */
app.factory('_', function () {
	return window._;
});


/**
 * Controller
 */


app.controller('ModalController', [
		'$scope',
		'$http',
		'$window',
		'$route',
		'$location',
		'$rootScope',
		'_',
		function ($scope, $http, $window, $route, $location, $rootScope, _)
{

	// Modal
	$scope.modal = {};

	// Pessoa
	$rootScope.pessoa = _.findWhere($rootScope.pessoas, {slug: $route.current.params.slug});

	// Open modal
	var markdown = new $window.Showdown.converter();

	$http.get($rootScope.pessoa.markdown).success(function (r) {
		angular
			.element(document.querySelector('.modal-content'))
			.html(markdown.makeHtml(r));

		$scope.modal.on = true;

		$window.scrollTo(0, 0);
	});


	$scope.disable = function () {
		$scope.modal.on = false;
		$rootScope.pessoa = {};
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
		})
		.otherwise({
			redirectTo : '/'
		});
}]);