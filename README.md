# habitica-avatar

A module for constructing the Habitica Avatar.

## Usage

### npm

```sh
npm install --save habitica-avatar
```

```js
var habiticaAvatar = require('habitica-avatar')

habiticaAvatar({
  container: '#div-to-put-avatar',
  user: userObject
})
```

### In the browser

Download the most recent script on the [releases page](https://github.com/crookedneighbor/habitica-avatar/releases). The function is exposed as `window.habiticaAvatar`.

```js
window.habiticaAvatar({
  container: '#div-to-put-avatar',
  user: userObject
})
```

## Advanced options

### Looking up user avatar by user id

The `fromUserId` method on `habiticaAvatar` takes a user id and any additional options you would normally pass into `habiticaAvatar` and returns a Promise that resolves with the avatar.

```js
habiticaAvatar.fromUserId('user-id', {
  ignore: {
    background: true
  },
  // any other options
}).then(function (avatar) {
  // insert avatar onto your page
  document.body.appendChild(avatar)
})

// or

habiticaAvatar.fromUserId('user-id', {
  container: '#my-div',
  // any other options
})
// The avatar will be inserted into `#my-div` when the user look up is complete
```

If the user id does not resolve with a user, the Promise will reject.

```js
habiticaAvatar.fromUserId('id-that-does-not-belong-to-a-user').then(function (avatar) {
  // will never get here
}).catch(function (err) {
  // user could not be found
})
```

### Dom Node

The `container` property is optional. The return value of `habiticaAvatar` is a DOM node that you can append anywhere in the DOM.

```js
var avatar = habiticaAvatar({
  user: user
})

avatar.id = 'custom-id'
avatar.addEventListener('click', functionToRunWhenAvatarNodeIsClicked)

document.body.appendChild(avatar)
```

If you pass in a `container` property, it can either be a DOM node to append the avatar to, or a css selector for a DOM node. If the selector does not reference a DOM node, nothing will happen.

```js
var node = document.querySelector('#my-node')

habiticaAvatar({
  user: user,
  container: node, // or '#my-node'
})
```

### Ignore

You can ignore properties, causing them to not render by passing an ignore object.

```js
habiticaAvatar({
  user: user,
  ignore: {
    background: true,
    visualBuff: true,
    mount: true,
    hair: true,
    chair: true,
    back: true, // back equipment
    skin: true,
    shirt: true,
    head_0: true, // outline of head on all avatars
    body: true, // body accessory equipment
    eyewear: true,
    head: true,
    headAccessory: true,
    shield: true, // offhand equipment
    sleep: true,
    weapon: true,
    pet: true
  }
})
```

### Force Costume

By default, the costume will render if the user has the costume feature turned on. You can force the costume to be shown with the `forceCostume` option.

```js
habiticaAvatar({
  user: user,
  forceCostume: true
})
```

### Force Equipment

By default, the equipment will render if the user has the costume feature turned off. You can force the equipment to be shown with the `forceEquipment` option.

```js
habiticaAvatar({
  user: user,
  forceEquipment: true
})
```

## Testing

```sh
npm test
```

## Demo App

A demo app is available at https://crookedneighbor.github.io/habitica-avatar/
