var express = require('express')
   ,app = express()
   ,path = require('path')
   ,http = require('http')
   ,server = http.Server(app)
   ,io = require('socket.io')(server)
   ,exec = require('child_process').exec
   ,ip = require('ip')
   //,Gpio = require('onoff').Gpio
   //,xbmc = require('xbmc')
   //,xbmc = require('xbmc-ws')
   ,fs = require('fs')
   ,net = require('net')
   ,url = require('url')
   ,GoogleApi = require('./GoogleApi.js')
   ,Monitor = require('./Monitor.js')
   ,config = require('./config.js');

//console.log('Start server.js');



var GPIO = null;
try { GPIO = require('onoff').Gpio; }
catch (ex){ console.log('GPIO not available'); }



app.use(express.static(path.join(__dirname, 'www')));

//Routes
app.get('/', function(req,res){
	res.sendFile(__dirname + '/www/index.html');
});

app.get('/remote', function(req,res){
	res.sendFile(__dirname + '/www/_remote.html');
});

app.get(/^\/events\/(.*)$/, function(req,res){
	if (req.params[0] != ''){
		GoogleApi.getEvents(req.params[0], function(err, data){
			res.json(data);
		});
	}
});

app.get('/nowPlaying', function(req,res){
	//if (nowPlaying != null){
		res.json(nowPlaying);
	//}
});

app.get('/qr', function(req,res){
	var url = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://'+ ip.address() +':'+ server.address().port +'/remote';
	if (req.query.format == 'html'){ res.send('<img src="'+ url +'" />'); }
	else if (req.query.format == 'str'){ res.send(url); }
	else { res.redirect(url); }	
});

app.get(/^\/mnt\/Gallery\/(.*)$/, function(req,res){
	if (req.params[0] == ''){
		res.send(getFiles('/mnt/Gallery'));
	}
	else {
		res.sendFile('/mnt/Gallery/'+ req.params[0]);
	}
});

function getFiles(dir,files_){
    files_ = files_ || [];
    if (typeof files_ === 'undefined') files_=[];
	if (fs.existsSync(dir)){
		var files = fs.readdirSync(dir);
		for(var i in files){
			if (!files.hasOwnProperty(i)) continue;
			var name = dir+'/'+files[i];
			if (fs.statSync(name).isDirectory()){
				getFiles(name,files_);
			} else {
				files_.push(name);
			}
		}
	}
    return files_;
}
//console.log(getFiles('/mnt/Gallery'));


server.listen(process.env.TEST_PORT || 8080, function(){
	console.log('Listening on port %s:%d', ip.address(), server.address().port);
});

var screenStatus = 'on';
var activePage = null;
var nowPlaying = null;

io.sockets.on('connection', function(socket){
	socket.emit('remote', {activePage: activePage, screenStatus: screenStatus, timeSleep: config.timeSleep, timeWake: config.timeWake});
	
	if (nowPlaying != null){
		//console.log('emit:XBMC.NowPlaying');
		setTimeout(function(){ socket.emit('XBMC.NowPlaying', nowPlaying); }, 500);
	}
	
	socket.on('frame', function(data){
		io.sockets.emit('frame', data);
	});
	socket.on('remote', function(data){
		io.sockets.emit('remote', data);
	});
	
	socket.on('server', function(data){
		if (data.activePage){ activePage = data.activePage; io.sockets.emit('remote', {activePage: activePage}); }
		if (data.action){
			if (data.action == 'ToggleScreen'){
				Monitor.toggle(function(data){
					screenStatus = data;
					//console.log('CB - Monitor is: '+ data);
					io.sockets.emit('remote', {screenStatus: data});
				});
			}
			if (data.action == 'SleepWakeTime'){
				//console.log('before', config);
				config.timeSleep = data.timeSleep;
				config.timeWake = data.timeWake;
				config.save();
				//console.log('after', config);
				io.sockets.emit('remote', {timeSleep: config.timeSleep, timeWake: config.timeWake});
			}
			/*
			if (data.action == 'NowPlaying'){
				console.log('NowPlaying');
				getMediaInfo(function(result){
					//console.log('NowPlaying:result', result);
					io.sockets.emit('XBMC.NowPlaying', result);
				});
			}
			*/
			if (data.action == 'XMBC.Demo'){
				console.log('XMBC.Demo');
				xbmcDemo = true;
				//io.sockets.emit('frame', {action:'GoTo', url: 'xbmc'});
				getMediaInfo(function(data){
					if (data != null){
						nowPlaying = data;
						io.sockets.emit('frame', {action:'GoTo', url: 'xbmc'});
					}
				});
			}
		}
	});	
});

//var os = require('os');
var os = require('os-utils');
var ivCPU = setInterval(function(){
	//console.log(os.freemem());
	//console.log(require('os').cpus());
	os.cpuUsage(function(v){
		io.sockets.emit('remote', {stats: {cpu: v, mem: { total: os.totalmem(), free: os.freemem(), percent: os.freememPercentage() }}});
	});
	
	//io.sockets.emit('remote', {stats: {cpu: os.cpus(), mem: { total: os.totalmem(), free: os.freemem() }}});
}, 2 * 1000);




var xbmc = require('xbmc-listener');
var xbmcDemo = false;
var xbmcConnected = true;
var xbmcClient = new xbmc({host:'192.168.0.113', httpPort: 80, debug: false});
xbmcClient.connect();

xbmcClient.on('error', function(){
	xbmcConnected = false;
	console.log('XBMC Connection error');
});

xbmcClient.on('play', function(data){
	console.log('XBMC Play ', JSON.stringify(data));
	if (activePage != 'xbmc.html'){
		//io.sockets.emit('frame', {action:'GoTo', url: 'xbmc'});
		getMediaInfo(function(data){
			if (data != null){
				//console.log('getMedaiInfo data received');
				nowPlaying = data;
				io.sockets.emit('frame', {action:'GoTo', url: 'xbmc'});
			}
		});
	}
	else {
		io.sockets.emit('XBMC.Play', data);
	}
});

xbmcClient.on('pause', function(data){
	console.log('XBMC Pause ', JSON.stringify(data));
	io.sockets.emit('XBMC.Pause', data);
});

xbmcClient.on('stop', function(data){
	console.log('XBMC Stop ', JSON.stringify(data));
	nowPlaying = null;
	//io.sockets.emit('XBMC.Stop', data);
	if (activePage == 'xbmc.html'){
		io.sockets.emit('frame', {action:'GoTo', url: 0});
	}
});

xbmcClient.on('Player.OnPropertyChanged', function(data){
	console.log('XBMC OnPropertyChanged ', JSON.stringify(data));
});

xbmcClient.on('Player.OnSeek', function(data){
	console.log('XBMC OnSeek ', JSON.stringify(data));
});

xbmcClient.on('Player.OnSpeedChanged', function(data){
	console.log('XBMC OnSpeedChanged ', JSON.stringify(data));
});

xbmcClient.on('Playlist.OnRemove', function(data){
	console.log('XBMC OnRemove ', JSON.stringify(data));
});



function getMediaInfo(cb){
	console.log('getMediaInfo');
	if(xbmcConnected && !xbmcDemo){
		//console.log('connected');
		xbmcClient.method('Player.GetItem', { properties: ['title', 'season', 'episode','plot','runtime','showtitle','year','art','genre','director','firstaired'], playerid:1}, 'VideoGetItem', function(err, result){
			if (err){ console.log('Player error', err); cb(null); }			
			cb(result);
		});
	}
	else {
		//console.log('not connected');
		if (xbmcDemo){
			function getRandomInt(min, max) {
			  return Math.floor(Math.random() * (max - min)) + min;
			}
			
			var file;
			if (getRandomInt(0,2)){ file = 'www/mocks/Player.GetItem-Movie.json'; }
			else { file = 'www/mocks/Player.GetItem.json'; }
			
			fs.readFile(file, {encoding:'utf8'}, function(err, data) {
				if (err) { console.log(err); return; }			
				cb(JSON.parse(data).result);
			});
			xbmcDemo = false;
		}
		else {
			cb(null);
		}
	}
}

//var net = require('net');
//var client = net.connect({port: 9090, host: '192.168.0.105'}, function(){
//	//console.log('client connected');
//	//client.write('world!\r\n');
//	var xbmcConnection = xbmc('192.168.0.105', 9090);
//	xbmcConnection.on('Player.OnPlay', function(data){
//		//console.info(name);
//		//console.debug(data.data);
//		/* Get Item */
//		xbmcConnection.run('Player.GetItem')(1,['title', 'season', 'episode','plot','runtime','showtitle','year','art','genre','director','firstaired'], function(err, result){
//			if (err){ console.log('Player error', err); return; }
//			
//			var data = {action:'NowPlaying', item: result }
//			console.log(data);
//			io.sockets.emit('frame', {action:'GoTo', url: 'xbmx'});
//			io.sockets.on('XBMC.Connect', function(){
//				io.sockets.emit('XBMC.NowPlaying',data);
//			});
//		});
//	
//	});
//	xbmcConnection.on('Player.OnPause', function(data){
//		io.sockets.emit('XBMC.Pause', null);
//	});
//	xbmcConnection.on('Player.OnStop', function(data){
//		io.sockets.emit('XBMC.Stop', null);
//	});
//});
//client.on('error', function() {
//	console.log('XBMC Connection error');
//});




/*
var xbmcConnection = new xbmc.TCPConnection({host: '192.168.0.105',port: 9090, verbose:true});
var xbmcApi = new xbmc.XbmcApi;
xbmcApi.setConnection(xbmcConnection);
xbmcApi.connect();
xbmcApi.message('Hello World!');
xbmcApi.on('connection:error', function(data){
	console.log('error', data);
});
xbmcApi.on('connection:open', function(data){
	console.log('Open', data);
});
xbmcApi.on('api:video', function(data){
	console.log('onVideo', data);
});
xbmcApi.on('notification:play', function(data){
	console.log('onPlay', data);
	io.sockets.emit('XBMC.Play', data);
});
xbmcApi.on('notification:stop', function(data){
	console.log('onPlay', data);
	io.sockets.emit('XBMC.Stop', data);
	io.sockets.emit('frame', {action:'GoTo', url: 0 });
});
xbmcApi.on('notification:update', function(data){
	console.log('onUpdate', data);
});
*/

if (GPIO){
	//var btnQR = new GPIO(13, 'in', 'both');
	var btnQR = new GPIO(13, 'in', 'falling', {debounceTimeout: 500});
	btnQR.show = false;
	btnQR.watch(function(err, value) {
		if (err) { console.log('btnQR err: '+ err); exit(); return; }
		//console.log('btnQR press '+ value);
		//btnQR.show = !btnQR.show;
		//var show = (btnQR.show) ? 1 : 0;
		var show = (value == 0) ? 1 : 0;
		//console.log('btnQR show '+ show);
		io.sockets.emit('frame', {action:'QR', show: show});		
	});
	
	var btnShutdown = new GPIO(27, 'in', 'both');
	btnShutdown.start = null;
	btnShutdown.watch(function(err, value) {
		if (err) { console.log('btnShutdown err: '+ err); exit(); return; }
		if (value == 1){
			var cur = new Date().getTime();
			var ellapsed = (cur - btnShutdown.start);
			var secs = (ellapsed/1000);
			//console.log('btnShutdown press '+ value +':'+ btnShutdown.start +','+ cur +','+ ellapsed +','+ secs +'s');
			if (secs >= 5 && secs < 10) {
				exec('sudo reboot', function(error,stdout,stdin){
					if(error){ cotnsole.log('error: '+ error); }		
				});
			}
			if (secs >= 10) {
				exec('sudo shutdown -h now', function(error,stdout,stdin){
					if(error){ cotnsole.log('error: '+ error); }		
				});
			}
			
			btnShutdown.start = null;
		}
		else {
			btnShutdown.start = new Date().getTime();
		}
	});
	/**/

	

}

function exit(){
	if (btnQR) { btnQR.unexport(); }
	if (btnShutdown) { btnShutdown.unexport(); }
	if (xbmcClient) { xbmcClient.end(); }
	process.exit();	
}
process.on('SIGINT', exit);




//Monitor.status(function(data){ console.log('monitor is: '+ data); });

/* check every 15 minute if time to wake/sleep monitor */
var ivMonitor = setInterval(function() {
	var hour = new Date().getHours();
	//console.log('test time: '+ hour);
	if (hour == config.timeSleep && screenStatus == 'on'){ Monitor.turnOff(function(data){ screenStatus = data; io.sockets.emit('remote', {screenStatus: data}); }); }
	if (hour == config.timeWake && screenStatus == 'off'){ Monitor.turnOn(function(data){ screenStatus = data; io.sockets.emit('remote', {screenStatus: data}); }); }
}, 15 * 60 * 1000);


/*
exec('chromium --kiosk --user-data-dir --disable-session-crashed-bubble --disable-restore-session-state --noerrdialogs http://127.0.0.1:'+ server.address().port, function(err){
	if (err){
		console.log('err', err);
	}
	else {
		console.log('chromium running');
	}
});
*/
