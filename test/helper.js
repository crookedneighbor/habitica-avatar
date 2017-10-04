'use strict'

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')

chai.use(sinonChai)

global.sandbox = sinon.sandbox.create()
global.expect = chai.expect

global.makeFakeDomElement = () => {
  return {
    style: {},
    appendChild: sandbox.stub()
  }
}

beforeEach(function () {
  global.document = {
    appendChild: sandbox.stub(),
    createElement: sandbox.stub().returns(makeFakeDomElement()),
    querySelector: sandbox.stub(),
    querySelectorAll: sandbox.stub().returns([])
  }
})

afterEach(function () {
  global.sandbox.restore()
})
