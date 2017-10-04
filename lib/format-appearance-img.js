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
