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
.factory('ProductService',['Product','SearchService', function(Product, SearchService){
	var products = [];
	var productsDisplayed = 10;
	var order = ['new_price','price'];

	function meetsCriteria(product, currentSearch){
		//console.log(product);
		//console.log(currentSearch);
		if ((product.new_price < currentSearch.price_min) || (product.new_price > currentSearch.price_max)){
			return false;
		}

		if ((currentSearch.makes[0]!="all")&&($.inArray(product.make, currentSearch.makes)==-1) && (currentSearch.makes.length!=0)){
			return false;
		}
		if ((currentSearch.retailers[0]!="all")&&($.inArray(product.retailer, currentSearch.retailers)==-1) && (currentSearch.retailers.length!=0)){
			return false;
		}
		if (product.product_type =='television'){
			if ((product.properties.screen_size < currentSearch.screen_min) || (product.properties.screen_size > currentSearch.screen_max)){
				return false;
			}
		}
		//if the product fulfils all search criteria then return true
		return true;
	}

	function getProductsByCurrentSearch(){
		console.log('getting products by current search of type...');
		console.log(SearchService.currentSearch.product_type);
		Product.query({product_type: SearchService.currentSearch.product_type},
			function(data){
				filterProducts(data);
			});
	}

	function filterProducts(productsToFilter){
		var filteredProducts = [];
		for (var i = 0; i < productsToFilter.length; i++){
			var productToCheck = productsToFilter[i];
			var addToProductsList = meetsCriteria(productToCheck, SearchService.currentSearch);
			if (addToProductsList){
				filteredProducts.push(productToCheck);
			}
		}
		angular.copy(filteredProducts, products);
	}

	return {
		products: products,
		getProductsByCurrentSearch: getProductsByCurrentSearch,
		productsDisplayed: productsDisplayed,
		order: order
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
.factory('SearchService',['$cookieStore', function($cookieStore){

	var currentSearch = {};

  function populateSearch(){
  	console.log('populate search');
  	var search = $cookieStore.get('currentSearch');
  	if (search!=null){
  		console.log('cookies found search');
  	  angular.copy(search, currentSearch);
    }else{
    	console.log('cookies have no search');
    }
  }

	function saveInitialSearch(productType){
		console.log('save initialSearch search');
    var initialSearch;

    switch (productType){
    	case 'television':
    	initialSearch = new TvSearch();
    }
    $cookieStore.put('currentSearch', initialSearch);
    console.log('saved...');
    //console.log($cookieStore.get('currentSearch'));
    //angular.copy(initialSearch, currentSearch);
	}

	function saveCurrentSearchInSession(updatedSearch){
		console.log("saving search in session...");
		$cookieStore.put('currentSearch', updatedSearch);
		console.log($cookieStore.get('currentSearch'));
	}

	function isSearchInSession(){
		console.log("checking if search is in session...");
		var cookieSearch = $cookieStore.get('currentSearch');
			if (cookieSearch == null){
				console.log('search not found in session');
				return false;
			}else{
				console.log('search found in session');
				angular.copy(cookieSearch, currentSearch);
				return true;
			}
	}
	return {
		currentSearch: currentSearch,
		saveCurrentSearchInSession: saveCurrentSearchInSession,
		populateSearch: populateSearch,
		saveInitialSearch: saveInitialSearch
	}
}])
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
