(function(){
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.items = ''
		$scope.message = '';
		$scope.style = '';

		$scope.checkIfToMuch = function() {
			var numberOfItems = $scope.numberOfItems();
			// display based on number of items
			if (numberOfItems === 0 || numberOfItems === '') {
				$scope.message = 'Please, enter data first...';
				$scope.style = 'red;';
			} else if (numberOfItems <= 3) {
				$scope.message = 'Enjoy!';
				$scope.style = 'green;';
			} else {
				$scope.message = 'Too much!';
				$scope.style = 'green;';
			}
			
		}

		$scope.numberOfItems = function() {
			// split the string into array
			var arrString = $scope.items.split(',');
			var noEmptyStringArray = [];

			// check if empy string
			for (var i = 0; i < arrString.length; i++) {
				if (/\S/.test(arrString[i])) {
					noEmptyStringArray.push(arrString[i]);
				}
			}

			// count elements
			return noEmptyStringArray.length;
		}
	}

})();
