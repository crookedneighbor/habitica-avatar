'use strict'

module.exports = function getValue (name) {
  return document.querySelector('#' + name).value
}
