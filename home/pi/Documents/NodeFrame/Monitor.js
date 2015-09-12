var exec = require('child_process').exec;

var Monitor = (function(){
	function status(cb){
		exec('tvservice -s|grep "off"',function(error, stdout, stdin){
			//if(error){ console.log('error: '+ error); }
			if (cb){ cb(stdout ? 'off' : 'on'); }
		});
	}

	function turnOn(cb){
		//console.log('turnOn');
		exec('tvservice -p; chvt 6; chvt 7;', function(error,stdout,stdin){
			//if(error){ console.log('error: '+ error); }
			status(cb);
		});
	}

	function turnOff(cb){
		//console.log('turnOff');
		exec('tvservice -o',function(error){
			//if(error){ console.log('error: '+ error); }
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
		status: status,
		turnOn: turnOn,
		turnOff: turnOff,
		toggle: toggle
	}
})();

module.exports = Monitor;