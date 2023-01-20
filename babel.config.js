module.exports = {
	plugins: ['@emotion/babel-plugin'],
	presets: [
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				importSource: '@emotion/react',
			},
		],
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
};
