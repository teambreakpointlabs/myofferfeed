directives
.directive('autoComplete',function() {
	return {
	  restrict: 'A',
	  link: function(scope, elm) {
	    scope.$watch('productTypes', function(productTypes) {
	      elm.autocomplete({
	        source: productTypes,
	        minLength: 1,
	        select: function(event, ui){
	           var productType = ui.item.value;
	           scope.$apply(function(){
	           	scope.updateProductType(productType);
	           });
	      	}});
		},true);
	  }
	}
});
