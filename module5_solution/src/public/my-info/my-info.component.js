(function () {
"use strict";

angular.module('public')
.component('myInfoDetails', {
	templateUrl: 'src/public/my-info/my-info.component.html',
	bindings: {
		item: '<',
		path: '<',
		info: '<'
	},
	controller: MyInfoComponentController
})

MyInfoComponentController.$inject = ['MenuService', 'ApiPath', 'UserPreferenceService'];
function MyInfoComponentController(MenuService, ApiPath, UserPreferenceService) {
	var $ctrl = this;
	$ctrl.info = {};

	$ctrl.info.firstName = UserPreferenceService.firstName;
	$ctrl.info.lastName = UserPreferenceService.lastName
	$ctrl.info.email = UserPreferenceService.email
	$ctrl.info.phone = UserPreferenceService.phone

	//$ctrl.item = UserPreferenceService.item;
	$ctrl.path = ApiPath;
	console.log('USERSERVICE', UserPreferenceService);
}

})();