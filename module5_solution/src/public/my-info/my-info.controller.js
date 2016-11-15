(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['item'];
function MyInfoController(item) {
	var myInfo = this;
	myInfo.item = item;
	console.log('into info controller!!!!: ', myInfo.item);
	if(myInfo.item == undefined) {
		myInfo.noChoseYet = true;
	} else {
		myInfo.noChoseYet = false;
	}
}
})();