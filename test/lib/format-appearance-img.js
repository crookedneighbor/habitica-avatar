'use strict'
/* eslint-disable no-unused-expressions */

var formatAppearance = require('../../lib/format-appearance-img')

describe('formatAppearance', function () {
  it('returns the name from the appearance object', function () {
    var name = formatAppearance('foo', {
      appearance: {
        foo: 'bar'
      }
    })

    expect(name).to.equal('bar')
  })

  it('accounts for sleeping in inn when rendering skin', function () {
    var name = formatAppearance('skin', {
      appearance: {
        sleep: true,
        skin: 'bar'
      }
    })

    expect(name).to.equal('bar_sleep')
  })

  it('does not change skin if ignore sleep is used', function () {
    var name = formatAppearance('skin', {
      ignore: { sleep: true },
      appearance: {
        sleep: true,
        skin: 'bar'
      }
    })

    expect(name).to.equal('bar')
  })

  it('uses zzz key for sleep node', function () {
    var name = formatAppearance('sleep', {
      appearance: {
        sleep: true
      }
    })

    expect(name).to.equal('zzz')
  })

  it('skips sleep node if not asleep', function () {
    var name = formatAppearance('sleep', {
      appearance: {
        sleep: false
      }
    })

    expect(name).to.not.exist
  })

  it('returns nothing if hair subproperty does not exist', function () {
    var name = formatAppearance('hair', {
      subName: 'flower',
      appearance: {
        hair: {
          flower: 0
        }
      }
    })

    expect(name).to.not.exist
  })

  it('returns nothing if hair subproperty is 0', function () {
    var name = formatAppearance('hair', {
      subName: 'flower',
      appearance: {
        hair: {
          flower: '0'
        }
      }
    })

    expect(name).to.not.exist
  })

  it('returns hair value with hair color', function () {
    var name = formatAppearance('hair', {
      subName: 'bangs',
      appearance: {
        hair: {
          bangs: 1,
          color: 'white'
        }
      }
    })

    expect(name).to.equal('1_white')
  })

  it('returns flower without hair color', function () {
    var name = formatAppearance('hair', {
      subName: 'flower',
      appearance: {
        hair: {
          flower: 1,
          color: 'white'
        }
      }
    })

    expect(name).to.equal('1')
  })

  it('returns nothing if value is none', function () {
    var name = formatAppearance('chair', {
      appearance: {
        chair: 'none'
      }
    })

    expect(name).to.not.exist
  })
})
