/* eslint-env node */
module.exports = function(config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  process.env.TZ = 'America/Phoenix';
  config.set({
    frameworks: [
      'mocha',
    ],
    browsers: process.env.CI ? [
      'FirefoxHeadlessNoSandbox',
    ] : [
      'ChromeHeadless',
      'FirefoxHeadless',
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
      FirefoxHeadlessNoSandbox: {
        base: 'FirefoxNightlyHeadless',
        flags: ['--no-sandbox', '-wait-for-browser'],
      },
    },
    files: [
      { pattern:'test/integration/index.js', watched:false },
    ],
    preprocessors: {
      'test/integration/index.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: false,
    },
  });
};
