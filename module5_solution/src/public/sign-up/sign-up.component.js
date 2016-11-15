(function () {
"use strict";

angular.module('public')
.component('signUp', {
	templateUrl: 'src/public/sign-up/sign-up.component.html',
	controller: SignUpComponentController
})

SignUpComponentController.$inject = ['MenuService', 'UserPreferenceService'];
function SignUpComponentController(MenuService, UserPreferenceService) {
	var $ctrl = this;

	$ctrl.checkAvailability = function () {
		return MenuService.getItem($ctrl.user.menuItemNumber)
		.then(function(response) {
			$ctrl.itemFound = true;
			$ctrl.doesItemExist = null;
		}).catch(function(error) {
			$ctrl.doesItemExist = false;
			$ctrl.itemFound = false;
		})
	};

	$ctrl.submit = function() {
		console.log('item: ', $ctrl.user.menuItemNumber);
		console.log('first', $ctrl.user.firstName)
		UserPreferenceService.firstName = $ctrl.user.firstName;
		UserPreferenceService.lastName = $ctrl.user.lastName;
		UserPreferenceService.email = $ctrl.user.email;
		UserPreferenceService.phone = $ctrl.user.phoneNum;
		return MenuService.getItem($ctrl.user.menuItemNumber)
		.then(function(response) {
			console.log(response);
			UserPreferenceService.userBestItem = response.name;
			UserPreferenceService.item = response;
			$ctrl.doesItemExist = true;
		})
		.catch(function(error) {
      console.log('ERRORRRRRRREEE!!!!!', error);
      $ctrl.doesItemExist = false;
    });
	};
	
}
})();