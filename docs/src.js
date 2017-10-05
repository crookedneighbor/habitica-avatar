'use strict'

var Habitica = require('habitica')
var habiticaAvatar = require('../habitica-avatar')

var avatar = habiticaAvatar({
  ignore: {
    // hair: true,
    // shirt: true,
    // head: true,
    // shield: true,
    // armor: true,
    // weapon: true,
    // chair: true,
    // pet: true,
    // background: true,
    // mount: true
  },
  user: {
    items: {
      currentMount: 'Wolf-Ghost',
      currentPet: 'BearCub-Ghost',
      gear: {
        costume: {
          headAccessory: 'headAccessory_base_0',
          eyewear: 'eyewear_base_0',
          back: 'back_base_0',
          weapon: 'weapon_special_critical',
          shield: 'shield_base_0',
          head: 'head_mystery_301405',
          armor: 'armor_mystery_301404'
        },
        equipped: {
          body: 'body_special_summerMage',
          weapon: 'weapon_special_critical',
          headAccessory: 'headAccessory_special_spring2015Rogue',
          back: 'back_mystery_201706',
          eyewear: 'eyewear_special_yellowTopFrame',
          shield: 'shield_special_goldenknight',
          head: 'head_special_2',
          armor: 'armor_wizard_5'
        }
      }
    },
    preferences: {
      costume: false,
      background: 'alpine_slopes',
      sleep: true,
      chair: 'black',
      shirt: 'black',
      skin: 'f5a76e',
      hair: {
        flower: 1,
        mustache: 0,
        beard: 0,
        bangs: 1,
        base: 1,
        color: 'black'
      },
      size: 'broad',
    }
  }
});

document.body.appendChild(avatar);
