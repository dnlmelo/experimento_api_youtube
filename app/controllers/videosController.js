(function() {
	angular
		.module('App')
		.controller('VideosController', VideosController);
	
	VideosController.$inject = ['videosService', '$window'];
	
	function VideosController(videosService, $window) {
		var self = this;
		var amount = 12;

		self.videoActive = {
			video_id : '',
			player: null,
			playerVars: {
				autoplay: 1
			}
		}; 
		self.videosService = videosService;
		self.playVideo = playVideo;
		self.loadMore = loadMore;



		function loadMore(){
			setLoadingMore(true);
			videosService
				.getVideosThumbList(true, amount)
					.then(function(response){
						angular.forEach(response.data.items, function(v, k){
							self.list.push(v);
						})
						setLoadingMore(false);
					});
		}

		function playVideo(video_id){
			angular.forEach(self.list, function(v, k){
				if (v.snippet.resourceId.videoId === video_id) {
					self.videoActive.video_id = video_id;
					angular.extend(self.videoActive, v);
					openModal();
				}
			});	
		}

		function openModal(){
			angular
				.element('#modalVideo')
				.modal('show')
				.on('hidden.bs.modal', function (e) {
					self.videoActive.player.pauseVideo();
				})
		}

		function setLoadingMore(bool){
			self.loadingMore = bool;
		}

		videosService
			.getVideosThumbList(false, amount)
				.then(function(response) {
					self.list = response.data.items;
					self.hasNextPage = response.data.nextPageToken || false;
				});		
	}

})();