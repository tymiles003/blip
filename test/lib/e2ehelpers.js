var webdriver = require('selenium-webdriver');

var APP_URL = 'http://localhost:3000';
var DRIVER_CAPABILITIES = webdriver.Capabilities.chrome();

var By = webdriver.By;

var driver;

var helpers = {
  getDriver: function() {
    return driver;
  },

  newDriver: function() {
    driver = new webdriver.Builder().
      withCapabilities(DRIVER_CAPABILITIES).
      build();
    return driver;
  },

  openApp: function() {
    var deferred = webdriver.promise.defer();
    driver.get(APP_URL).then(function () {
      deferred.fulfill();
    });
    return deferred.promise;
  },

  authenticate: function() {
    var username = 'demo';
    var password = 'demo';
    var deferred = webdriver.promise.defer();
    driver.findElement(By.name('username')).sendKeys(username);
    driver.findElement(By.name('password')).sendKeys(password);
    driver.findElement(By.css('.js-login-form-button')).click()
      .then(deferred.fulfill);
    return deferred.promise;
  },

  elementExists: function(locator) {
    return driver.findElement(locator)
      .then(function() {
        // No errors, element was found
        return true;
      }, function(err) {
        if (err.code === helpers.errorCodes.NO_SUCH_ELEMENT) {
          return false;
        }
        else {
          throw err;
        }
      });
  },

  // See:
  // selenium-webdriver/lib/atoms/error.js
  errorCodes: {
    NO_SUCH_ELEMENT: 7
  }
};

module.exports = helpers;