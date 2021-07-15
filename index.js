const express = require('express');
const path = require('path');
const fs = require('fs');

const requestVFSFiles = require('./filesCounter.js');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'views')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.get('/api/:date', async (req, res) => {
	const dateDepot = req.params.date;

	try {
		const dossiersRestants = fs.readFileSync(path.resolve(__dirname, 'logs', `vfs ${dateDepot} ${new Date().toDateString()}.txt`), {encoding: 'utf-8'});
	
		res.json({
			dossiersRestants
		});
	} catch (error) {
		const dossiersRestants = await requestVFSFiles(dateDepot, [1, 1], [2, 100]);

		res.json({
			dossiersRestants
		});
	}
});


app.use('*', (req, res) => {
	res.sendStatus(404);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`server up and running on port ${port}`);
});
