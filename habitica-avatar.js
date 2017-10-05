'use strict'

var findS3Src = require('./lib/find-s3-src')
var addImg = require('./lib/add-img')

var CHARACTER_SPRITE_NODES = require('./lib/character-sprites-config')

function habiticaAvatar (options) {
  var user = options.user
  var container = options.container
  var ignore = options.ignore || {}
  var appearance = user.preferences

  var avatarContainer = document.createElement('div')
  var characterSprites = document.createElement('div')

  avatarContainer.style.height = '147px'
  avatarContainer.style.width = '140px'
  avatarContainer.style.position = 'relative'
  avatarContainer.style.boxSizing = 'border-box'
  avatarContainer.style.imageRendering = 'pixelated'

  if (!user.items.currentMount || ignore.mount) {
    avatarContainer.style.paddingTop = '24.5px'
  }

  if (appearance.background && !ignore.background) {
    avatarContainer.style.backgroundImage = 'url("' + findS3Src('background_' + appearance.background) + '")'
  }

  characterSprites.style.margin = '0 auto 0 24px'
  characterSprites.style.width = '90px'
  characterSprites.style.height = '90px'

  CHARACTER_SPRITE_NODES.forEach(addImg(characterSprites, options))

  avatarContainer.appendChild(characterSprites)

  if (typeof container === 'string') {
    container = document.querySelector(container)
  }

  if (container) {
    container.appendChild(avatarContainer)
  }

  return avatarContainer
}

module.exports = habiticaAvatar
