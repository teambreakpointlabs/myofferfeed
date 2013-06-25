describe('routing', function() {
      it('should go to index', function() {
            browser().navigateTo('/');
            expect(browser().location().url()).toBe("/");  
      });
      it('should go to product/offer page', function() {
            browser().navigateTo('#/products');
            expect(browser().location().url()).toBe("/products");  
      });
});