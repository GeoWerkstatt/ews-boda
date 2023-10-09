const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:44472",
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
