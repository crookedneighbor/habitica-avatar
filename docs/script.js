(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

var Habitica = require('habitica')

module.exports = new Habitica()

},{"habitica":18}],2:[function(require,module,exports){
'use strict'

var api = require('./api')

module.exports = function () {
  return api.get('/content').then(function (response) {
    return response.data
  })
}

},{"./api":1}],3:[function(require,module,exports){
'use strict'

module.exports = function getValue (name) {
  return document.querySelector('#' + name).value
}

},{}],4:[function(require,module,exports){
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

  for (var j = 0; j < menuOptions.length; j++) {
    menuOptions[j].classList.remove('active')
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

},{"./get-content":2,"./make-avatar-from-selections":5,"./make-avatar-from-user-id":6,"./randomize-selects":7,"./set-up-selects":8}],5:[function(require,module,exports){
'use strict'

var habiticaAvatar = require('../../habitica-avatar')
var getValue = require('./get-value')
var avatarContainer = document.querySelector('#avatar-container')

module.exports = function makeAvatar () {
  var avatar

  avatarContainer.innerHTML = ''

  avatar = habiticaAvatar({
    container: avatarContainer,
    user: {
      stats: {
        buffs: {
          snowball: getValue('visual-buff') === 'snowball',
          spookySparkles: getValue('visual-buff') === 'spookySparkles',
          shinySeed: getValue('visual-buff').split('.')[0] === 'shinySeed',
          seafoam: getValue('visual-buff') === 'seafoam'
        },
        class: getValue('visual-buff').split('.')[1] || 'wizard'
      },
      items: {
        currentMount: getValue('mount'),
        currentPet: getValue('pet'),
        gear: {
          costume: {
            body: getValue('body'),
            weapon: getValue('weapon'),
            headAccessory: getValue('headAccessory'),
            back: getValue('back'),
            eyewear: getValue('eyewear'),
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
        sleep: getValue('sleep') === 'true',
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
        size: getValue('size')
      }
    }
  })

  avatar.id = 'avatar'
}

},{"../../habitica-avatar":9,"./get-value":3}],6:[function(require,module,exports){
'use strict'

var habiticaAvatar = require('../../habitica-avatar')
var getValue = require('./get-value')

var avatarContainer = document.querySelector('#avatar-container')
var error = document.querySelector('#user .error')

module.exports = function () {
  var uuid = getValue('user-id')

  error.innerText = ''
  avatarContainer.innerHTML = ''

  habiticaAvatar.fromUserId(uuid, {
    container: avatarContainer
  }).then(function (avatar) {
    avatar.id = 'avatar'
  }).catch(function (err) {
    console.error(err)
    error.innerText = 'There was an error looking up the user.'
  })
}

},{"../../habitica-avatar":9,"./get-value":3}],7:[function(require,module,exports){
'use strict'

var selects = [
  'background',
  'sleep',
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

function randomizeSelect (name) {
  var select = document.querySelector('#' + name)
  var options = select.querySelectorAll('option')
  var random = Math.floor(Math.random() * options.length)

  if (!options[random]) {
    return
  }
  options[random].setAttribute('selected', true)
}

module.exports = function randomizeSelects () {
  selects.forEach(randomizeSelect)
}

},{}],8:[function(require,module,exports){
'use strict'

function populateSelect (name, object) {
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

},{}],9:[function(require,module,exports){
'use strict'

var findS3Src = require('./lib/find-s3-src')
var addLayer = require('./lib/add-layer')
var isHabitica = require('./lib/is-habitica')
var Habitica = require('habitica')

var api = new Habitica()

var CHARACTER_SPRITE_NODES = require('./lib/character-sprites-config')

function habiticaAvatar (options) {
  var user = options.user
  var container = options.container
  var ignore = options.ignore || {}
  var appearance = user.preferences
  var useClassMode = !options.forceImageMode && Boolean(isHabitica() || options.forceClassMode)

  var avatarContainer = document.createElement('div')
  var characterSprites = document.createElement('div')

  avatarContainer.style.height = '147px'
  avatarContainer.style.width = '140px'
  avatarContainer.style.position = 'relative'
  avatarContainer.style.boxSizing = 'border-box'
  avatarContainer.style.imageRendering = 'pixelated'

  if (!user.items.currentMount || ignore.mount) {
    avatarContainer.style.paddingTop = '24.5px'
  }

  if (appearance.background && !ignore.background) {
    if (useClassMode) {
      avatarContainer.classList.add('background_' + appearance.background)
    } else {
      avatarContainer.style.backgroundImage = 'url("' + findS3Src('background_' + appearance.background) + '")'
    }
  }

  characterSprites.style.margin = '0 auto 0 24px'
  characterSprites.style.width = '90px'
  characterSprites.style.height = '90px'

  CHARACTER_SPRITE_NODES.forEach(addLayer(characterSprites, {
    user: options.user,
    ignore: options.ignore,
    forceEquipment: options.forceEquipment,
    forceCostume: options.forceCostume,
    useClassMode: useClassMode
  }))

  avatarContainer.appendChild(characterSprites)

  if (typeof container === 'string') {
    container = document.querySelector(container)
  }

  if (container) {
    container.appendChild(avatarContainer)
  }

  return avatarContainer
}

habiticaAvatar.fromUserId = function (userId, options) {
  return api.get('/members/' + userId).then(function (response) {
    var config = Object.assign({}, options, { user: response.data })

    return habiticaAvatar(config)
  })
}

module.exports = habiticaAvatar

},{"./lib/add-layer":10,"./lib/character-sprites-config":11,"./lib/find-s3-src":12,"./lib/is-habitica":16,"habitica":18}],10:[function(require,module,exports){
'use strict'

var findS3Src = require('./find-s3-src')
var formatEquipmentImg = require('./format-equipment-img')
var formatAppearanceImg = require('./format-appearance-img')
var findVisualBuff = require('./find-visual-buff')

module.exports = function addImg (characterSpritesNode, options) {
  var user = options.user
  var appearance = user.preferences
  var gear = user.items.gear
  var ignore = options.ignore || {}
  var useClassMode = options.useClassMode
  var visualBuff = findVisualBuff(user)

  return function (config) {
    var element, s3Key

    if (useClassMode) {
      element = document.createElement('div')
    } else {
      element = document.createElement('img')
    }

    if (ignore[config.name]) {
      return
    }

    if (visualBuff && !config.showWhenVisualBuffApplied && !ignore.visualBuff) {
      return
    }

    element.style.position = 'absolute'

    if (config.style) {
      Object.assign(element.style, config.style)
    }

    if (config.type === 'buff') {
      s3Key = visualBuff
    } else if (config.type === 'static') {
      s3Key = config.name
    } else if (config.type === 'equipment') {
      if ((appearance.costume && !options.forceEquipment) || options.forceCostume) {
        s3Key = formatEquipmentImg(gear.costume[config.name], element)
      } else {
        s3Key = formatEquipmentImg(gear.equipped[config.name], element)
      }
    } else if (config.type === 'appearance') {
      s3Key = formatAppearanceImg(config.name, {
        ignore: ignore,
        subName: config.subName,
        appearance: appearance
      })
    } else if (config.itemsKey) {
      s3Key = user.items[config.itemsKey]
    }

    if (!s3Key) {
      return // skip if no image url can be found
    }

    if (config.prefix) {
      s3Key = config.prefix + s3Key
    }

    if (config.sizePrefix) {
      s3Key = appearance.size + '_' + s3Key
    }

    if (useClassMode) {
      element.classList.add(s3Key)
    } else {
      element.src = findS3Src(s3Key)
    }

    characterSpritesNode.appendChild(element)
  }
}

},{"./find-s3-src":12,"./find-visual-buff":13,"./format-appearance-img":14,"./format-equipment-img":15}],11:[function(require,module,exports){
'use strict'

module.exports = [{
  name: 'mount',
  prefix: 'Mount_Body_',
  itemsKey: 'currentMount',
  type: 'pet',
  showWhenVisualBuffApplied: true,
  style: {
    marginTop: '18px'
  }
}, {
  name: 'visualBuff',
  showWhenVisualBuffApplied: true,
  type: 'buff'
}, {
  name: 'hair',
  subName: 'flower',
  prefix: 'hair_flower_',
  showWhenVisualBuffApplied: true,
  type: 'appearance'
}, {
  name: 'chair',
  prefix: 'chair_',
  type: 'appearance'
}, {
  name: 'back',
  type: 'equipment'
}, {
  name: 'skin',
  prefix: 'skin_',
  type: 'appearance'
}, {
  name: 'shirt',
  sizePrefix: true,
  prefix: 'shirt_',
  type: 'appearance'
}, {
  name: 'head_0',
  type: 'static'
}, {
  name: 'armor',
  sizePrefix: true,
  type: 'equipment'
}, {
  name: 'head_0',
  type: 'static'
}, {
  name: 'body',
  type: 'equipment'
}, {
  name: 'hair',
  subName: 'base',
  prefix: 'hair_base_',
  type: 'appearance'
}, {
  name: 'hair',
  subName: 'bangs',
  prefix: 'hair_bangs_',
  type: 'appearance'
}, {
  name: 'hair',
  subName: 'mustache',
  prefix: 'hair_mustache_',
  type: 'appearance'
}, {
  name: 'hair',
  subName: 'beard',
  prefix: 'hair_beard_',
  type: 'appearance'
}, {
  name: 'eyewear',
  type: 'equipment'
}, {
  name: 'head',
  type: 'equipment'
}, {
  name: 'headAccessory',
  type: 'equipment'
}, {
  name: 'hair',
  subName: 'flower',
  prefix: 'hair_flower_',
  type: 'appearance'
}, {
  name: 'shield',
  type: 'equipment'
}, {
  name: 'weapon',
  type: 'equipment'
}, {
  name: 'sleep',
  showWhenVisualBuffApplied: true,
  type: 'appearance'
}, {
  name: 'mount',
  type: 'pet',
  style: {
    marginTop: '18px'
  },
  prefix: 'Mount_Head_',
  showWhenVisualBuffApplied: true,
  itemsKey: 'currentMount'
}, {
  name: 'pet',
  type: 'pet',
  prefix: 'Pet-',
  showWhenVisualBuffApplied: true,
  style: {
    left: '0px',
    bottom: '0px'
  },
  itemsKey: 'currentPet'
}]

},{}],12:[function(require,module,exports){
'use strict'

var S3 = 'https://s3.amazonaws.com/habitica-assets/mobileApp/images/'

var GIFS = [
  'broad_armor_special_0',
  'slim_armor_special_0',
  'broad_armor_special_1',
  'slim_armor_special_1',
  'head_special_0',
  'head_special_1',
  'shield_special_0',
  'weapon_special_0',
  'weapon_special_critical',
  'Pet-Wolf-Cerberus'
].reduce(function (obj, value) {
  obj[value] = true
  return obj
}, {})

module.exports = function (value) {
  var ext = 'png'

  if (value in GIFS) {
    ext = 'gif'
  }

  return S3 + value + '.' + ext
}

},{}],13:[function(require,module,exports){
'use strict'

var VISUAL_BUFFS = {
  snowball: 'snowman',
  spookySparkles: 'ghost',
  shinySeed: 'avatar_floral',
  seafoam: 'seafoam_star'
}

module.exports = function findVisualBuff (user) {
  var buffKey, buff

  Object.keys(VISUAL_BUFFS).forEach(function (key) {
    if (user.stats.buffs[key]) {
      buffKey = key
    }
  })

  if (buffKey) {
    buff = VISUAL_BUFFS[buffKey]

    if (buffKey === 'shinySeed') {
      buff = buff + '_' + user.stats.class
    }
  }

  return buff
}

},{}],14:[function(require,module,exports){
'use strict'

module.exports = function (name, config) {
  var s3Key
  var subName = config.subName
  var appearance = config.appearance
  var ignore = config.ignore || {}

  if (name === 'hair') {
    if (!appearance.hair[subName] || appearance.hair[subName] === '0') {
      return // skip adding this hair bit, because it does not exist
    }

    s3Key = appearance.hair[subName]

    if (subName !== 'flower') {
      s3Key = s3Key + '_' + appearance.hair.color
    }
  } else if (name === 'skin') {
    s3Key = appearance.skin

    if (appearance.sleep && !ignore.sleep) {
      s3Key = s3Key + '_sleep'
    }
  } else if (name === 'sleep') {
    if (!appearance.sleep) {
      return // skip if user is not asleep
    }
    s3Key = 'zzz'
  } else {
    s3Key = appearance[name]
  }

  if (s3Key === 'none') {
    return // return without supplying an image to look up
  }

  return String(s3Key)
}

},{}],15:[function(require,module,exports){
'use strict'

var EQUIPMENT_WITH_CUSTOM_STYLES = {
  weapon_special_critical: {
    marginLeft: '-12px',
    marginTop: '12px'
  }
}

module.exports = function (equipment, img) {
  if (!equipment || equipment.indexOf('base_0') > -1) {
    return
  }

  if (equipment in EQUIPMENT_WITH_CUSTOM_STYLES) {
    Object.assign(img.style, EQUIPMENT_WITH_CUSTOM_STYLES[equipment])
  }

  return equipment
}

},{}],16:[function(require,module,exports){
(function (global){
'use strict'

module.exports = function () {
  return global.location.host === 'habitica.com'
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],18:[function(require,module,exports){
(function (global){
'use strict'

var Connection = require('./lib/connection')
var errors = require('./lib/errors')

if (!global.Promise) {
  throw new Error('Promise could not be found in this context. You must polyfill it to use this module.')
}

/**
 * @constructor
 * @description Your client to interact with the [Habitica API](https://habitica.com/apidoc/).
 *
 * @param {Object} options - The properties to configure the Habitica client
 * @param {String} [options.id] - The id of the user
 * @param {String} [options.apiToken] - The API token of the user
 * @param {String} [options.endpoint=https://habitica.com] - The endpoint to use
 * @param {String} [options.platform=Habitica-Node] - The name of your integration
 * @param {Function} [options.errorHandler] - A function to run when a request errors. The result of this function will be the argument passed to the `catch` in the request `Promise`
 *
 * @example
 * var Habitica = require('habitica')
 * var api = new Habitica({
 *   id: 'your-habitica.com-user-id',
 *   apiToken: 'your-habitica.com-api-token',
 *   endpoint: 'http://custom-url.com',
 *   platform: 'The Name of Your Integration'
 *   errorHandler: function (err) {
 *     // handle all errors from failed requests
 *   }
 * })
 * @example <caption>The id and apiToken parameters are not required and can be set later. The credentials will be automatically set when using the register and localLogin methods.</caption>
 * var Habitica = require('habitica')
 * var api = new Habitica()
 * @example <caption>A sample error handler</caption>
 * var Habitica = require('habitica')
 *
 * function sendNotification (style, message) {
 *   // logic for sending a notification to user
 * }
 *
 * var api = new Habitica({
 *   id: 'your-habitica.com-user-id',
 *   apiToken: 'your-habitica.com-api-token',
 *   errorHandler: function (err) {
 *     if (err instanceof Habitica.ApiError) {
 *       // likely a validation error from
 *       // the API request
 *       sendNotification('warning', err.messsage)
 *     } else if (err instanceof Habitica.UnknownConnectionError) {
 *       // either the Habitica API is down
 *       // or there is no internet connection
 *       sendNotification('danger', err.originalError.message)
 *     } else {
 *       // there is something wrong with your integration
 *       // such as a syntax error or other problem
 *       console.error(err)
 *     }
 *   }
 * })
 *
 * api.get('/tasks/id-that-does-not-exist').then(() => {
 *   // will never get here
 *   return api.get('/something-else')
 * }).then(() => {
 *   // will never get here
 * }).catch((err) => {
 *   // before this happens, the errorHandler gets run
 *   err // undefined because the errorHandler did not return anything
 *   // you could leave the catch off entirely since the
 *   // configured errorHandler does all the necessary work
 *   // to message back to the user
 * })
 */
function Habitica (options) {
  options = options || {}

  this._connection = new Connection(options)
}

/** @public
 *
 * @returns {Object} The options used to make the requests. The same as the values used {@link Habitica#setOptions|to set the options}
 */
Habitica.prototype.getOptions = function () {
  return this._connection.getOptions()
}

/** @public
 *
 * @param {Object} options - The properties to configure the Habitica client. If a property is not passed in, it will default to the value passed in on instantiation
 * @param {String} [options.id] - The id of the user
 * @param {String} [options.apiToken] - The API apiToken of the user
 * @param {String} [options.endpoint] - The endpoint to use
 * @param {String} [options.platform] - The name of your integration
 * @param {Function} [options.errorHandler] - A function to run when a request errors
 *
 * @example
 * api.setOptions({
 *   id: 'new-user-id',
 *   apiToken: 'new-api-token',
 *   endpoint: 'http://localhost:3000/',
 *   platform: 'Great-Habitica-Integration',
 *   errorHandler: yourErrorHandlerFunction
 * })
 */
Habitica.prototype.setOptions = function (creds) {
  this._connection.setOptions(creds)
}

/** @public
 *
 * @param {String} username - The username to register with
 * @param {String} email - The email to register with
 * @param {String} password - The password to register with
 *
 * @returns {Promise} A Promise that resolves the response from the register request
 *
 * @example <caption>The id and api token will be set automatically after a sucessful registration request</caption>
 * api.register('username', 'email', 'password').then((res) => {
 *   var user = res.data
 * }).catch((err) => {
 *   // handle registration errors
 * })
 */
Habitica.prototype.register = function (username, email, password) {
  return this.post('/user/auth/local/register', {
    username: username,
    email: email,
    password: password,
    confirmPassword: password
  }).then(function (res) {
    this.setOptions({
      id: res.data._id,
      apiToken: res.data.apiToken
    })

    return res
  }.bind(this))
}

/** @public
 *
 * @param {String} usernameOrEmail - The username or email to login with
 * @param {String} password - The password to login with
 *
 * @returns {Promise} A Promise that resolves the response from the login request
 * @example <caption>The id and api token will be set automatically after a sucessful login request</caption>
 * api.login('username or email','password').then((res) => {
 *   var creds = res.data
 *
 *   creds.id // the user's id
 *   creds.apiToken // the user's api token
 * }).catch((err) => {
 *   // handle login errors
 * })
 */
Habitica.prototype.localLogin = function (usernameEmail, password) {
  return this.post('/user/auth/local/login', {
    username: usernameEmail,
    password: password
  }).then(function (res) {
    this._connection.setOptions({
      id: res.data.id,
      apiToken: res.data.apiToken
    })

    return res
  }.bind(this))
}

/** @public
 *
 * @param {String} route - The Habitica API route to use
 * @param {Object} [query] - Query params to send along with the request
 *
 * @returns {Promise} A Promise that resolves the response from the GET request
 * @example <caption>Making a basic request</caption>
 * api.get('/user').then((res) => {
 *   var user = res.data
 *
 *   user.profile.name // the user's display name
 * })
 * @example <caption>A request with a query Object</caption>
 * api.get('/groups', {
 *   type: 'publicGuilds,privateGuilds'
 * }).then((res) => {
 *   var guilds = res.data
 *   var guild = guilds[0]
 *
 *   guild.name // the name of the group
 * })
 *
 * @example <caption>Handling errors</caption>
 * api.get('/tasks/non-existant-id').then((res) => {
 *   // will never get here
 * }).catch((err) => {
 *   err.message // 'Task not found'
 * })
 */
Habitica.prototype.get = function (path, query) {
  return this._connection.get(path, {
    query: query
  })
}

/** @public
 *
 * @param {String} route - The Habitica API route to use
 * @param {Object} [body] - The body to send along with the request
 * @param {Object} [query] - Query params to send along with the request
 *
 * @returns {Promise} A Promise that resolves the response from the POST request
 *
 * @example <caption>A request with a body</caption>
 * api.post('/tasks/user', {
 *   text: 'Task Name',
 *   notes: 'Task Notes',
 *   type: 'todo'
 * }).then((res) => {
 *   var task = res.data
 *
 *   task.text // 'Task Name'
 * })
 *
 * @example <caption>Handling errors</caption>
 * api.post('/groups', {
 *   type: 'party',
 *   name: 'My Party'
 * }).then((res) => {
 *   var party = res.data
 *
 *   party.name // 'My Party'
 * }).catch((err) => {
 *   // handle errors
 * })
 */
Habitica.prototype.post = function (path, body, query) {
  return this._connection.post(path, {
    send: body,
    query: query
  })
}

/** @public
 *
 * @param {String} route - The Habitica API route to use
 * @param {Object} [body] - The body to send along with the request
 * @param {Object} [query] - Query params to send along with the request
 *
 * @returns {Promise} A Promise that resolves the response from the PUT request
 *
 * @example <caption>A request with a body</caption>
 * api.put('/tasks/the-task-id', {
 *   text: 'New Task Name',
 *   notes: 'New Text Notes'
 * }).then((res) => {
 *   var task = res.data
 *
 *   task.text // 'New Task Name'
 * })
 *
 * @example <caption>Handling errors</caption>
 * api.put('/groups/the-group-id', {
 *   name: 'New Group Name'
 * }).then((res) => {
 *   var group = res.data
 *
 *   group.name // 'New Group Name'
 * }).catch((err) => {
 *   // handle errors
 * })
 */
Habitica.prototype.put = function (path, body, query) {
  return this._connection.put(path, {
    send: body,
    query: query
  })
}

/** @public
 *
 * @param {String} route - The Habitica API route to use
 * @param {Object} [body] - The body to send along with the request
 * @param {Object} [query] - Query params to send along with the request
 *
 * @returns {Promise} A Promise that resolves the response from the DELETE request
 *
 * @example <caption>A basic request</caption>
 * api.del('/tasks/the-task-id').then(() => {
 *   // The task has been deleted
 * })
 *
 * @example <caption>Handling errors</caption>
 * api.del('/groups/the-group-id').then(() => {
 *  // The group has been deleted
 * }).catch((err) => {
 *   // handle errors
 * })
 */
Habitica.prototype.del = function (path, body, query) {
  return this._connection.del(path, {
    send: body,
    query: query
  })
}

Habitica.ApiError = errors.HabiticaApiError
Habitica.UnknownConnectionError = errors.UnknownConnectionError

module.exports = Habitica

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/connection":19,"./lib/errors":20}],19:[function(require,module,exports){
'use strict'

var superagent = require('superagent')
var errors = require('./errors')
var HabiticaApiError = errors.HabiticaApiError
var UnknownConnectionError = errors.UnknownConnectionError

var DEFAULT_ENDPOINT = 'https://habitica.com/'
var DEFAULT_PLATFORM = 'Habitica-Node'
var TOP_LEVEL_ROUTES = [
  'logout',
  'export',
  'email',
  'qr-code',
  'amazon',
  'iap',
  'paypal',
  'stripe'
]
var TOP_LEVEL_ROUTES_REGEX = new RegExp('^/(' + TOP_LEVEL_ROUTES.join('|') + ').*')

function formatError (err) {
  var connectionError, status, data

  if (err.response && err.response.error) {
    status = err.response.error.status
    data = JSON.parse(err.response.text)

    connectionError = new HabiticaApiError({
      type: data.error,
      status: status,
      message: data.message
    })
  }

  if (!connectionError) {
    connectionError = new UnknownConnectionError(err)
  }

  return connectionError
}

function normalizeEndpoint (url) {
  var lastCharIndex = url.length - 1
  var lastChar = url[lastCharIndex]

  if (lastChar === '/') {
    url = url.substring(0, lastCharIndex)
  }

  return url
}

function Connection (options) {
  options.endpoint = options.endpoint || DEFAULT_ENDPOINT
  options.platform = options.platform || DEFAULT_PLATFORM

  this.setOptions(options)
}

Connection.prototype.getOptions = function () {
  return {
    id: this._id,
    apiToken: this._apiToken,
    endpoint: this._endpoint,
    platform: this._platform
  }
}

Connection.prototype.setOptions = function (creds) {
  creds = creds || {}

  if (creds.hasOwnProperty('id')) {
    this._id = creds.id
  }
  if (creds.hasOwnProperty('apiToken')) {
    this._apiToken = creds.apiToken
  }
  if (creds.hasOwnProperty('endpoint')) {
    this._endpoint = normalizeEndpoint(creds.endpoint)
  }
  if (creds.hasOwnProperty('platform')) {
    this._platform = creds.platform
  }
  if (creds.hasOwnProperty('errorHandler')) {
    this._errorHandler = creds.errorHandler
  }
}

Connection.prototype.get = function (route, options) {
  return this._router('get', route, options)
}

Connection.prototype.post = function (route, options) {
  return this._router('post', route, options)
}

Connection.prototype.put = function (route, options) {
  return this._router('put', route, options)
}

Connection.prototype.del = function (route, options) {
  return this._router('del', route, options)
}

Connection.prototype.delete = Connection.prototype.del

Connection.prototype._router = function (method, route, options) {
  var request, prefix

  options = options || {}

  if (TOP_LEVEL_ROUTES_REGEX.test(route)) {
    prefix = ''
  } else {
    prefix = '/api/v3'
  }

  request = superagent[method](this._endpoint + prefix + route)
    .accept('application/json')
    .set('x-client', this._platform)

  if (this._id && this._apiToken) {
    request
      .set('x-api-user', this._id)
      .set('x-api-key', this._apiToken)
  }

  request
    .query(options.query)
    .send(options.send)

  return request.then(function (response) {
    return response.body
  }).catch(function (err) {
    var formattedError = formatError(err)

    if (typeof this._errorHandler === 'function') {
      return Promise.reject(this._errorHandler(formattedError))
    } else {
      throw formattedError
    }
  }.bind(this))
}

module.exports = Connection

},{"./errors":20,"superagent":21}],20:[function(require,module,exports){
'use strict'

function CustomError (message) {
  /** A translated error message you can provide for your user
   * @memberof HabiticaApiError
   */
  this.message = message

  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

CustomError.prototype = Object.create(Error.prototype)

/**
 * @constructor HabiticaApiError
 * @description Returned when the API request returns a HTTP status between 400 and 500
 *
 * @example <caption>Use the error objects on the Habitica package to write an error handler</caption>
 * var Habitica = require('habitica')
 * var api = new Habitica({
 *   // setup client
 * })
 *
 * api.get('/user').then(() => {
 *   // will never get here
 * }).catch((err) => {
 *   if (err instanceof Habitica.ApiError) {
 *     // likely a validation error from
 *     // the API request
 *     console.log(err.message)
 *   } else if (err instanceof Habitica.UnknownConnectionError) {
 *     // either the Habitica API is down
 *     // or there is no internet connection
 *     console.log(err.originalError)
 *   } else {
 *     // there is something wrong with your integration
 *     // such as a syntax error or other problem
 *     console.log(err)
 *   }
 * })
 */
function HabiticaApiError (options) {
  options = options || {}

  CustomError.call(this, options.message)

  /** The status code of the HTTP request. Will be a number >= `400` and <= `500`
   * @memberof HabiticaApiError
   */
  this.status = options.status

  /** A type coresponding to the status code. For instance, an error with a status of `404` will be type `NotFound`
   * @memberof HabiticaApiError
   */
  this.type = options.type
  this.name = 'HabiticaApi' + options.type + 'Error'
}

HabiticaApiError.prototype = Object.create(CustomError.prototype)

/**
 * @constructor UnknownConnectionError
 *
 * @description Returned when an error could not be parsed from a failed request. Most likely when there is not an internet connection.
 * @example <caption>See {@link HabiticaApiError} for a full example of how to use it when handling request errors.</caption>
 * api.get('/user').then(() => {
 *   // assuming there is no internet
 *   // connection, so user never
 *   // gets here
 * }).catch((err) => {
 *   err.message // 'An unknown error occurred'
 *   console.error(err.originalError)
 * })
 */
function UnknownConnectionError (err) {
  CustomError.call(this, 'An unknown error occurred')

  /** The original error from the failed request
   * @memberof UnknownConnectionError
   */
  this.originalError = err
  this.name = 'UnknownConnectionError'
}

UnknownConnectionError.prototype = Object.create(HabiticaApiError.prototype)

module.exports = {
  HabiticaApiError: HabiticaApiError,
  UnknownConnectionError: UnknownConnectionError
}

},{}],21:[function(require,module,exports){
/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('emitter');
var requestBase = require('./request-base');
var isObject = require('./is-object');

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = module.exports = require('./request').bind(null, Request);

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */),
        key = parts.shift(),
        val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this._setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this._parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype._setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype._setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (res.status < 200 || res.status >= 300) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  this._getFormData().append(field, file, filename || file.name);
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype._timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self._timeoutError();
      if (self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  this._appendQueryString();

  // initiate request
  if (this.username && this.password) {
    xhr.open(this.method, this.url, true, this.username, this.password);
  } else {
    xhr.open(this.method, this.url, true);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};


/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":22,"./request":24,"./request-base":23,"emitter":17}],22:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],23:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

exports.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

exports.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
exports.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

exports.withCredentials = function(){
  // This is browser-only functionality. Node side is no-op.
  this._withCredentials = true;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

exports.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

exports.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

exports._isHost = function _isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

exports.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || this._isHost(data)) return this;

  // default to json
  if (!type) this.type('json');
  return this;
};

},{"./is-object":22}],24:[function(require,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}]},{},[4]);
