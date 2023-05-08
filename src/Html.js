import { useEffect } from 'react';

export const Html = ({ children, title, assets }) => {
  const insertCss = () => {
	const link = document.createElement('link');
	link.rel = 'stylesheet', link.type = 'text/css';
	assets.css.map((pathToElement, key) => (link.href = pathToElement.toString(), document.head.append(link)));
  };
  useEffect(() => {
	insertCss();
  }, []);
  return (
	<html lang='ru'>
	  <head>
		<meta charSet='utf-8' />
		<meta name="viewport" content='width=device-width, initial-scale=1' />
		<link rel='icon' href='./favicon.ico' />
		<link rel='stylesheet' type='text/css' href='./main.css' />
		<title>{title}</title>
	  </head>
	  <body>
		<noscript><h1>Включите JavaScript в настройках браузера.</h1></noscript>
		{children}
		<script type='application/javascript' src='./api/getPolyfills' />
	  </body>
	</html>
  );
};
