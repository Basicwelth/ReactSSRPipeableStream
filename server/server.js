const path = require('node:path');
const babelRegister = require('@babel/register');
const express = require('express');
const compress = require('compression');
const { readFileSync, readdirSync } = require('node:fs');
const render = require('./render');
// const {JS_BUNDLE_DELAY} = require('./delays');
const PORT = process.env.PORT || 4000;
const app = express();

babelRegister({
	ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/], presets: [
		'@babel/preset-env', [
			'@babel/preset-react', {
				'runtime': 'automatic'
			}
		]
	]
});

// app.use((req, res, next) => {
// 	if (req.url.endsWith('.js')) {
// 		// Artificially delay serving JS
// 		// to demonstrate streaming HTML.
// 		setTimeout(next, JS_BUNDLE_DELAY);
// 	} else {
// 		next();
// 	}
// });

app.use(compress());

function handleErrors(fn) {
	return async function (req, res, next) {
		try {
			return await fn(req, res);
		} catch (x) {
			next(x);
		}
	};
}

const waitForWebpack = () => {
	try {
		readFileSync(path.resolve(__dirname, '../build/main.js'));
	} catch (err) {
		new Promise(resolve => setTimeout(resolve, 50));
	}
};

app.get('/', handleErrors((req, res) => {
	readdirSync('/', (error, files) => console.log(files));
	waitForWebpack();
	render(req, res);
}));
app.use('/', express.static('build'));
app.use('/', express.static('public'));

app
.listen(PORT, 'localhost', null, () => {
	console.log(`Listening at ${PORT}...`);
})
.on('error', (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const isPipe = portOrPipe => Number.isNaN(portOrPipe);
	const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});
