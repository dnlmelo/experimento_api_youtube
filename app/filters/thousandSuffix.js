// Based on http://stackoverflow.com/questions/1571374/converting-values-to-unit-prefixes-in-jsp-page.
// The inner filter function can be used standalone.
(function(){

	angular
		.module('App')
		.filter('thousandSuffixFilter', thousandSuffixFilter);

	function thousandSuffixFilter() {
		return function (input, decimals) {
			var exp, rounded,
					suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

			if(window.isNaN(input)) {
				return null;
			}

			if(input < 1000) {
				return input;
			}

			exp = Math.floor(Math.log(input) / Math.log(1000));
			return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
		};
	};

})();
