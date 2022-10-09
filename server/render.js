import { renderToPipeableStream } from 'react-dom/server';
import { App } from '../src/App';
import { DataProvider } from '../src/data';
import { readdirSync } from 'node:fs';
import { API_DELAY, ABORT_DELAY } from './delays';

module.exports = function render(req, res) {

	res.socket.on('error', (error) => {
		console.error('Fatal', error);
	});

	let didError = false;
	const data = createServerData();
	const jsFiles = getFiles('js');
	const cssFiles = getFiles('css');
	const assets = {
		css: cssFiles
	};
	const stream = renderToPipeableStream(
		<DataProvider data={data}>
			<App/>
		</DataProvider>,
		{
			bootstrapScripts: jsFiles,
			bootstrapScriptContent: `window.assets = ${JSON.stringify(assets)}`,
			onShellReady() {
				res.statusCode = didError ? 500 : 200;
				res.setHeader('Content-type', 'text/html');
				stream.pipe(res);
			},
			onError(x) {
				didError = true;
				console.error(x);
				stream.abort();
			}
		}
	);
	// setTimeout(() => stream.abort(), ABORT_DELAY);
};
// Simulate a delay caused by data fetching.
// We fake this because the streaming HTML renderer
// is not yet integrated with real data fetching strategies.
function createServerData() {
	let done = false;
	let promise = null;
	return {
		read() {
			if (done) {
				return;
			}
			if (promise) {
				throw promise;
			}
			promise = new Promise((resolve) => {
				setTimeout(() => {
					done = true;
					promise = null;
					resolve();
				}, API_DELAY);
			});
			throw promise;
		}
	};
}

function getFiles (fileExt) {
	let asset = readdirSync('./build', (error, files) => files);
	return asset.filter(element => element.substr(-fileExt.length, fileExt.length) === fileExt);
};
