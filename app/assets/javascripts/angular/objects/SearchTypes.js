function LaptopSearch(){
	console.log('laptop search constructor');
	Search.call(this);
	this.product_type = 'laptop';
	this.screen_min = 0;
	this.screen_max = 'no max';
}

LaptopSearch.prototype = new Search();
LaptopSearch.prototype.constructor = LaptopSearch;

LaptopSearch.prototype.getProductType = function(){
	return this.product_type;
}
LaptopSearch.prototype.getScreenMin = function(){
	return this.screen_min;
}
LaptopSearch.prototype.getScreenMax = function(){
	return this.screen_max;
}
function TvSearch(){
    console.log('tv search constructor');
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