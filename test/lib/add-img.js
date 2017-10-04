'use strict'
/* eslint-disable no-unused-expressions */

var addImg = require('../../lib/add-img')

describe('addImg', function () {
  beforeEach(function () {
    this.user = {
      items: {
        currentMount: 'Wolf-Base',
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

  it('can ignore keys', function () {
    var characterSpritesWithMount = makeFakeDomElement()
    var characterSpritesWithoutMount = makeFakeDomElement()
    var funcWithMount = addImg(characterSpritesWithMount, {
      user: this.user
    })
    var funcWithoutMount = addImg(characterSpritesWithoutMount, {
      user: this.user,
      ignore: {
        mount: true
      }
    })

    funcWithMount({
      name: 'mount',
      type: 'pet',
      style: {
        marginTop: '18px'
      },
      prefix: 'Mount_Head_',
      itemsKey: 'currentMount'
    })

    expect(characterSpritesWithMount.appendChild).to.be.calledOnce

    funcWithoutMount({
      name: 'mount',
      type: 'pet',
      style: {
        marginTop: '18px'
      },
      prefix: 'Mount_Head_',
      itemsKey: 'currentMount'
    })
    expect(characterSpritesWithoutMount.appendChild).to.not.be.called
  })
})
