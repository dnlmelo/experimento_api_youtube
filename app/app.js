(function(){
	var dependencies = ["ngRoute","youtube-embed"];

	angular
		.module('App', dependencies)
		.config(["$routeProvider",
			function($routeProvider){
				$routeProvider.otherwise({redirectTo:"/destaque"});	

				$routeProvider.when("/destaque", { 
					templateUrl: "views/destaque.html",
					controller: "DestaqueController",
					controllerAs:"vm"
				});
				
				$routeProvider.when("/videos",{
					templateUrl:"views/videos.html",
					controller:"VideosController",
					controllerAs:"vm" 
				});
		}]);
})();
