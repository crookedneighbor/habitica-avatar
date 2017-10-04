'use strict'
/* eslint-disable no-unused-expressions */

var habiticaAvatar = require('../habitica-avatar')

describe('Habitica Avatar', function () {
  beforeEach(function () {
    this.user = {
      items: {
        currentMount: 'Wolf-Ghost',
        currentPet: 'BearCub-Ghost',
        gear: {
          costume: {
            headAccessory: 'headAccessory_base_0',
            eyewear: 'eyewear_base_0',
            back: 'back_base_0',
            weapon: 'weapon_special_critical',
            shield: 'shield_base_0',
            head: 'head_mystery_301405',
            armor: 'armor_mystery_301404'
          },
          equipped: {
            body: 'body_special_summerMage',
            weapon: 'weapon_special_critical',
            headAccessory: 'headAccessory_special_spring2015Rogue',
            back: 'back_mystery_201706',
            eyewear: 'eyewear_special_yellowTopFrame',
            shield: 'shield_special_goldenknight',
            head: 'head_special_2',
            armor: 'armor_wizard_5'
          }
        }
      },
      preferences: {
        costume: false,
        background: 'alpine_slopes',
        sleep: true,
        chair: 'black',
        shirt: 'black',
        skin: 'f5a76e',
        hair: {
          flower: 1,
          mustache: 0,
          beard: 0,
          bangs: 1,
          base: 1,
          color: 'black'
        },
        size: 'broad'
      }
    }
  })

  it('returns a dom node', function () {
    var node
    var fakeDomContainer = makeFakeDomElement()

    global.document.createElement.onFirstCall().returns(fakeDomContainer)

    node = habiticaAvatar({
      user: this.user
    })

    expect(node).to.equal(fakeDomContainer)
  })

  it('applies extra padding if user has no mount', function () {
    var node

    this.user.items.currentMount = ''

    node = habiticaAvatar({
      user: this.user
    })

    expect(node.style.paddingTop).to.equal('24.5px')
  })

  it('applies extra padding if user has mount but ignore: mount is set', function () {
    var node

    this.user.items.currentMount = 'Wolf-Base'

    node = habiticaAvatar({
      ignore: {
        mount: true
      },
      user: this.user
    })

    expect(node.style.paddingTop).to.equal('24.5px')
  })

  it('does not apply extra padding if user has mount', function () {
    var node

    this.user.items.currentMount = 'Wolf-Base'

    node = habiticaAvatar({
      user: this.user
    })

    expect(node.style.paddingTop).to.not.exist
  })

  it('applies background if user has one', function () {
    var node

    this.user.preferences.background = 'fake-background'

    node = habiticaAvatar({
      user: this.user
    })

    expect(node.style.backgroundImage).to.equal('url("https://s3.amazonaws.com/habitica-assets/mobileApp/images/background_fake-background.png")')
  })

  it('does not apply background if ignore:background is set', function () {
    var node

    this.user.preferences.background = 'fake-background'

    node = habiticaAvatar({
      ignore: {
        background: true
      },
      user: this.user
    })

    expect(node.style.backgroundImage).to.not.exist
  })

  it('does not apply background if user does not have one', function () {
    var node

    this.user.preferences.background = ''

    node = habiticaAvatar({
      user: this.user
    })

    expect(node.style.backgroundImage).to.not.exist
  })
})
