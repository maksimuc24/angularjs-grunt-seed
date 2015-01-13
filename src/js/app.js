(function(){
      'use strict'
       /**
  * @ngdoc overview
  * @ngdoc directive
  * @name myApp.maincontroller:controller
   * @description
 * sadddddddddddddddddddddddddd asdddddddddddd
 *
  * # myApp
  * The factoryName is my favorite service in the world.
  *
  */
      angular.module("app", ['ngSanitize']);
/**
          * @ngdoc function
          * @name mySuperFunction
          * @returns {int} The int representing a Firebase resource
          */

        angular
                 .module('app')
                 .controller('testCtrl',testCtrl);

                 testCtrl.$inject = ['$log'];

                 function testCtrl($log){
                            var test = this; 

                            test.msg = "AngularJs-Grund-Seed";
                            $log.info('compited')             

                 }
})();     