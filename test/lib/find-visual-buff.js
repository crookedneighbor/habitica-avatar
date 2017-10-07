'use strict'
/* eslint-disable no-unused-expressions */

var findVisualBuff = require('../../lib/find-visual-buff')

describe('findVisualBuff', function () {
  beforeEach(function () {
    this.user = {
      stats: {
        buffs: {
          snowball: true
        },
        class: 'wizard'
      }
    }
  })

  it('returns visual buff class', function () {
    expect(findVisualBuff(this.user)).to.equal('snowman')
  })

  it('appends class to shinySeed', function () {
    this.user.stats.buffs.snowball = false
    this.user.stats.buffs.shinySeed = true

    expect(findVisualBuff(this.user)).to.equal('avatar_floral_wizard')
  })

  it('returns nothing if no visual buffs are found', function () {
    this.user.stats.buffs.snowball = false

    expect(findVisualBuff(this.user)).to.not.exist
  })
})
