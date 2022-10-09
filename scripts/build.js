const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
rimraf.sync(path.resolve(__dirname, '../build'));
webpack({
	mode: process.env.NODE_ENV,
	devtool: isProduction ? false : 'eval',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].min.css',
			linkType: "text/css",
		}),
	],
	entry: {
		reactSSR: ['./src/index.js', './src/scss/input.scss']
	},
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: '[name].main.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							[
								'@babel/preset-react',
								{'runtime': 'automatic'},
							],
						],
					},
				},
			},
			{
				test: /\.(scss|css)$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									require('autoprefixer')
								],
							},
						},
					},
				],
			},
			{
				test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: false,
						}
					},
				],
			},
		],
	},
}, (err, stats) => {
	if (err) {
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
		process.exit(1);
		return;
	}
	const info = stats.toJson();
	if (stats.hasErrors()) {
		console.log('Finished running webpack with errors.');
		info.errors.forEach(e => console.error(e));
		process.exit(1);
	} else {
		console.log('Finished running webpack.');
	}
});
