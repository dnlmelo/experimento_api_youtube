(function() {
	angular
		.module('App')
		.controller('DestaqueController', DestaqueController);

	DestaqueController.$inject = ['videosService', 'convertYTDuration', 'textEllipsis', '$window', '$filter'];

	function DestaqueController(videosService, convertYTDuration, textEllipsis, $window, $filter) {
		var self = this;

		self.videosService = videosService;
		self.playVideo = playVideo;
		self.loadMore = loadMore;

		self.videoActive = {
			video_id : '',
			playerVars: {
				autoplay: 1
			}
		}; 

		playVideo('uZLtzchX32c'); //first

		function setLoadingMore(bool){
			self.loadingMore = bool;
		}

		function loadMore(){
			setLoadingMore(true);

			videosService
				.getVideosThumbList(true)
					.then(function(response){
						angular.forEach(response.data.items, function(v, k){
							self.list.push(v);
						});
						setLoadingMore(false);
					});
		}

		function playVideo(video_id){
			if (!self.list) {
				videosService
					.getMetaInfo(video_id)
						.then(function(response){
							self.videoActive.video_id = video_id;
							angular.extend(self.videoActive, response);
						});	
			}else{
				angular.forEach(self.list, function(v, k){
					if (v.snippet.resourceId.videoId === video_id) {
						self.videoActive.video_id = video_id;
						angular.extend(self.videoActive, v);
					}
				});	
			}

		}

		videosService
			.getVideosThumbList()
				.then(function(response) {
					self.list = response.data.items;
					self.hasNextPage = response.data.nextPageToken || false;
				});

	}

})();