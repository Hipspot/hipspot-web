const path = require('path');
const { useBabelRc, addWebpackAlias, override } = require('customize-cra');

module.exports = override(
	useBabelRc(),
	addWebpackAlias({
		'@components': path.resolve(__dirname, 'src', 'components'),
		'@recoil': path.resolve(__dirname, 'src', 'recoil'),
		'@libs': path.resolve(__dirname, 'src', 'libs'),
	})
);
