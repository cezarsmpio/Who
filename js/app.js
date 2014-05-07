/**
 * App
 */
var app = angular.module('WhoApp', ['ngAnimate', 'ngSanitize']);

/**
 * Controller
 */
app.controller('WhoController', ['$scope', '$http', '$window', function($scope, $http, $window) {
	// Get people
	$scope.people = {};

	// Modal
	$scope.modal = {};
	$scope.modal.on = false;
	$scope.modal.md = '';

	// Get JSON
	$http.get('js/pessoas.json').success(function (r) {
		$scope.people = r;
	});

	// Open modal
	$scope.openModal = function (o) {
		var markdown = new $window.Showdown.converter(),
			html = '';

		$http.get(o.markdown, {cache: false}).success(function (r) {
			angular
				.element(document.querySelector('.modal-content'))
				.html(markdown.makeHtml(r));

			$scope.modal.on = true;
		});
	};
}]);