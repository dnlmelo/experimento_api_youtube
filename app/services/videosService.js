(function() {
 angular
		.module('App')
		.service('videosService', videosService); 

	videosService.$inject = ['$http', '$filter','$window', 'textEllipsis', 'convertYTDuration'];

	function videosService($http, $filter, $window, textEllipsis, convertYTDuration) {
		var USER_KEY = 'AIzaSyBdNr2_cXg-jcF-0o9ChD4iYezG8JdWnBk',
				CHANNEL_ID = 'UC4Z0baH00h7MewramY_rVLw',
				URL = 'https://www.googleapis.com/youtube/v3',
				nextPageToken = '',
				videoActived = {
					video_id : '',
					playerVars: {
						autoplay: 1
					}
				};


		return {
			getVideosThumbList: getVideosThumbList,
			getMetaInfo: getMetaInfo
		};


		function getMetaInfo(id){
			return $http.get(URL+'/videos', {
				params:{
					key: USER_KEY,
					id: id,
					part: 'snippet, statistics, contentDetails',
					fields:'items(snippet/title, snippet/description, snippet/publishedAt, statistics/viewCount, contentDetails/duration)'
				}
			})
			.then(function(response){
				var data = response.data.items[0];

				data.snippet.titleEllipsis = textEllipsis.ellipsisText(data.snippet.title);
				data.contentDetails.duration = convertYTDuration.toTime(data.contentDetails.duration);
				data.statistics.viewCount = $filter('thousandSuffixFilter')(data.statistics.viewCount);
				data.snippet.publishedAt = $window.moment(data.snippet.publishedAt).format('LL');

				return data;	
			});
		}

		function setNextPageToken(token) {
			nextPageToken = token;
		}

		function getNextPageToken() {
			return nextPageToken;
		}

		function getVideosThumbList(pageToken, amount){
			var list_id = 'UU4Z0baH00h7MewramY_rVLw';	

			var params = {
					params: {
						key: USER_KEY,
						part: 'snippet,status',
						maxResults: amount || 4,
						playlistId: list_id,
						fields: 'items(snippet/thumbnails/medium, snippet/resourceId/videoId),nextPageToken,prevPageToken'
					}
			}

			if (pageToken) {
				params.params.pageToken = getNextPageToken();
			}

			return $http.get(URL+'/playlistItems', params)
				.then(function(response){
					setNextPageToken(response.data.nextPageToken);

					angular.forEach(response.data.items, function(v, k){
						return getMetaInfo(v.snippet.resourceId.videoId)
							.then(function(response){
								angular.merge(v, response);
								return response;
							});
					});
				return response;
			});
		}

	};
})();
