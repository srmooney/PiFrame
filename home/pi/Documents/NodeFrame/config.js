var fs = require('fs');

var config = (function(){
	var timeSleep = 23;
	var timeWake = 6;
	var fileName = 'config.json';
	
	fs.readFile(fileName, null, function(err, data) {
		if (err) { console.log(err); return; }
		
		var obj = null
		try { obj = JSON.parse(data) }
		catch (err2) { console.log(err); return; }
		
		timeSleep = obj.timeSleep;
		timeWake = obj.timeWake;
	})
	
	function save(){
		var data = {timeSleep: timeSleep, timeWake: timeWake };
		
		fs.writeFile(fileName, JSON.stringify(data, null), function(err){
			if(err){ console.log(err); }
			else { console.log("JSON saved to " + fileName); }
		});		
	}
	
	return { 
		timeSleep: timeSleep, 
		timeWake: timeWake, 
		save: save 
	}
})();

module.exports = config;