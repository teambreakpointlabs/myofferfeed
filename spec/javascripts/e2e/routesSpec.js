describe('routing', function() {
        it('should go to index', function() {
            browser().navigateTo('/');
            //expect(element('h2').count()).toEqual(2);
            //expect(element('h2:first').text()).toEqual('This is the home page');
            expect(browser().location().url()).toBe("/");  
        });
      it('should go to test', function() {
            browser().navigateTo('#/test');
            expect(browser().location().url()).toBe("/test");  
        });
});