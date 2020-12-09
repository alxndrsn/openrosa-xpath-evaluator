/* eslint-env node */
module.exports = function(config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  process.env.TZ = 'America/Phoenix';
  config.set({
    frameworks: [
      'mocha',
    ],
    browsers: [
      'ChromeHeadlessNoSandbox',
      'FirefoxHeadlessNoSandbox',
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
      FirefoxHeadlessNoSandbox: {
        base: 'FirefoxHeadless',
        flags: ['--no-sandbox'],
      },
    }
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
