'use strict'

var api = require('./api')
var habiticaAvatar = require('../../habitica-avatar')
var getValue = require('./get-value')

var avatarContainer = document.querySelector('#avatar-container')
var error = document.querySelector('#user .error')

module.exports = function () {
  var uuid = getValue('user-id')

  error.innerText = ''
  avatarContainer.innerHTML = ''

  api.get('/members/' + uuid).then(function (response) {
    console.log(response.data)
    var avatar = habiticaAvatar({
      container: avatarContainer,
      user: response.data
    })

    avatar.id = 'avatar'
  }).catch(function (err) {
    console.error(err)
    error.innerText = 'There was an error looking up the user.'
  })
}
