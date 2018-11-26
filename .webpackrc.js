'use strict'

const { name, version } = require('./package.json')

module.exports = {
  "entry": "app/web/index.js",
  "env": {
    "development": {}
  },
  "outputPath": "app/public/dist",
  "hash": true,
  "manifest": {
    "fileName": "../../../config/manifest.json"
  },
  "define": {
    "process.env.APP_NAME": process.env.APP_NAME || "App Name",
    "process.env.APP_VERSION": process.env.APP_VERSION ||"0.0.0"
  },
  "es5ImcompatibleVersions": true
}
