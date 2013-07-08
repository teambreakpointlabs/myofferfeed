services
.factory('UserEmail', ['$resource', function($resource){
	console.log('creating');
	return $resource('/user_email/:id',{
		id: '@id'
	});
}])
.factory('ProductType',['$resource', function($resource){
  return $resource('/product_types/:id', {
    id: '@id'
  });
}])
.factory('Product',['$resource', function($resource){
	return $resource('/products/:id', {
		id: '@id'
	});
}])
.factory('ProductService', ['Product', function(Product){
	var products = [];

	function updateProducts(productType){
		console.log("ProductService updateProducts with product type " + productType);
			Product.query({product_type: productType},
			function (data) {
				console.log("ProductService updateProducts returned " + data);
				  var retProducts = data;
				  angular.copy(retProducts, products);
				  console.log(retProducts);
				});
	}
	return {

		products: products,
		updateProducts: updateProducts

	}}])
.factory('ProductTypeService',['ProductType', function(ProductType){
	var productTypes = [];
	
	function getProductTypes(){
		console.log('get ProductTypes service');
		ProductType.query({},
		function(data){
			var productTypeNames = [];
			for (i=0;i<data.length;i++){
				productTypeNames.push(data[i].product_type);
			}
			angular.copy(productTypeNames, productTypes);
		});	
	}

return {

	 productTypes: productTypes,
	 getProductTypes: getProductTypes

}}])
.factory('SearchService', ['Product', function(Product){

	var results = [];


	function find(productType){
		console.log('find');
		
		
		Product.query({product_type: productType},
			function (data) {
				console.log("getting products");
				
				  var products = data;
				  angular.copy(products, results);
				  console.log(results);
			
				});
	}

	return {
		results: results,
		find: find
	}
}])
.factory('SessionDataService',function(){
	var productType = [];

	function updateProductType(productTypeNew){
		console.log('SessionDataService: inside update product method');
		var productTypeObj = [productTypeNew];
		angular.copy(productTypeObj, productType);
		console.log('SessionDataService: updated productType to '+ productType);

	}

	return {
		productType: productType,
		updateProductType: updateProductType
	}
});
