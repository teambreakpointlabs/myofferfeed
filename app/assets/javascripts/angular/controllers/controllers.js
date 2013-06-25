controllers
.controller('IndexPageCtrl', ['$scope', 'ProductType', 'SearchData', function($scope, ProductType, SearchData){
	 ProductType.query({},
	 function(data){
		 	var productTypeNames = new Array();
		 	for (i=0;i<data.length;i++){
		 		productTypeNames.push(data[i].product_type);
		 	}
		  $scope.productTypes = productTypeNames;
		});	
	 $scope.searchData = SearchData;
}])
.controller('OfferPageCtrl',['$scope', 'SearchData', function($scope, SearchData){
  $scope.searchData = SearchData;
	var productType = $scope.searchData.productType;
	// Product.query({product_type: productType},
	// function (data) {
  //   $scope.products = data;
  // });
}])
.controller('SearchCtrl',['$scope', '$location', function($scope, $location){
	$scope.search = function(){
  	$location.path('/products');
	}
}]);