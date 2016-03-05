(function(){

angular
	.module('App')
	.factory('textEllipsis', textEllipsis);

function textEllipsis() {
	
	return {
		ellipsisText: ellipsisText
	}

	function ellipsisText(text) {
			var maxLength = 28;

			if (text.length > maxLength) {
				return cropText(text);
			}else{
				return text;
			}

			function cropText(){
				return text.slice(0, maxLength) + '...';
			}
		}
	};

})();
