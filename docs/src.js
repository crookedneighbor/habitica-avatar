'use strict'

var Habitica = require('habitica')
var habiticaAvatar = require('../habitica-avatar')

var api = new Habitica()
var avatarContainer = document.querySelector('#avatar-container')

function getValue(name) {
  return document.querySelector('#' + name).value
}

function makeAvatar() {
  var avatar

  avatarContainer.innerHTML = ''

  avatar = habiticaAvatar({
    container: avatarContainer,
    user: {
      items: {
        currentMount: getValue('mount'),
        currentPet: getValue('pet'),
        gear: {
          costume: {
            headAccessory: getValue('headAccessory'),
            eyewear: getValue('eyewear'),
            back: getValue('back'),
            weapon: getValue('weapon'),
            shield: getValue('shield'),
            head: getValue('head'),
            armor: getValue('armor')
          },
          equipped: {
            body: getValue('body'),
            weapon: getValue('weapon'),
            headAccessory: getValue('headAccessory'),
            back: getValue('back'),
            eyewear: getValue('eyewear'),
            shield: getValue('shield'),
            head: getValue('head'),
            armor: getValue('armor')
          }
        }
      },
      preferences: {
        costume: false,
        background: getValue('background'),
        sleep: false,
        chair: getValue('chair'),
        shirt: getValue('shirt'),
        skin: getValue('skin'),
        hair: {
          flower: getValue('flower'),
          mustache: getValue('mustache'),
          beard: getValue('beard'),
          bangs: getValue('bangs'),
          base: getValue('base'),
          color: getValue('color')
        },
        size: getValue('size'),
      }
    }
  });

  avatar.id = 'avatar'
}

function randomizeSelects () {
  var selects = [
    'background',
    'chair',
    'base',
    'beard',
    'mustache',
    'color',
    'flower',
    'size',
    'shirt',
    'skin',
    'pet',
    'mount',
    'weapon',
    'shield',
    'armor',
    'head',
    'headAccessory',
    'back',
    'body',
    'eyewear'
  ]

  selects.forEach(randomizeSelect)
}

function randomizeSelect(name) {
  var select = document.querySelector('#' + name)
  var options = select.querySelectorAll('option')
  var random = Math.floor(Math.random() * options.length);

  if (!options[random]) {
    console.log(name)
    console.log(random)
    return
  }
  options[random].setAttribute('selected', true)
}

function populateSelect(name, object) {
  var select = document.querySelector('#' + name)

  if (!select) {
    console.log('couldn\'t find', name)
    return
  }

  Object.keys(object).forEach(function (key) {
    var selection = object[key]
    var optionNode = document.createElement('option')

    optionNode.value = selection.key
    optionNode.innerText = selection.text || selection.key

    select.appendChild(optionNode)
  })
}

api.get('/content').then((response) => {
  var content = response.data
  var appearances = content.appearances
  var equipmentByGroup

  populateSelect('background', content.backgroundsFlat)
  populateSelect('chair', appearances.chair)

  Object.keys(appearances.hair).forEach(function (hairType) {
    populateSelect(hairType, appearances.hair[hairType])
  })

  populateSelect('size', appearances.size)
  populateSelect('shirt', appearances.shirt)
  populateSelect('skin', appearances.skin)

  populateSelect('pet', content.petInfo)
  populateSelect('mount', content.mountInfo)


  equipmentByGroup = Object.keys(content.gear.flat).reduce(function (equipment, key) {
    var gear = content.gear.flat[key]

    equipment[gear.type] = equipment[gear.type] || {}

    equipment[gear.type][gear.key] = {
      key: gear.key,
      text: gear.text
    }

    return equipment
  }, {})

  Object.keys(equipmentByGroup).forEach(function (type) {
    populateSelect(type, equipmentByGroup[type])
  })

  document.querySelector('#make-avatar').addEventListener('click', makeAvatar)
  document.querySelector('#randomize').addEventListener('click', randomizeSelects)

  randomizeSelects()

  makeAvatar()
})
