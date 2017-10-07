'use strict'

var habiticaAvatar = require('../../habitica-avatar')
var avatarContainer = document.querySelector('#avatar-container')

function getValue(name) {
  return document.querySelector('#' + name).value
}

module.exports = function makeAvatar() {
  var avatar

  avatarContainer.innerHTML = ''

  avatar = habiticaAvatar({
    container: avatarContainer,
    user: {
      stats: {
        buffs: {
          snowball: getValue('visual-buff') === 'snowball',
          spookySparkles: getValue('visual-buff') === 'spookySparkles',
          shinySeed: getValue('visual-buff').split('.')[0] === 'shinySeed',
          seafoam: getValue('visual-buff') === 'seafoam',
        },
        class: getValue('visual-buff').split('.')[1] || 'wizard'
      },
      items: {
        currentMount: getValue('mount'),
        currentPet: getValue('pet'),
        gear: {
          costume: {
            body: getValue('body'),
            weapon: getValue('weapon'),
            headAccessory: getValue('headAccessory'),
            back: getValue('back'),
            eyewear: getValue('eyewear'),
            shield: getValue('shield'),
            head: getValue('head'),
            armor: getValue('armor')
          },
          equipped: {
            body: getValue('body'),
            weapon: getValue('weapon'),
            headAccessory: getValue('headAccessory'),
            back: getValue('back'),
            eyewear: getValue('eyewear'),
            shield: getValue('shield'),
            head: getValue('head'),
            armor: getValue('armor')
          }
        }
      },
      preferences: {
        costume: false,
        background: getValue('background'),
        sleep: getValue('sleep') === 'true',
        chair: getValue('chair'),
        shirt: getValue('shirt'),
        skin: getValue('skin'),
        hair: {
          flower: getValue('flower'),
          mustache: getValue('mustache'),
          beard: getValue('beard'),
          bangs: getValue('bangs'),
          base: getValue('base'),
          color: getValue('color')
        },
        size: getValue('size'),
      }
    }
  });

  avatar.id = 'avatar'
}
