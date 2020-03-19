const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello from Docker node app');
});

app.listen(8080, () => {
	console.log('Listening on port 8080');
});
