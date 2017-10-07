'use strict'
/* eslint-disable no-unused-expressions */

var formatEquipment = require('../../lib/format-equipment-img')

describe('formatEquipment', function () {
  it('returns the equipment name', function () {
    var name = formatEquipment('name', {})

    expect(name).to.equal('name')
  })

  it('returns nothing if name includes "base_0"', function () {
    var name = formatEquipment('warrior_base_0', {})

    expect(name).to.not.exist
  })

  it('returns nothing if equipment does not exist', function () {
    var empty
    var name = formatEquipment(empty, {})

    expect(name).to.not.exist
  })

  it('assigns extra styles to image if item is weapon_special_critical', function () {
    var img = {
      style: {
        foo: 'bar'
      }
    }

    formatEquipment('weapon_special_critical', img)

    expect(img.style).to.deep.equal({
      foo: 'bar',
      marginLeft: '-12px',
      marginTop: '12px'
    })
  })

  it('does not assign extra styles to image when no special styles are specififed', function () {
    var img = {
      style: {
        foo: 'bar'
      }
    }

    formatEquipment('foo', img)

    expect(img.style).to.deep.equal({
      foo: 'bar'
    })
  })
})
