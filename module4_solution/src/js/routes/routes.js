(function() {
  "use strict";

  angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

      //view if no path is found
      $urlRouterProvider.otherwise('/');

      $stateProvider
        //Home view
        .state('home', {
           url: '/',
           templateUrl: 'src/templates/home.html'
        })
        //Category view
        .state('categories', {
          url: '/categories',
          templateUrl: 'src/templates/categories.html',
          controller: 'CategoriesController as $ctrl',
          resolve: {
            categories: ['MenuDataService', function(MenuDataService) {
            return  MenuDataService.getAllCategories()
                .then(function(result){
                  return result;
                });
            }]
          }
        })
        //Item per Category view
        .state('cat-items', {
          url: '/cat-items/{categoryShortName}',
          templateUrl: 'src/templates/categoryItems.html',
          controller: 'ItemsController as $itemsCtrl',
          resolve: {
            items: ['$stateParams', 'MenuDataService',
              function($stateParams, MenuDataService){
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                  .then(function(result){
                    return result;
                  });
            }]
          }
        });
    };
})();
