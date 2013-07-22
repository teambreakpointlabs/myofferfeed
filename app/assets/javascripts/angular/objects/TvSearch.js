function TvSearch(){
	Search.call(this);
	this.product_type = 'television';
	this.screen_min = 0;
	this.screen_max = 'no max';
}

TvSearch.prototype = new Search();
TvSearch.prototype.constructor = TvSearch;

TvSearch.prototype.getProductType = function(){
	return this.product_type;
}
TvSearch.prototype.getScreenMin = function(){
	return this.screen_min;
}
TvSearch.prototype.getScreenMax = function(){
	return this.screen_max;
}