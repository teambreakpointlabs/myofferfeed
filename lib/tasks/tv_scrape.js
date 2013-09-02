var currysTelevisions = [];
var utils = require('utils');
var fs = require('fs'); 
var casper = require("casper").create({
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)"
    }
});
var currentPage = 1;

var terminate = function() {
    this.echo("finished scraping").exit();
};

function isInt(n) {
   return typeof n === 'number' && n % 1 == 0;
}

function getTelevisionOffers(){
  var tvOfferSections = $('.product.productCompare');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
     var tvOffer = new Array();

      var productLink = "";
      var imageLink = "";
    	var oldPrice = "";
    	var newPrice = "";
    	var discount = "";
    	var screenSize = "";
    	var properties = "";
    	var tvType = "";
    	var make = "";
    	var retailer = 'Currys';
    	var productType = 'television';
    	var percentDiscount = "";

    	if(($(tv).find('.productTitle').find('a').attr('href'))!=null){
    		productLink = $(tv).find('.productTitle').find('a').attr('href');
      }
      if(($(tv).find('.productTitle').find('a').text())!=null){
    		properties = $(tv).find('.productTitle').find('a').text();
      }
      if(($(tv).find('img').attr('src'))!=null){
    		imageLink = $(tv).find('img').attr('src');
      }

      if(($(tv).find('.previousPrice').html())!=null){
      	oldPrice = $(tv).find('.previousPrice').html();
      }
      if(($(tv).find('.offerSticker.offerSaving').html())!=null){
      	discount = $(tv).find('.offerSticker.offerSaving').html();
      }
       if(($(tv).find('.currentPrice').text())!=null){
      	newPrice = $(tv).find('.currentPrice').text();
      }

      oldPrice = oldPrice.replace(",","");
      newPrice = newPrice.replace(",","");
      discount = discount.replace(",","");

      var numPattern = /\d+/g;
      oldPrice = oldPrice.match(numPattern);
      newPrice = newPrice.match(numPattern);
      discount = discount.match(numPattern);

      oldPrice = oldPrice == null ? "" : oldPrice.join(".");
      newPrice = newPrice == null ? "" : newPrice.join(".");
      discount = discount == null ? "" : discount.join(".");

      var checkValid = '^[0-9]+\.?[0-9]*$';
      oldPrice = oldPrice.match(checkValid);
      newPrice = newPrice.match(checkValid);
      discount = discount.match(checkValid);

      var propertiesArr = properties.split(" ");
   
      //filter properties
      for (var i=0; i<propertiesArr.length; i++){
      	//make
      	if (i==0){
      	  make = propertiesArr[i];
        }
        //screen
        if ((propertiesArr[i].match(/\d{2}("|”)/))){
        	screenSize = propertiesArr[i];
        	screenSize = screenSize.replace('"',"");
          screenSize = screenSize.replace('”',"");
        }
        //tv type
        if ((propertiesArr[i]=="LED")||(propertiesArr[i]=="Plasma")||(propertiesArr[i]=="LCD")){
        	tvType = propertiesArr[i];
        }
      }


      tvOffer.push(productLink);
      tvOffer.push(imageLink);
      tvOffer.push(oldPrice);
      tvOffer.push(discount);
      tvOffer.push(newPrice);
      tvOffer.push(retailer);
      tvOffer.push(make);
      tvOffer.push(screenSize);
      tvOffer.push(tvType);
      tvOffer.push(productType);

      if(oldPrice!=null){
      	//work out percent discount
        var oldPriceFloat = parseFloat(oldPrice);
        var discountFloat = parseFloat(discount);
        var percentDiscount = Math.ceil(discount/oldPrice * 100);

      }
      tvOffer.push(percentDiscount);


      return tvOffer;
  });
  //get those with money off
  var tvOffersDiscounted = [];
  for (var i=0;i<tvOffers.length;i++){
  	if(tvOffers[i][2]!=null){
  		tvOffersDiscounted.push(tvOffers[i]);
  	}
  }
  return tvOffersDiscounted;
}

var processPage = function() {
    var url;
    this.echo("capturing page " + currentPage);
    var currysTelevisions = this.evaluate(getTelevisionOffers);
    if (currysTelevisions!=null){
      this.echo(currysTelevisions.length);
      //utils.dump(currysTelevisions);

      for (var i=0; i<currysTelevisions.length;i++){

      	 // var link_url = currysTelevisions[i][0];
      	 // var image_url = currysTelevisions[i][1];
      	 // var old_price = currysTelevisions[i][2];
      	 // var price_off = currysTelevisions[i][3];
      	 // var new_price = currysTelevisions[i][4];
      	 // var retailer = currysTelevisions[i][5];
      	 // var make = currysTelevisions[i][6];
      	 // var screen_size = currysTelevisions[i][7];
      	 // var tv_type = currysTelevisions[i][8];
      	 // var product_type = currysTelevisions[i][9];
      	 // var percent_off = currysTelevisions[i][10];
      	 var tvString = '';
     
      	 for (var j=0; j<currysTelevisions[i].length; j++){

	      	 	// if (typeof(currysTelevisions[i][j])=="string"){
	      	 	// 		tvString = tvString.concat(currysTelevisions[i][j]+';');
	      	 	// }else{
	      	 	  	tvString = tvString.concat(currysTelevisions[i][j]+';');
	      	 	// }
      	 
      	 }

   
      	 // var tvObjString = "Product.create!(link_url:'"+link_url+
      	 // 	"',image_url:'"+image_url+"'" 
      	 // 	+ ",product_type:'"+product_type+"',old_price:"+old_price+",new_price:"+new_price+",price_off:"
      	 // 	+ price_off+",percent_off:"+percent_off+",retailer:'"
      	 // 	+retailer+"',screen_size:"+screen_size+",make:'"
      	 // 	+make+"',tv_type:'"+tv_type+"')";
					//this.echo(tvObjString);
      	 fs.write('lib/tasks/tmp/tv_scrape.txt',tvString+"\n",'a'); 
      }
    }

    //this.capture("currys-results-p" + currentPage + ".png");

    if (currentPage >= 12 || !this.exists(".next")) {
        return terminate.call(casper);
    }

    currentPage++;
    this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    this.thenClick(".next").then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/large-screen-tvs-32-and-over/301_3002_30002_xx_xx/xx-criteria.html", function() {
 
});

casper.waitForSelector('.next', processPage, terminate);

casper.run();