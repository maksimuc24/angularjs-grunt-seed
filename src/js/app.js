(function(){
      'use strict'
      angular.module("app", ['ngSanitize']);

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