'use strict'

var addImg = require('../../lib/add-img')

describe('addImg', function () {
  beforeEach(function () {
    this.user = {
      items: {
        gear: {}
      },
      preferences: {}
    }
    this.characterSpritesNode = makeFakeDomElement()
  })

  it('returns a function', function () {
    var func = addImg(this.characterSpritesNode, {
      user: this.user
    })

    expect(func).to.be.an('function')
  })
})

