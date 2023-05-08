const babelRegister = require('@babel/register');
const express = require('express');
const compress = require('compression');
const { readFileSync } = require('fs');
const render = require('./render');
const PORT = process.env.PORT || 4000;
const app = express();
const polyfillLibrary = require('polyfill-library');

babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: [
	'@babel/preset-env',
	['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

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

app.use(express.static('build'));
app.use(express.static('public'));

app.get('/api/getPolyfills', function (req, res) {
  polyfillLibrary.getPolyfillString({
	uaString: req.headers['user-agent'],
	minify: true,
	features: {
	  es6: {
		flags: ['gated'],
	  },
	},
  })
  .then((sourceBundle => {
	res.status(200);
	res.contentType('application/javascript');
	res.send(sourceBundle);
  }))
  .catch(() => {
	res.status(453);
	res.statusText = 'Не получены поллифиллы!';
  });
});

app.get(/\/*/, handleErrors((req, res) => {
  readFileSync('./build/reactSSR.js');
  render(req, res);
}));

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
