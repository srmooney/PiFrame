var Page = (function(){
	var pages = [];
	pages.push({key: 'photos', menuName:'Photos', url:'photos.html'});
	//pages.push({key: 'photos-ken', menuName:'Photos Ken Burns', url:'photos_kenburns.html'});
	pages.push({key: 'xbmc', menuName:'', url:'xbmc.html'});
	pages.push({key: 'weather', menuName:'Weather', url:'weather.html'});
	//pages.push({key: 'weather-2', menuName:'Weather Local', url:'weather-local.html'});
	pages.push({key: 'calendar', menuName:'Calendar', url:'calendar.html'});
	pages.push({key: 'calendar-week', menuName:'Calendar - Week', url:'calendar.html?display=week'});
	pages.push({key: 'calendar-day', menuName:'Calendar - Day', url:'calendar.html?display=day'});
	pages.push({key: 'birthdays', menuName:'Birthdays', url:'calendar.html?birthdays=true'});
	pages.push({key: 'traffic', menuName:'Traffic', url:'traffic.html'});
	
	function getByKey(key){
		var page = null;
		$.each(pages, function(index,value){
			if (value.key == key){ page = value; page.index = index; }
		});
		return page;
	}
	
	function getByUrl(url){
		//console.log('getByUrl: '+ url);
		var page = null;
		$.each(pages, function(index,value){
			if (value.url == url){ page = value; page.index = index; }
		});
		return page;
	}
	
	function getCurrent(){
		var url = window.location.toString();
		url = url.substr(url.lastIndexOf('/') + 1);
		return Page.getByUrl(url);
	}
	
	return {
		pages: pages,
		getByKey: getByKey,
		getByUrl: getByUrl,
		getCurrent: getCurrent,
		count: pages.length
	}
}());
