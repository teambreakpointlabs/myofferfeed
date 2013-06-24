directives.directive('autoComplete',['autoCompleteService', function(autoCompleteService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.autocomplete({
                source: autoCompleteService.getSource(),
                minLength: 1,
            });
        }
    };
}]);