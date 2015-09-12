var xbmc = function(){
	//var endPoint = '/inc/proxy.ashx?url=http://192.168.0.105/jsonrpc?request=';
	var endPoint = 'http://192.168.0.113/jsonrpc?request=';
	
	function getPlayer(callback){
		var json = '{"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}';
		//$.getJSON(endPoint + json, callback);
		/**/
		$.ajax({
			dataType:'json',
			url: endPoint + json,
			success: callback,
			error: function(jqHXR,text,err){ console.log('error',jqHXR,text,err); }
		});			
	}
	
	function getAudioDetails(callback){
		var json = ''
	}
	
	function getVideoDetails(callback){
		//var json = '{"jsonrpc": "2.0", "method": "Player.GetItem", "params": { "properties": ["title", "album", "plotoutline", "artist", "season", "episode", "duration", "showtitle", "tvshowid", "thumbnail", "file", "fanart", "streamdetails"], "playerid": 1 }, "id": "VideoGetItem"}';
		//var json = '{"jsonrpc": "2.0", "method": "Player.GetItem", "params": {"properties":["title","season","episode","plot","runtime","showtitle","thumbnail","fanart"], "playerid": 1 }, "id": "VideoGetItem"}';
		var json = '{"jsonrpc": "2.0", "method": "Player.GetItem", "params": {"properties":["title","season","episode","plot","runtime","showtitle","year","art","genre","director","firstaired"], "playerid": 1 }, "id": "VideoGetItem"}';
		//$.getJSON(endPoint + json, callback);
		$.ajax({
			dataType:'json',
			contentType: 'application/json',
			url: endPoint + json,
			success: callback,
			error: function(result){ console.log('error',result); }
		});
	}
	
	function getImagePath(rawPath){
		if (!rawPath || rawPath == '') { return ''; }
		var path = rawPath.replace('image://','');
		path = path.substring(0, path.length - 1);
		path = decodeURIComponent(path);
		//thumbnail: "image://http%3a%2f%2fthetvdb.com%2fbanners%2fepisodes%2f80379%2f363199.jpg/"
		return path;
	}
	
	function durationToString(duration) {
		var total_seconds = duration || 0,
			seconds = total_seconds % 60,
			minutes = Math.floor(total_seconds / 60) % 60,
			hours = Math.floor(total_seconds / 3600),
			result = ((hours > 0 && ((hours < 10 ? '0' : '') + hours + ':')) || '');
		result += (minutes < 10 ? '0' : '') + minutes + ':';
		result += (seconds < 10 ? '0' : '') + seconds;
		return result;
	}
	
	function isPlaying(callback){
		getPlayer(function(data){
			console.log('data1', data);
			//data = $.parseJSON(data);
			//console.log(data);
			callback((data && data.result && data.result.length > 0));
		});
	}
	
	function nowPlaying(callback){
		console.log('now playig');
		getPlayer(function(data){
			console.log(data);
			//data = $.parseJSON(data);
			//console.log(data);
			if (data && data.result && data.result.length > 0) {
				if (data.result[0].type == 'video'){
					console.log('get video');
					getVideoDetails(function(data){
						console.log('got video');
						console.log(data);
						data.result.item.runtime = durationToString(data.result.item.runtime);
													
						/* add season and episode to title if tv show */
						if (data.result.item.type == 'episode'){
							data.result.item.thumbnail = getImagePath(data.result.item.art['tvshow.poster']);
							data.result.item.art.fanart = getImagePath(data.result.item.art['tvshow.fanart']); 
							data.result.item.airDate = data.result.item.firstaired;
							if (data.result.item.season >= 0 && data.result.item.episode >= 0) {
								data.result.item.subTitle = data.result.item.season + 'x' + data.result.item.episode + ' ' + data.result.item.title;
								data.result.item.title = data.result.item.showtitle;
							}
						}
						else {
							data.result.item.thumbnail = getImagePath(data.result.item.art['poster']);
							data.result.item.art.fanart = getImagePath(data.result.item.art.fanart);
							data.result.item.airDate = data.result.item.year;
						}
						
						callback(data);
					});
				}					
			}
			else {
				console.log('nothing playing: '+ data.result[0]);
			}
		});
	}
	
	return {
		nowPlaying: nowPlaying,
		isPlaying: isPlaying
	}
}();
