describe('Index Page Controller Initialise', function() {
  
  beforeEach(module('controllers'))
  beforeEach(module('services'))

	  describe('IndexPageCtrl', function() {
	    var scope, ctrl, $httpBackend;
	 		
	    beforeEach(inject(function(_$httpBackend_,$rootScope, $controller) {
	      $httpBackend = _$httpBackend_;
	      $httpBackend.expectGET('/product_types').respond([{id:1, product_type: 'television'},{id:2, product_type:'tv'}]);
	      scope = $rootScope.$new();
	      ctrl = $controller('IndexPageCtrl', {$scope: scope});
	    }));
	 
	    it('should have product type names for autocomplete', function() {
	 		  expect(scope.productTypes).toBeUndefined();
	  		$httpBackend.flush();
	  		expect(scope.productTypes).toEqual(['television','tv']);
	    });
	    
	  });
});
 