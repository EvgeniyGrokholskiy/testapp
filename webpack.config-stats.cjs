const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge'); // mergey JS objects utility


const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.config-prod.cjs');

const config = merge(baseConfig, {
    plugins: [new BundleAnalyzerPlugin()],
});

require('./webpack.log')(config);

module.exports = config;
