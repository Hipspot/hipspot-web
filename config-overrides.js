const path = require('path');
const { getBabelLoader, addWebpackAlias, override } = require('customize-cra');

module.exports = override(
	removeBuiltinBabelConfig,
	enableBabelConfig,
	addWebpackAlias({
		'@components': path.resolve(__dirname, 'src', 'components'),
		'@recoil': path.resolve(__dirname, 'src', 'recoil'),
	})
);

function removeBuiltinBabelConfig(config) {
	const loader = getBabelLoader(config);

	loader.options.presets = [];
	loader.options.plugins = [];

	return config;
}

function enableBabelConfig(config) {
	const loader = getBabelLoader(config);
	loader.options.configFile = path.resolve(__dirname, 'babel.config.js');
	return config;
}
