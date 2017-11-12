'use strict';
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		content: './src/content'
	},
	plugins: [
		new webpack.DefinePlugin({
			process: '0'
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin([{
			from: 'node_modules/jquery/dist/jquery.slim.min.js'
		}])
	],
	output: {
		path: path.join(__dirname, 'refined-github.safariextension'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new UglifyJSPlugin({
			sourceMap: true,
			uglifyOptions: {
				mangle: false,
				output: {
					// Keep it somewhat readable for AMO reviewers
					beautify: true,

					// Reduce beautification indentation from 4 spaces to 1 to save space
					indent_level: 1 // eslint-disable-line camelcase
				}
			}
		})
	);
} else {
	module.exports.devtool = 'source-map';
}