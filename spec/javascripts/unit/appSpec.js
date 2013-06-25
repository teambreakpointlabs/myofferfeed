describe("testing module setup", function(){
	describe("Modules are not null", function(){
		var module;
		beforeEach(function(){
			module = angular.module('myOfferFeed');
		});
		it("should not be null", function() {
          expect(module).not.toBe(null);
        });
	});
	describe("module dependencies", function(){
		var module;
		var checkDependencies;
		beforeEach(function(){
			checkDependencies = function(modName){
				module = angular.module(modName);
				return module.requires;
			}
		})

   		it("myOfferFeed module should have one module called myOfferFeedDeps as a dependency", function() {
   		  var dep =  checkDependencies('myOfferFeed');
   		  expect(dep.length).toBe(1);
          expect(dep[0]).toBe('myOfferFeedDeps');
        });
        
        it("myOfferFeedDeps module should have three modules called controllers, directives and services as dependencies", function() {
   		  var dep =  checkDependencies('myOfferFeedDeps');
   		  expect(dep.length).toBe(3);
          expect(dep[0]).toBe('controllers');
          expect(dep[1]).toBe('directives');
          expect(dep[2]).toBe('services');
        });

        it("services module should have ngResource as a dependency", function(){
        	var dep = checkDependencies('services');
        	expect(dep[0]).toBe('ngResource');
        });
	});
});