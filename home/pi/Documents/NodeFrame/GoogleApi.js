var GoogleApi = (function(){
	var CLIENT_ID = '619569204567-j23j11ubqcju2c8en8ekst4kj3u9cicc.apps.googleusercontent.com'
	var CLIENT_SECRET = 'XMZIq_Z3P1aGJoP1CVfGv4Mf';
	var REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob'
	
	var google = require('googleapis');
	var OAuth2 = google.auth.OAuth2;
	var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
	google.options({ auth: oauth2Client }); // set auth as a global default
	oauth2Client.setCredentials({ 
		access_token: 'ya29.0QDo5nRBcpvHWUTuenjv9ZhIHvN2kYe2wPXY_0GvyB7zGPlc4RfrVWvn-lnhdiKtWTBqYXveDbmgVA',
		token_type: 'Bearer',
		refresh_token: '1/SiXNfrdKcjY-38DWv9SV0hvLtU41jDc_Y_aCPL3M_FE',
		expiry_date: 1417639879682 
	});
	
	var calendar = google.calendar('v3');
	
	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	var lastDay = new Date(y, m + 1, 0);
	
	function getEvents(id, cb){
		calendar.events.list({calendarId: id, timeMin: firstDay.toJSON(), timeMax: lastDay.toJSON()}, function(err, response) {
			//console.log('error: '+ err);
			//console.log('response: '+ JSON.stringify(response));
			cb(err,response);
		});
	}
	
	//getAccessToken(oauth2Client);
	//
	//oauth2Client.getToken('4/LhnQ0d0acHuspqHwPInaNq06T9dln0S2ceM5s36YcUM.gssfFyICfjQZJvIeHux6iLbV_2wjlAI', function(err, tokens) {
	//	console.log('tokens');
	//	console.log(tokens);
	//	console.log('tokens');
	//});
	
//	function getAccessToken(oauth2Client, callback) {
//	  // generate consent page url
//	  var url = oauth2Client.generateAuthUrl({
//		access_type: 'offline', // will return a refresh token
//		scope: 'https://www.googleapis.com/auth/calendar.readonly' // can be a space-delimited string or an array of scopes
//	  });
//	
//	  console.log('Visit the url: ', url);
//	}

return {
	getEvents: getEvents
}
})();

module.exports = GoogleApi;