'use strict'

var selects = [
  'background',
  'sleep',
  'chair',
  'base',
  'beard',
  'mustache',
  'color',
  'flower',
  'size',
  'shirt',
  'skin',
  'pet',
  'mount',
  'weapon',
  'shield',
  'armor',
  'head',
  'headAccessory',
  'back',
  'body',
  'eyewear'
]

function randomizeSelect(name) {
  var select = document.querySelector('#' + name)
  var options = select.querySelectorAll('option')
  var random = Math.floor(Math.random() * options.length);

  if (!options[random]) {
    return
  }
  options[random].setAttribute('selected', true)
}

module.exports = function randomizeSelects () {
  selects.forEach(randomizeSelect)
}
