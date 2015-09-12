var express = require('express')
   ,app = express()
   ,path = require('path')
   ,server = require('http').Server(app)
   ,io = require('socket.io')(server)
   ,exec = require('child_process').exec
   ,ip = require('ip')
   ,Gpio = require('onoff').Gpio
   ,xbmc = require('xbmc')


var Monitor = (function(){
	function status(cb){
		/*
		exec("xset -q|sed -ne 's/^[ ]*Monitor is //p'", function(error, stdout, stderr){
			if (error !== null){
				console.log('exec error: '+ error);
				return;
			}
			stdout = stdout.trim().toLowerCase();
			//console.log('Monitor is:'+ stdout);
			if (cb){ cb(stdout); }
		});
		*/
		exec("tvservice -s|grep 'off'",function(error, stdout, stdin){
			if (cb){ cb(stdout ? 'off' : 'on'); }
		});
	}

	function turnOn(cb){
		console.log('turnOn');
		/*
		exec('xset dpms force on; xset s noblank',function(error){
			if(error){ cotnsole.log('error: '+ error); }
			status(cb);
		});
		*/
		exec('tvservice -p; chvt 6; chvt 7;', function(error,stdout,stdin){
			if(error){ cotnsole.log('error: '+ error); }
			status(cb);
		});
	}

	function turnOff(cb){
		console.log('turnOff');
		/*		
		exec('xset s blank; xset dpms force off',function(error){
			if(error){ console.log('error: '+ error); }
			status(cb);
		});
		*/
		exec('tvservice -o',function(error){
			if(error){ console.log('error: '+ error); }
			status(cb);
		});
		
	}

	function toggle(cb){
		status(function(data){
			if (data == 'on'){ turnOff(cb); }
			else { turnOn(cb); }
		});

	}

	return {
		status:status,
		turnOn: turnOn,
		turnOff: turnOff,
		toggle: toggle,
		wakeTime: 6,
		sleepTime: 23
	}
})();


app.use(express.static(path.join(__dirname, 'www')));

//Routes
app.get('/', function(req,res){
	res.sendFile(__dirname + '/www/index.html');
});

app.get('/remote', function(req,res){
	res.sendFile(__dirname + '/www/_remote.html');
});

app.get('/qr', function(req,res){
	res.send('<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://'+ ip.address() +':'+ server.address().port +'/remote" />');
});

server.listen(process.env.TEST_PORT || 8080, function(){
	console.log('Listening on port %d', server.address().port);
});

io.sockets.on('connection', function(socket){
	socket.emit('remote', {screenStatus: 'on', sleepTime: Monitor.sleepTime, wakeTime: Monitor.wakeTime});
	
	socket.on('frame', function(data){
		io.sockets.emit('frame', data);
	});
	socket.on('remote', function(data){
		io.sockets.emit('remote', data);
	});
	
	socket.on('server', function(data){
		if (data.action){
			if (data.action = 'ToggleScreen'){
				//toggleScreen();
				//io.sockets.emit('remote', {screenStatus: (screenOn ? 'On' : 'Off')});
				Monitor.toggle(function(data){
					console.log('CB - Monitor is: '+ data);
					io.sockets.emit('remote', {screenStatus: data});
				});
			}
		}
	});
	
});

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
xbmcApi.on('notification:update', function(data){
	console.log('onUpdate', data);
});


/*
var button = new Gpio(18, 'in', 'both');
button.watch(function(err, value) {
    console.log('button press');
});
*/


//Monitor.turnOn();
Monitor.status(function(data){ console.log('monitor is: '+ data); });


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