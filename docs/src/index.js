'use strict'

var getContent = require('./get-content')
var randomizeSelects = require('./randomize-selects')
var setUpSelects = require('./set-up-selects')
var makeAvatar = require('./make-avatar')

getContent().then(setUpSelects).then(function () {
  document
    .querySelector('#make-avatar')
    .addEventListener('click', makeAvatar)
  document
    .querySelector('#randomize')
    .addEventListener('click', randomizeSelects)

  randomizeSelects()

  makeAvatar()
})
