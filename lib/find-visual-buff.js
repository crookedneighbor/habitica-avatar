'use strict'

var VISUAL_BUFFS = {
  snowball: 'snowman',
  spookySparkles: 'ghost',
  shinySeed: 'avatar_floral',
  seafoam: 'seafoam_star'
}

module.exports = function findVisualBuff(user) {
  var buffKey, buff

  Object.keys(VISUAL_BUFFS).forEach(function (key) {
    if (user.stats.buffs[key]) {
      buffKey = key
    }
  })

  if (buffKey) {
    buff = VISUAL_BUFFS[buffKey]

    if (buffKey === 'shinySeed') {
      buff = buff + '_' + user.stats.class
    }
  }

  return buff
};
