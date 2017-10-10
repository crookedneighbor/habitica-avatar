'use strict'
/* eslint-disable no-unused-expressions */

var addLayer = require('../../lib/add-layer')

describe('addLayer', function () {
  beforeEach(function () {
    this.user = {
      items: {
        currentMount: 'Wolf-Base',
        gear: {}
      },
      preferences: {},
      stats: {
        buffs: {},
        class: 'wizard'
      }
    }
    this.characterSpritesNode = makeFakeDomElement()
  })

  it('returns a function', function () {
    var func = addLayer(this.characterSpritesNode, {
      user: this.user
    })

    expect(func).to.be.an('function')
  })

  it('can ignore keys', function () {
    var characterSpritesWithMount = makeFakeDomElement()
    var characterSpritesWithoutMount = makeFakeDomElement()
    var funcWithMount = addLayer(characterSpritesWithMount, {
      user: this.user
    })
    var funcWithoutMount = addLayer(characterSpritesWithoutMount, {
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
