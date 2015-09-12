/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);

var controller = (function(){
	var paused = false;
	var displayTime = 60;
	//var $loading = null;
	
	function showAlert(text, options){
		var options = $.extend({
			color: 'green',
			icon: null,
			time: 5000		
		}, options);
		// text : message to show (HTML tag allowed)
		// Available colors : red, green, blue, orange, yellow --- add your own!
  		// Set some variables
  		var $container = $('#alerts');
		var icon_markup = "";
		if(options.icon) { icon_markup = "<span class='" + options.icon + "'></span> "; }
		// Generate the HTML
		var html = '<div class="alert alert-' + options.color + '">' + icon_markup + text + '</div>';
		// Append the label to the container
		$container.append(html);
		// After 'time' seconds, the animation fades out
		if (options.time > 0){
			setTimeout(function () {
				$container.children('.alert').first().remove();
			}, options.time);
		}
	}	
	
	function randomNumber(l, h){
		return Math.floor(Math.random()*(h-l+1)+l);
	}
	
	
	
	function init(){
		yepnope({
		  load: [
			'/inc/fonts/Open_Sans/stylesheet.css',
			'/inc/js/store.min.js',
			'/inc/js/jquery.min.js',
			'/inc/js/handlebars.min.js',
			'/inc/js/jquery.mockjax.min.js',
			'/inc/js/date.min.js',
			'inc/js/xbmc.js',
			'config.js',
			'inc/js/Page.js'
		  ],
		  complete: function () {
			  //console.log('controller loaded');
			  load();
			  if (module){
				  //console.log('controller.module', module);
				  module.init();
			  }			  
		  }
		});
	}
	
	
	function load(){
		//console.log('controller load');
		var devCount = 0;
		if (window.config.mockjax){
			$.mockjax(function(settings) {
				var service = settings.url.match(/\/jsonrpc\?request={"jsonrpc":\s"2.0",\s"method":\s"([^"]*)(.*)/);
				if ( service ) {
					/* randomly switch between video types */
					if (service[2].indexOf('VideoGetItem') > 0){
						service[1] += (randomNumber(0, 1) ? '-Movie':'');		 
					}
					if (service[1].indexOf('Player.GetActivePlayers') >= 0 || (window.location.pathname.indexOf('xbmc') > 0 && service[1].indexOf('Player.GetActivePlayers') > 0)){
						if (devCount++ > 1){ service[1] += '-None'; }
						//return service[1] += '-None';
					}
					
					return {
						proxy: 'mocks/' + service[1] + '.json'
					};
				}
				return;
			});
			$.mockjax({
				url: 'https://graph.facebook.com/23312940/home',
				proxy: 'mocks/facebook.json.txt'
			});
			$.mockjax({
				url: 'https://graph.facebook.com/23312940/friends?fields=id,name,birthday',
				proxy: 'mocks/facebook-birthday.json.txt'
			});
			/**/
			$.mockjax(function(settings) {
				var service = settings.url.match(/\/mnt\/user\/Media\/Pictures\/([^\/]*)/);
				if ( service ) {
					if (service[1]){ service[1] = '_'+service[1]; }
					
					return {
						proxy: 'mocks/pictures'+ service[1] +'.html'
					};
				}
				return;
			});
			
		}
		/* End Dev Code */
		
		//$loading = $('<img src="elements/ajax-loader.gif" width="128" height="15" id="loading" />').appendTo('body');
		//$loading = $('#loading');
		$('body').append('<div id="alerts"></div>');
		
		if (window.config.touchScreen){
			$('html').addClass('touch');
			showAlert('Touch Screen Enabled', { time: 2000 });
			var menuHtml = ['<nav id="menu"><ul>'];
			var currentPage = Page.getCurrent();
			$.each(Page.pages, function(index,value){
				if (value.menuName){
					var active = (currentPage.url == value.url) ? 'active': '';
					menuHtml.push('<li><a href="'+ value.url +'" class="'+ active +'">'+ value.menuName +'</a></li>');
				}
			});
			menuHtml.push('</ul></nav>');
			$('body').append(menuHtml.join(''));
			var menu = $('#menu');
			var page = $('#page');
			var trigger = $('<a href="#menu" id="trigger">&equiv;</a>').appendTo('#page').click(function(e){
				e.preventDefault();
				if (menu.hasClass('open')){
					page.css({ left: 0 });
					menu.removeClass('open').css({ left: -200 });
				}
				else {
					page.css({ left: 200 });
					menu.addClass('open').css({ left: 0 });
				}
				
			});
		}
		
		if (window.config.voice){
			showAlert('Voice Commands Enabled', { time: 2000 });
			yepnope({
				load: [
					'http://cdnjs.cloudflare.com/ajax/libs/annyang/0.2.0/annyang.min.js'
				],
				complete: function(){
					if (annyang) {
						console.log('voice test');
						
						var tryGoToPage = function(page) { 
							console.log('voice page', page);
							var p = Page.getByKey(page);
							if (p){
								goto(p.Key);
							}
							else {
								//Show alert
								showAlert('Page "'+ page +'" not found', { color:'red'});
							}
						};
						
						// Let's define our first command. First the text we expect, and then the function it should call
						var commands = {
							'frame go to *search':        tryGoToPage,
							'frame show me *search':      tryGoToPage
						};						
						// Initialize annyang with our commands
						annyang.init(commands);						
						// Start listening. You can call this here, or attach this call to an event, button, etc.
						annyang.start();
					}
					else {
						console.log('voice not supported');
					}								  
				}
			});
		}
		if (window.config.socket){
			//console.log('socket');
			yepnope({
				load: [ '/socket.io/socket.io.js' ],
				complete: function(){
					if (window.io){
						//console.log('has socket.io');
						var qr = $('<img src="/qr" id="qr" />').hide();
						$('body').append(qr);
						var socket = io.connect();
						var p = Page.getCurrent();
						if (p){
							socket.emit('server', {activePage: p.url});
						}
						socket.on('frame', function(data){
							console.log('frame', data);
							if (data.action){
								switch(data.action){
									case 'GoTo':
										if (!p || (p && p.url != data.url && p.key != data.url)){ 
											goto(data.url);
										}
										break;
									case 'QR':
										//qr.toggle(data.show);
										qr.toggle();
										break;
									//case 'image':
									//	console.log('imgage', data);
									//	$('#page').hide();
									//	var img = $('.shared');
									//	var page = $('#page').hide();
									//	if (img.length == 0){img = $('<img class="shared" />').appendTo('body'); }
									//	
									//	//var bin = atob(data.src.split(',')[1]);
									//	var exif = EXIF.readFromBinaryFile(new BinaryFile(data.src));
									//	alert(exif.Orientation);
									//	
									//	
									//	//$('body').append('<img class="shared" src="' + data.src + '" width="'+ data.width +'" height="'+ data.height +'" />');
									//	img.show().attr({'src': data.src, width:data.width, height:data.height});
									//	window.setTimeout(function(){
									//		page.show();
									//		img.hide();
									//	}, 30 * 1000);
									default:
								}			
							}
							
						});
											
					}
				}
			});
		}
		
		
		$(document).bind('keydown', function(event){
			switch(event.which) {
				case 32: // space
				case 39: // right
					event.preventDefault();
					next();
					break;
				
				case 37: // left
					console.log('key: prev');
					event.preventDefault();
					prev();
					break;
						
				default: return; // exit this handler for other keys
			}
		});		
		//play();	
		//checkVideoPlaying();
	}
	/*
	function checkVideoPlaying(){
		console.log('checkVideoPlaying');
		var p = Page.getByKey('xbmc');
		if (!p || !p.url){ return; }
		var current = Page.getCurrent();
		if (current && current.url != p.url){
			window.setTimeout(function(){
				xbmc.isPlaying(function(data){
					console.log('checkVideoPlaying: '+ data);
					if (data){ window.location = p.url; }
					else { checkVideoPlaying(); }
				});
			}, 30 * 1000);
		}
	}
	*/
	function goto(key){
		//console.log('goto',key);
		var url = null;
		if (typeof key == 'object'){ url = key.url; }
		if (typeof key == 'string'){ 
			if (key.indexOf('.html') > 0){ url = key; }
			else { url = Page.getByKey(key).url; } 
		}
		if (typeof key == 'number'){ url = Page.pages[key].url; }
		if (url){
			console.log('goto:url',url);
			//$('#page').css({position:'relative'}).animate({left: -1024}, function(){ window.location = url; });
			$('#page').fadeOut(function(){ window.location = url; });
			//window.location = url;
		}
	}
		
	function pause(){
		console.log('pause');
		paused = true;
	}
	
	function next(){
		var page = Page.getCurrent();
		if (page){
			//console.log('current page', page);
			var nextIndex = (page.index + 1);
			if (nextIndex >= Page.count){ nextIndex = 0; }
			var nextPage = Page.pages[nextIndex];
			//console.log('next page', nextPage);	
			goto(nextPage);
		}
		else {
			console.log('page not found');
		}
	}
	
	function prev(){
		var page = Page.getCurrent();
		if (page){
			//console.log('current page', page);
			var nextIndex = (page.index - 1);
			if (nextIndex < 0){ nextIndex = Page.count; }
			var nextPage = Page.pages[nextIndex];
			//console.log('next page', nextPage);	
			goto(nextPage);
		}
		else {
			console.log('page not found');
		}
	}
	
	function play(){
		console.log('play');
		paused = false;
		window.setTimeout(function(){ if (!paused){ next(); }}, displayTime * 1000);
	}
	
	function loading(value){
		if (value){
			//$loading.show();
		}
		else {
			//$loading.hide();
			$('#page').animate({left: 0});
		}		
	}
	
	return {
		init: init,
		goto: goto,
		pause: pause,
		play: play,
		next: next,
		displayTime: displayTime,
		loading: loading,
	}
}());
controller.init();

var storeWithExpiration = {
	set: function(key, val, exp) {
		store.set(key, { val:val, exp:exp, time:new Date().getTime() });
	},
	get: function(key) {
		var info = store.get(key)
		if (!info) { return null }
		//console.log('ellapsed: '+ (new Date().getTime() - info.time));
		if (new Date().getTime() - info.time > info.exp) { return null }
		return info.val;
	},
	expire: function(key){
		var info = store.get(key);
		var exp = new Date();
		exp.setYear(1900);
		//console.log('expire');
		//console.log(info);
		//console.log({ val: info.val, exp:exp.getTime(), time: info.time });
		store.set(key, { val: info.val, exp:exp.getTime(), time: info.time });
	}
}

/*
 * Add a shuffle function to Array object prototype
 * Usage : 
 *  var tmpArray = ["a", "b", "c", "d", "e"];
 *  tmpArray.shuffle();
Array.prototype.shuffle = function (){
	var i = this.length, j, temp;
	if ( i == 0 ) return;
	while ( --i ) {
		j = Math.floor( Math.random() * ( i + 1 ) );
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
};
*/

Array.prototype.shuffle = function() {
	var l = this.length, x, temp;
	if ( l == 0 ) return this;
	var delta = Math.floor(Math.random() * l) + 1;
	for (x=0; x < delta; x++){
		this.push(this.shift());
	}
	return this;
}
