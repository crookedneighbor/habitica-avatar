'use strict'

var habiticaAvatar = require('../../habitica-avatar')

function populateAvatar () {
  var hash = global.location.hash
  var id = hash.substring(1, hash.length)

  if (!id) {
    return
  }

  habiticaAvatar.fromUserId(id, {
    container: '#container'
  })
}

populateAvatar()
