(function() {
  "use strict";

  angular.module('data')
    .component('items', {
      bindings: {
        items: '<',
      }
    });
})();
