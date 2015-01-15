describe('Testing testCtrl  controller', function() {
            beforeEach(module('app'));

            var $controller;

            beforeEach(inject(function(_$controller_) {
                        // The injector unwraps the underscores (_) from around the parameter names when matching
                        $controller = _$controller_;
            }));

            describe('this.msg', function() {
                        var $scope, controller;

                        beforeEach(function() {
                                    $scope = {};
                                    controller = $controller('testCtrl', {
                                                $scope: $scope
                                    });
                        });

                        it('sets the title names', function() {
                        	     controller.run();
                                    expect(controller.msg).toEqual('AngularJs-Grund-Seed');
                        });

            });
});
