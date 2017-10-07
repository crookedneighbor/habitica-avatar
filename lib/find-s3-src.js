'use strict'

var S3 = 'https://s3.amazonaws.com/habitica-assets/mobileApp/images/'

var GIFS = [
  'broad_armor_special_0',
  'slim_armor_special_0',
  'broad_armor_special_1',
  'slim_armor_special_1',
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
