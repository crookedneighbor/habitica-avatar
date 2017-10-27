'use strict'

var habiticaAvatar = require('../../habitica-avatar')

function populateAvatar () {
  var id
  var frame = window.frameElement

  if (!frame) {
    return;
  }

  id = frame.getAttribute("data-user-id");

  if (!id) {
    return;
  }

  habiticaAvatar.fromUserId(id, {
    container: '#container'
  })
}

populateAvatar()
