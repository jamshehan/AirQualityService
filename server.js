const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello');
});

app.post('/slackcommand', (req, res) => {
	console.log({
		command: req.body.command,
	});
	if (req.body.command === '/current-temp')
	{
		request('https://api.thingspeak.com/channels/761289/fields/1/last.txt', (err, resp, body) => {
			//if (err) {return res.status(500).send({ message: console.log(err) }); }
			//console.log(body);
			res.send(`The latest temperature reading is ${body} degrees F`);
		});
	}
	else {
		res.send('unknown command');
	}
});

// Listen on the App Engine-specified port, default to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
