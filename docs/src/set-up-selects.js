'use strict'

function populateSelect(name, object) {
  var select = document.querySelector('#' + name)

  Object.keys(object).forEach(function (key) {
    var selection = object[key]
    var optionNode = document.createElement('option')

    optionNode.value = selection.key
    optionNode.innerText = selection.text || selection.key

    select.appendChild(optionNode)
  })
}

module.exports = function (content) {
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
}
