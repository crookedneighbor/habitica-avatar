'use strict'

var EQUIPMENT_WITH_CUSTOM_STYLES = {
  weapon_special_critical: {
    marginLeft: '-12px',
    marginTop: '12px'
  }
}

module.exports = function (equipment, img) {
  if (equipment.indexOf('base_0') > -1) {
    return
  }

  if (equipment in EQUIPMENT_WITH_CUSTOM_STYLES) {
    Object.assign(img.style, EQUIPMENT_WITH_CUSTOM_STYLES[equipment])
  }

  return equipment
}
