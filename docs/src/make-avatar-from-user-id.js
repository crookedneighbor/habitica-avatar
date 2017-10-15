'use strict'

var habiticaAvatar = require('../../habitica-avatar')
var getValue = require('./get-value')

var avatarContainer = document.querySelector('#avatar-container')
var error = document.querySelector('#user .error')

module.exports = function () {
  var uuid = getValue('user-id')

  error.innerText = ''
  avatarContainer.innerHTML = ''

  habiticaAvatar.fromUserId(uuid, {
    container: avatarContainer
  }).then(function (avatar) {
    avatar.id = 'avatar'
  }).catch(function (err) {
    console.error(err)
    error.innerText = 'There was an error looking up the user.'
  })
}
