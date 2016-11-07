(function() {
  "use strict";

  angular.module('data')
    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items']
    function ItemsController(items) {
      var $itemsCtrl = this;
      $itemsCtrl.items = items.menu_items;
    }
})();
