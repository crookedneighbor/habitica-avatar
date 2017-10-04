'use strict'

var findS3Src = require('./find-s3-src')
var formatEquipmentImg = require('./format-equipment-img')
var formatAppearanceImg = require('./format-appearance-img')

module.exports = function addImg (characterSpritesNode, user) {
  var appearance = user.preferences
  var gear = user.items.gear

  return function (config) {
    var img = document.createElement('img')
    var s3Key

    img.style.position = 'absolute'

    if (config.style) {
      Object.assign(img.style, config.style)
    }

    if (config.type === 'static') {
      s3Key = config.name
    } else if (config.type === 'equipment') {
      if (appearance.costume) {
        s3Key = formatEquipmentImg(gear.costume[config.name], img)
      } else {
        s3Key = formatEquipmentImg(gear.equipped[config.name], img)
      }
    } else if (config.type === 'appearance') {
      s3Key = formatAppearanceImg(config.name, {
        subName: config.subName,
        appearance: appearance
      })
    } else if (config.itemsKey) {
      s3Key = user.items[config.itemsKey]
    }

    if (!s3Key) {
      return // skip if no image url can be found
    }

    if (config.prefix) {
      s3Key = config.prefix + s3Key
    }

    if (config.sizePrefix) {
      s3Key = appearance.size + '_' + s3Key
    }

    img.src = findS3Src(s3Key)

    characterSpritesNode.appendChild(img)
  }
}
