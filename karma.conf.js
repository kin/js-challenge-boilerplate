// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  // Detect available browsers
  const fs = require('fs');
  const path = require('path');
  
  const bravePath = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  
  let defaultBrowser = 'Chrome';
  let customLaunchers = {
    ChromeHeadlessCI: {
      base: 'ChromeHeadless',
      flags: ['--no-sandbox'],
    },
  };

  // Check if Brave is available
  if (fs.existsSync(bravePath)) {
    defaultBrowser = 'Brave';
    // Set CHROME_BIN environment variable for Brave
    process.env.CHROME_BIN = bravePath;
    customLaunchers.Brave = {
      base: 'Chrome',
      flags: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: bravePath
    };
    customLaunchers.BraveHeadless = {
      base: 'ChromeHeadless',
      flags: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: bravePath
    };
  } else if (fs.existsSync(chromePath)) {
    // Chrome is available
    process.env.CHROME_BIN = chromePath;
    customLaunchers.Chrome = {
      base: 'Chrome',
      flags: ['--no-sandbox', '--disable-setuid-sandbox']
    };
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    browsers: [defaultBrowser],
    customLaunchers: customLaunchers,
    singleRun: true,
  });
};