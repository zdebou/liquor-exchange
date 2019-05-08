module.exports = {
	entry: ['@babel/polyfill', './src/main/js/app.tsx'],
	devtool: 'sourcemaps',
	cache: true,
	mode: 'development',
	output: {
		path: __dirname,
		filename: './src/main/resources/static/built/bundle.js',
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/env', '@babel/react', '@babel/typescript'],
							plugins: ["transform-class-properties"]
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
			},
		],
	},
};
