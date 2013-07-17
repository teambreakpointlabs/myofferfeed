services
.factory('UserEmail', ['$resource', function($resource){
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
	var originalProducts = [];
	var products = [];
	var productsDisplayed = 6;

	function getTvsByAttributes(attributes){
		console.log('orig length - ' + originalProducts.length);
		var priceMin, priceMax, screenMin, screenMax, make, retailer;
		
		for (var key in attributes)
			{
			   if (attributes.hasOwnProperty(key))
			   {
			   		if (key=='price'){
			   		  priceMin = attributes[key].val.min;
			   		  priceMax = attributes[key].val.max;
			   		}else if (key=='screen'){
			   			screenMin = attributes[key].val.min;
			   			screenMax = attributes[key].val.max
			   		}else if (key == 'make'){
			   			make = attributes[key].val;
			   		}else if (key == 'retailer'){
			   			retailer = attributes[key].val;
			   		}
			   }
			}
			 var tvs = [];
			 for (var i=0; i<originalProducts.length; i++){
			 	if ((originalProducts[i].new_price <= priceMax && 
			 		originalProducts[i].new_price >= priceMin) && 
			 		(originalProducts[i].properties.screen_size <= screenMax && originalProducts[i].properties.screen_size >= screenMin)){
			 			tvs.push(originalProducts[i]);
			 	}
			 }
			 angular.copy(tvs, products);
	}

	function getProducts(productType){
		console.log("ProductService getProducts with product type " + productType);
			Product.query({product_type: productType},
			function (data) {
				  var retProducts = data;
				  originalProducts = data;
				  angular.copy(retProducts, products);
				});
	}
	return {
		products: products,
		getProducts: getProducts,
		getTvsByAttributes: getTvsByAttributes,
		productsDisplayed: productsDisplayed
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
.factory('SearchService', function(){

	var currentSearch = {};

	// currentSearch will always exist in the session once search page has
	// been visited by user
	// call this when first search is done or (potentially - when a search with a new
	// product type is conducted)
	function populateInitialSearch(productType){

    var initialSearch = {
    	product_type: productType,
    	price_min: 0,
    	price_max: 'No Max',
    	retailers: [],
    	makes: [],
    	opts: {}
    };

    switch (productType){
    	case 'television':
    	initialSearch.opts['screen_min'] = 0;
    	initialSearch.opts['screen_max'] = 'No Max';
    	initialSearch.opts['tv_type'] = [];
    }
    angular.copy(initialSearch, currentSearch);

	}
	return {
		currentSearch: currentSearch,
		populateInitialSearch: populateInitialSearch
	}
})
.factory('FilterDataService', function(){
	var attributes = {
		price: {
			modal: false,
			val: {
				min: 0,
				max: 5000
			}
		},
		screen: {
			modal: false,
			val: {
				min: 0,
				max: 60
			}
		},
		make:{
			modal: false,
			val: 'all'
		},
		retailer:{
			modal: false,
			val: 'all'
		},
		modal: ''
	};
	return {
		attributes: attributes
	}
})
.factory('AffiliateService', function(){
	//execute skimlinks function on links appended to DOM
	var applyAffiliateLinks = function(){
			$.ajax({
 		  url: 'http://s.skimresources.com/js/54354X1305234.skimlinks.js',
 		  dataType: "script"
		});
	};
	return{
		applyAffiliateLinks: applyAffiliateLinks
	}
});
