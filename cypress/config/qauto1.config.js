const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    env: {
      password: "password123",
      loginedUrl: "/panel/garage"
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      html: true,
      json: true,
      timestamp: "mmddyyyy_HHMMss"
    },
    setupNodeEvents(on, config) {
    }
  }
});
