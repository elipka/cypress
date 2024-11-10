const { defineConfig } = require("cypress");
require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    browser: "firefox", 
  },
  reporter: 'mochawesome', 
  reporterOptions: {
    reportDir: 'cypress/reports', 
    overwrite: false,
    html: true,
    json: true,
  },
});
