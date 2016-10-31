(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.directive('foundItemsDirective', FoundItemsDirective)
	.service('MenuSearchService', MenuSearchService)
	.constant('baseApiPath', 'https://davids-restaurant.herokuapp.com')

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				finderGen: '<foundItems',
				onRemove: '&' 
			},
		}

		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var finder = this;
		var service = MenuSearchService;
		var item = finder.item;

		finder.message = '';

		finder.onRemove = function(index) {
			service.onRemove(index);
			if (finder.found.length === 0) {
				finder.message = 'And Now What you going to Eat??!';
			}
		}

		finder.getMatchedMenuItems = function(item) {	
			if (item === '' || item === undefined) {
				finder.message = 'Nothing Found';
			} else {
				finder.message = '';

				var promise = service.getMatchedMenuItems(item);

				promise.then(function(response) {
					if (response.length === 0) {
						finder.message = 'Nothing Found';
						finder.found = [];
					} else {
						finder.found = response;
						finder.message = '';
					}	
				})
				.catch(function(error) {
					console.log(error);
				});		
			}
		};
	}

	MenuSearchService.$inject = ['$http', 'baseApiPath']
	function MenuSearchService($http, baseApiPath) {
		var service = this;
		var foundItems;

		service.isEmpty = function(input) {
			if(input === '' || input === []) {
				return 'Nothing found';
			}
		}

		service.onRemove = function(index) {
			foundItems.splice(index, 1);
		}

		service.getMatchedMenuItems = function(searchTerm) {
			var response = $http({
				method: "GET",
				url: (baseApiPath + '/menu_items.json')
			})
			.then(function(response) {
				var items = response.data.menu_items;
				foundItems = [];
				var item;
				for(var i = 0; i < items.length; i++) {
					item = items[i].name.toLowerCase();
					if (item.indexOf(searchTerm.toLowerCase()) !== -1) { //lower could be done with filter factory 
						foundItems.push(items[i]);
					}
				}
				return foundItems;
			})
			.catch(function(error) {
				console.log(error);
			});

			return response;
		}
	}
})();







