'use strict'
/* eslint-disable no-unused-expressions */

var findS3Src = require('../../lib/find-s3-src')

describe('findS3Src', function () {
  it('returns the value with the s3 prefix and png suffix', function () {
    expect(findS3Src('foo')).to.equal('https://s3.amazonaws.com/habitica-assets/mobileApp/images/foo.png')
  })

  it('returns gif extension for special keys', function () {
    [
      'head_special_0',
      'head_special_1',
      'shield_special_0',
      'weapon_special_0',
      'weapon_special_critical',
      'Pet-Wolf-Cerberus'
    ].forEach((key) => {
      expect(findS3Src(key)).to.equal(`https://s3.amazonaws.com/habitica-assets/mobileApp/images/${key}.gif`)
    })
  })
})
