function Search(){
    this.price_min = 0;
	this.price_max = 'no max'
	this.makes = ['all'];
	this.retailers = ['all'];
}

Search.prototype.getPriceMin = function(){
	return this.price_min;
}

Search.prototype.getPriceMax = function(){
	return this.price_max;
}
Search.prototype.getMakes = function(){
	return this.makes;
}
Search.prototype.getRetailers = function(){
	return this.retailers;
}
