(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.avatar = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var findS3Src = require('./lib/find-s3-src')
var addImg = require('./lib/add-img')

var CHARACTER_SPRITE_NODES = require('./lib/character-sprites-config')

function habiticaAvatar (options) {
  var user = options.user
  var appearance = user.preferences

  var avatarContainer = document.createElement('div')
  var characterSprites = document.createElement('div')

  avatarContainer.style.height = '147px'
  avatarContainer.style.width = '140px'
  avatarContainer.style.position = 'relative'
  avatarContainer.style.boxSizing = 'border-box'
  avatarContainer.style.imageRendering = 'pixelated'

  if (!user.items.currentMount) {
    avatarContainer.style.paddingTop = '24.5px'
  }

  if (appearance.background) {
    avatarContainer.style.backgroundImage = 'url("' + findS3Src('background_' + appearance.background) + '")'
  }

  characterSprites.style.margin = '0 auto 0 24px'
  characterSprites.style.width = '90px'
  characterSprites.style.height = '90px'

  CHARACTER_SPRITE_NODES.forEach(addImg(characterSprites, user))

  avatarContainer.appendChild(characterSprites)

  return avatarContainer
}

module.exports = habiticaAvatar

},{"./lib/add-img":2,"./lib/character-sprites-config":3,"./lib/find-s3-src":4}],2:[function(require,module,exports){
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

},{"./find-s3-src":4,"./format-appearance-img":5,"./format-equipment-img":6}],3:[function(require,module,exports){
'use strict'

module.exports = [{
  name: 'mount',
  prefix: 'Mount_Body_',
  itemsKey: 'currentMount',
  type: 'pet',
  style: {
    marginTop: '18px'
  }
// TODO
// }, {
//   name: 'visualBuff',
//   type: 'buff'
}, {
  name: 'hair',
  subName: 'flower',
  prefix: 'hair_flower_',
  type: 'appearance'
}, {
  name: 'chair',
  prefix: 'chair_',
  type: 'appearance'
}, {
  name: 'back',
  type: 'equipment'
}, {
  name: 'skin',
  prefix: 'skin_',
  type: 'appearance'
}, {
  name: 'shirt',
  sizePrefix: true,
  prefix: 'shirt_',
  type: 'appearance'
}, {
  name: 'head_0',
  type: 'static'
}, {
  name: 'armor',
  sizePrefix: true,
  type: 'equipment'
}, {
  name: 'head_0',
  type: 'static'
}, {
  name: 'body',
  type: 'equipment'
}, {
  name: 'hair',
  subName: 'base',
  prefix: 'hair_base_',
  type: 'appearance'
}, {
  name: 'hair',
  subName: 'bangs',
  prefix: 'hair_bangs_',
  type: 'appearance'
}, {
  name: 'hair',
  subName: 'mustache',
  prefix: 'hair_mustache_',
  type: 'appearance'
}, {
  name: 'hair',
  subName: 'beard',
  prefix: 'hair_beard_',
  type: 'appearance'
}, {
  name: 'eyewear',
  type: 'equipment'
}, {
  name: 'head',
  type: 'equipment'
}, {
  name: 'headAccessory',
  type: 'equipment'
}, {
  name: 'hair',
  subName: 'flower',
  prefix: 'hair_flower_',
  type: 'appearance'
}, {
  name: 'shield',
  type: 'equipment'
}, {
  name: 'weapon',
  type: 'equipment'
// TODO
// }, {
//   name: 'zzz',
//   type: 'appearance'
}, {
  name: 'mount',
  type: 'pet',
  style: {
    marginTop: '18px'
  },
  prefix: 'Mount_Head_',
  itemsKey: 'currentMount'
}, {
  name: 'pet',
  type: 'pet',
  prefix: 'Pet-',
  style: {
    left: '0px',
    bottom: '0px'
  },
  itemsKey: 'currentPet'
}]

},{}],4:[function(require,module,exports){
'use strict'

var S3 = 'https://s3.amazonaws.com/habitica-assets/mobileApp/images/'

var GIFS = [
  'head_special_0',
  'head_special_1',
  'shield_special_0',
  'weapon_special_0',
  'weapon_special_critical',
  'Pet-Wolf-Cerberus'
].reduce(function (obj, value) {
  obj[value] = true
  return obj
}, {})

module.exports = function (value) {
  var ext = 'png'

  if (value in GIFS) {
    ext = 'gif'
  }

  return S3 + value + '.' + ext
}

},{}],5:[function(require,module,exports){
'use strict'

module.exports = function (name, config) {
  var s3Key
  var subName = config.subName
  var appearance = config.appearance

  if (name === 'hair') {
    if (!appearance.hair[subName]) {
      return // skip adding this hair bit, because it does not exist
    }

    s3Key = appearance.hair[subName]

    if (subName != 'flower') {
      s3Key = s3Key + '_' + appearance.hair.color
    }
  } else if (name === 'skin') {
    // TODO account for sleeping eyes when sleep: true
    s3Key = appearance.skin
  } else {
    s3Key = appearance[name]
  }

  return String(s3Key)
}

},{}],6:[function(require,module,exports){
'use strict'

var EQUIPMENT_WITH_CUSTOM_STYLES = {
  weapon_special_critical: {
    marginLeft: '-12px',
    marginTop: '12px'
  }
}

module.exports = function (equipment, img) {
  if (equipment in EQUIPMENT_WITH_CUSTOM_STYLES) {
    Object.assign(img.style, EQUIPMENT_WITH_CUSTOM_STYLES[equipment])
  }

  return equipment
}

},{}]},{},[1])(1)
});