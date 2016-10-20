// Init express

var express = require('express');
var app = express();

app.set("port", process.env.PORT || 3000);

// Parse JSON Body

var bodyParser = require('body-parser')
app.use(bodyParser.json())

// Add websocket support

var expressWs = require('express-ws')(app);

// Subscriptions

var subscriptions = {};

// Gate for client

app.ws('/gate', function(ws, req) {
	ws.on('message', function(msg) {
		msg = JSON.parse(msg);

		if(msg.message == "subscribe"){
			msg.keys.forEach(function(key){
				if(subscriptions[key] == undefined){
					subscriptions[key] = [];
				}

				subscriptions[key].push(ws);
			});
		}

		console.log(subscriptions);
	});
});

// Gate for Tasker

app.post('/', function (req, res) {
	var keys = req.body.key.split("|");

	var sentTo = [];

	keys.forEach(function(key){
		if(subscriptions[key] == undefined){
			subscriptions[key] = [];
		}

		subscriptions[key] = subscriptions[key].filter(function (ws){
			try{
				if(!sentTo.includes(ws)){
					ws.send(JSON.stringify(req.body));

					sentTo.push(ws);
				}
				else
				{
					ws.send(JSON.stringify({action: "_ping"}));
				}

				return true;
			} catch(e){
				return false;
			}
		});
	});

	res.send({status: "ok", sentTo: sentTo.length});
});

// Listen

app.listen(app.get("port"), function () {
	console.log('tasker-server is listening on '+app.get("port")+"!");
});

