(function() {
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
                        .controller('testCtrl', testCtrl);

            testCtrl.$inject = ['$log'];

            function testCtrl($log) {
                        var test = this;
                        test.run = run;

                        function run() {
                                    test.msg = "AngularJs-Grund-Seed";
                        };
                        test.run();
                        $log.info('compited');
                        

            }
})();
(function() {
            'use strict'
angular.module('app')
            .controller('PasswordController', PasswordController);

PasswordController.$inject = ['$scope','$log'];

function PasswordController($scope,$log) {
            $scope.password = '';
            $scope.grade = function() {
                        var size = $scope.password.length;
                        if (size > 8) {
                                    $scope.strength = 'strong';
                        } else if (size > 3) {
                                    $scope.strength = 'medium';
                        } else {
                                    $scope.strength = 'weak';
                        }
            };
            $log.info('compited')
};
})();