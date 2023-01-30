const path = require('path');
const { getBabelLoader, addWebpackAlias, override } = require('customize-cra');

module.exports = override(
  removeBuiltinBabelConfig,
  enableBabelConfig,
  addWebpackAlias({
    '@assets': path.resolve(__dirname, 'src', 'assets'),
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@containers': path.resolve(__dirname, 'src', 'containers'),
    '@constants': path.resolve(__dirname, 'src', 'constants'),
    '@libs': path.resolve(__dirname, 'src', 'libs'),
    '@states': path.resolve(__dirname, 'src', 'states'),
    '@mocks': path.resolve(__dirname, 'src', 'mocks'),
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
