const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

// Add support for Mapbox GL JS
config.resolver.alias = {
  '@mapbox/mapbox-gl-style-spec': '@mapbox/mapbox-gl-style-spec/dist/index.cjs',
};

module.exports = config;
