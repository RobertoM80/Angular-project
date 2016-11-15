(function () {
"use strict";

angular.module('public')
.component('myInfoDetails', {
	templateUrl: 'src/public/my-info/my-info.component.html',
	bindings: {
		item: '<',
		path: '<'
	},
	controller: MyInfoComponentController
})

MyInfoComponentController.$inject = ['MenuService', 'ApiPath'];
function MyInfoComponentController(MenuService, ApiPath) {
	var $ctrl = this;

	//$ctrl.item = UserPreferenceService.item;
	$ctrl.path = ApiPath;
	//console.log(UserPreferenceService.item);
}

})();