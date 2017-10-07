'use strict'

var getContent = require('./get-content')
var randomizeSelects = require('./randomize-selects')
var setUpSelects = require('./set-up-selects')
var makeAvatarFromSelections = require('./make-avatar-from-selections')
var makeAvatarFromUserId = require('./make-avatar-from-user-id')

var menuOptions = document.querySelectorAll('#selector ul li')

function chooseOption (event) {
  var element = event.srcElement
  var selection = element.getAttribute('data-section')
  var sections = document.querySelectorAll('.section')
  var section = document.querySelector('#' + selection)

  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active')
  }

  for (var i = 0; i < menuOptions.length; i++) {
    menuOptions[i].classList.remove('active')
  }

  element.classList.add('active')
  section.classList.add('active')
}

getContent().then(setUpSelects).then(function () {
  document
    .querySelector('#selection-make-avatar')
    .addEventListener('click', makeAvatarFromSelections)
  document
    .querySelector('#randomize')
    .addEventListener('click', randomizeSelects)
  document
    .querySelector('#user-make-avatar')
    .addEventListener('click', makeAvatarFromUserId)

  document
    .querySelector('#select-avatar')
    .addEventListener('click', chooseOption)
  document
    .querySelector('#select-user')
    .addEventListener('click', chooseOption)

  randomizeSelects()

  makeAvatarFromSelections()
})
