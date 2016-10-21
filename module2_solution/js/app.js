// I Implemented extra funtionality and a third controller just
// for practice purposes. I apologize if it make the code a bit less
// redable.

(function(){
	'use strict'

	var items = [
					{
						name: 'Cookies',
						quantity: 12
					},
					{
						name: 'Crackers',
						quantity: 2
					},
					{
						name: 'Crisps',
						quantity: 12
					},
					{
						name: 'Sprite',
						quantity: 3
					},
					{
						name: 'Ice Tea',
						quantity: 5
					},
					{
						name: 'Choco Something',
						quantity: 6
					},
				];

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.controller('AddItemController', AddItemController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var toBuy = this;
		var service = ShoppingListCheckOffService;

		toBuy.items = service.getItemsToBuy();
		toBuy.bought = function(index) {
			service.itemBought(index);
		}
		toBuy.cancelItem = function(index) {
			service.cancelItemToBuy(index);
		}
		
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var bought = this;
		var service = ShoppingListCheckOffService;

		bought.items = service.getBoughtItems();
		bought.cancelItem = function(index) {
			service.cancelItemBought(index);
		}
	}

	AddItemController.$inject = ['ShoppingListCheckOffService'];
	function AddItemController(ShoppingListCheckOffService) {
		var itemAdder = this;
		var service = ShoppingListCheckOffService;
		itemAdder.itemName = '';
	    itemAdder.itemQuantity = '';

	    itemAdder.errorMessage = function(){
	    	return service.errorMessage;
	    };

		itemAdder.pushNewItem = function(){
			service.pushItem(itemAdder.itemName, itemAdder.itemQuantity);
		};
	}

	function ShoppingListCheckOffService(){
		var service = this;
		var toBuyItems = items;
		var boughtItems = [];
		var errorMessage = '';

		service.getItemsToBuy = function(){
			return toBuyItems;
		};

		service.getBoughtItems = function(){
			return boughtItems;
		};

		service.itemBought = function(index){
			boughtItems.push(toBuyItems[index]);
			toBuyItems.splice(index, 1);
		};

		service.cancelItemToBuy = function(index){
			toBuyItems.splice(index, 1);
		}

		service.cancelItemBought = function(index){
			boughtItems.splice(index, 1);
		}

		service.pushItem = function(itemName, itemQuantity){
			var newItem = {};

			if(itemName !== '' && itemQuantity !== '') {
				newItem = {
					name: itemName,
					quantity: itemQuantity
				};
				toBuyItems.push(newItem);
			} else if(itemName === '' && itemQuantity !== ''){
				service.errorMessage = 'Please, Insert an Item as well..';
			} else if(itemQuantity === '' && itemName !== '') {
				service.errorMessage = 'Please, Insert a Quantity as well..';
			} else {
				service.errorMessage = "You didn't insert any product!!";
			}
		};
	}
})();