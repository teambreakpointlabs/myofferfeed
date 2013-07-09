controllers
.controller('AutocompleteCtrl', ['$scope', 'ProductTypeService', 'SessionDataService', function($scope, ProductTypeService, SessionDataService){
	
	$scope.productTypeService = ProductTypeService;
	$scope.sessionDataService = SessionDataService;

	$scope.productTypeService.getProductTypes(); 
	$scope.productTypes = ProductTypeService.productTypes;
	
	$scope.updateProductType = function(productType){
  	  $scope.sessionDataService.updateProductType(productType);
	}
}])
.controller('ProductsCtrl',['$scope','ProductService', '$location', 'SessionDataService', function($scope, ProductService, $location, SessionDataService){

	$scope.productService = ProductService;
	$scope.productService.products = ProductService.products;
	$scope.productType = SessionDataService.productType;
  	
  $scope.updateProducts = function(productTypeNew){
  	console.log('updating products for product type: ' + productTypeNew);
  	$scope.productService.updateProducts(productTypeNew);
  	$scope.products = ProductService.products;
  }	


	$scope.$watch('productType', function(productTypeNew, productTypeOld){
		  //update products
			if (productTypeNew != ''){
				$scope.updateProducts(productTypeNew);
				$scope.isProducts = true;
			}else{
				$scope.isProducts = false;
			}
	}, true);
}])
.controller('SearchProductsCtrl',['$scope', '$location','ProductService','SessionDataService', function($scope, $location, ProductService, SessionDataService){
	
	$scope.productService = ProductService;
	$scope.productService.products = ProductService.products;
	$scope.numDisplayed = 6;

	$scope.searchTv = function(){
		console.log('searching...');
		$scope.productService.updateProducts('television');
		$location.path('/app');
	}
	$scope.loadMore = function(){
		$scope.numDisplayed += 6;
	}
}])
.controller('LaunchCtrl', ['$scope','UserEmail',function($scope, UserEmail){


  $scope.register = function(form_email) {
  	console.log("registering");
  	//console.log(UserEmail);
  	var obj = new UserEmail();
  	obj.email = form_email;
  	console.log(obj);
  	register_email = form_email;
  	obj.$save(function(response){

  		console.log('saved');

  	}, function(response){
  			$scope.exists = true;
  			console.log('exists');
  	});
  };
}]);






