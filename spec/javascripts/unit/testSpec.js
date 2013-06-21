describe('Index Page Controller Initialise', function() {
  beforeEach(module('controllers'))

	  describe('IndexPageCtrl', function() {
	    var scope;
	 		
	    beforeEach(inject(function($rootScope, $controller) {
	      scope = $rootScope.$new();
	      var ctrl = $controller('IndexPageCtrl', {$scope: scope});
	    }));
	 
	    it('should have a message from the controller', function() {
	      expect(scope.data.message).toBe("A message from IndexPageCtrl");
	    });
	  });
});
 