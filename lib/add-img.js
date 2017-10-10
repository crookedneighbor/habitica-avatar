'use strict'

var findS3Src = require('./find-s3-src')
var formatEquipmentImg = require('./format-equipment-img')
var formatAppearanceImg = require('./format-appearance-img')
var findVisualBuff = require('./find-visual-buff')

module.exports = function addImg (characterSpritesNode, options) {
  var user = options.user
  var appearance = user.preferences
  var gear = user.items.gear
  var ignore = options.ignore || {}
  var useClassMode = options.useClassMode
  var visualBuff = findVisualBuff(user)

  return function (config) {
    var element, s3Key

    if (useClassMode) {
      element = document.createElement('div')
    } else {
      element = document.createElement('img')
    }

    if (ignore[config.name]) {
      return
    }

    if (visualBuff && !config.showWhenVisualBuffApplied && !ignore.visualBuff) {
      return
    }

    element.style.position = 'absolute'

    if (config.style) {
      Object.assign(element.style, config.style)
    }

    if (config.type === 'buff') {
      s3Key = visualBuff
    } else if (config.type === 'static') {
      s3Key = config.name
    } else if (config.type === 'equipment') {
      if ((appearance.costume && !options.forceEquipment) || options.forceCostume) {
        s3Key = formatEquipmentImg(gear.costume[config.name], element)
      } else {
        s3Key = formatEquipmentImg(gear.equipped[config.name], element)
      }
    } else if (config.type === 'appearance') {
      s3Key = formatAppearanceImg(config.name, {
        ignore: ignore,
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

    if (useClassMode) {
      element.classList.add(s3Key)
    } else {
      element.src = findS3Src(s3Key)
    }

    characterSpritesNode.appendChild(element)
  }
}
