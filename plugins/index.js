/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('cypress/cypress/config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

// plugins file
module.exports = (on, config) => {
  // accept a configFile value or use development by default
  const file = config.env.configFile || 'Production'

  return getConfigurationByFile(file)
}
