import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { RoutesConfig } from '../src/RoutesConfig';
import { readdirSync } from 'fs';
import path from 'path';
import os from 'os';

module.exports = function render(req, res) {
  res.socket.on('error', (error) => {
	console.error('Fatal', error);
  });

  const getBuildFiles = readdirSync('./build');
  const createServerData = () => os.hostname();
  const getFiles = (fileExt) => getBuildFiles.filter(element => element.substr(-fileExt.length, fileExt.length) === fileExt).map(value => `${path.dirname(value)}/${value}`);
  let didError = false;
  const data = createServerData();
  const stream = renderToPipeableStream(
	<StaticRouter location={req.url}>
	  <RoutesConfig />
	</StaticRouter>,
	{
	  bootstrapScripts: getFiles('js'),
	  bootstrapScriptContent: `window.assets = ${JSON.stringify({ css: getFiles('css') })}; window.SERVER_DATA = ${JSON.stringify(data)};`,
	  onShellReady() {
		res.statusCode = didError ? 550 : 200;
		res.setHeader('Content-type', 'text/html');
		stream.pipe(res);
	  },
	  onError(x) {
		didError = true;
		console.error(x);
		stream.abort();
	  },
	},
  );
};