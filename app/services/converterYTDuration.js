(function(){

	angular
		.module('App')
		.factory('convertYTDuration', convertYTDuration);

	convertYTDuration.$inject = ['$window'];

	function convertYTDuration($window) {
		return {
			toTime: toTime
		};

		function toTime(duration) {
			var duration = $window.moment.duration(duration),
					min = duration.minutes(),
					sec = duration.seconds();

			return min + ':' + (sec < 9? ('0'+sec) : sec);
		}
	};

})();
