(function(){
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.items = ''
		$scope.message = '';
		$scope.style = '';
		$scope.animation = '';

		$scope.checkIfToMuch = function() {
			var numberOfItems = $scope.numberOfItems();

			// display based on number of items
			if (numberOfItems === 0 || numberOfItems === '') {
				$scope.message = 'Please, enter data first...';
				$scope.style = 'red;';
				$scope.animation = 'animated infinite flash';
			} else if (numberOfItems <= 3) {
				$scope.message = 'Enjoy!';
				$scope.style = 'green;';
				$scope.animation = 'animated infinite pulse';
			} else {
				$scope.message = 'Too much!';
				$scope.style = 'green;';
				$scope.animation = 'animated zoomInRight';
			}
		}

		$scope.numberOfItems = function() {
			var arrString = $scope.items.split(',');
			var noEmptyStringArray = arrString.filter(returnRealString);

			// check if empy string
			function returnRealString(val) {
				if (/\S/.test(val)) {
					return val;
				}
			}

			return noEmptyStringArray.length;
		}
	}
})();
