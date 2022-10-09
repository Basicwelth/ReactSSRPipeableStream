import { useState, useEffect } from 'react';

export const Html = ({ children, title, assets }) => {
	const [isLoad, setIsLoad] = useState(false);
	useEffect(() => {
		if (!isLoad) {
			setIsLoad(true);
		}
	}, [isLoad]);
	return (
		<html lang="ru">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico"/>
			<link rel="stylesheet" type="text/css" href="/main.css"/>
			{!!(assets && assets.css && isLoad) &&
				assets.css.map((pathToElement, key) => <link key={key} rel="stylesheet" type="text/css" href={'/' + pathToElement} />)
			}
			<title>{title}</title>
		</head>
		<body>
		<noscript><h1>Включите JavaScript в настройках браузера.</h1></noscript>
		{children}
		</body>
		</html>
	);
};
