'use strict'

var api = require('./api')

module.exports = function () {
  return api.get('/content').then(function (response) {
    return response.data
  })
}
