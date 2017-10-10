'use strict'
/* eslint-disable no-unused-expressions */

var isHabitica = require('../../lib/is-habitica')

describe('isHabitica', function () {
  it('returns true if hostname is habitica.com', function () {
    global.location = {
      host: 'habitica.com'
    }

    expect(isHabitica()).to.equal(true)
  })

  it('returns false if hostname is not habitica.com', function () {
    global.location = {
      host: 'another-host.com'
    }

    expect(isHabitica()).to.equal(false)
  })

  it('returns false fo subdomain of habitica.com', function () {
    global.location = {
      host: 'subdomain.habitica.com'
    }

    expect(isHabitica()).to.equal(false)
  })
})
