(function() {
	angular
		.module('App')
		.controller('appController', appController);
	
	appController.$inject = ['videosService', '$window', '$timeout'];
	
	function appController(videosService, $window, $timeout) {
		var self = this;
		var amount = 12;

		self.search = '';

		self.videosService = videosService;

		function searchVideo(query) {
			videoService.search(query, amount);
		}
						
	}

})();