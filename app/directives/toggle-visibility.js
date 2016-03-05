(function(){

	angular
		.module('App')
		.directive('toggleVisibility', toggleVisibility);

	function toggleVisibility() {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var className = 'invisible';
				var target = attrs.toggleVisibility;
				var elTarget = angular.element('#'+ target);

				element.bind('click', function(){
					if(elTarget.hasClass(className)){
						elTarget.removeClass(className);
						elTarget.focus();
					}else{
						elTarget.addClass(className);
					}
				});
			}
		};
	};

})();
