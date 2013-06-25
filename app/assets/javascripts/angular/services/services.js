services
.factory('ProductType', function($resource){
  return $resource('/product_types/:id', {
    id: '@id'
  });
})
.factory('SearchData', function(){
	return {};
});
