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

### with Habitica npm package

Using the [habitica npm package](https://www.npmjs.com/package/habitica), you can fetch a user's data and pass the object directly into the `habiticaAvatar` function.

```js
var Habitica = require('habitica')
var habiticaAvatar = require('habitica-avatar')

var api = new Habitica()

api.get('/members/user-uuid').then(function (response) {
  habiticaAvatar({
    container: '#div-to-put-avatar',
    user: response.data
  })
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

## Testing

```sh
npm test
```

## Demo App

A demo app is available at https://crookedneighbor.github.io/habitica-avatar/

## TODO

- [ ] Add ability to force costume
- [ ] Add ability to force equipment
