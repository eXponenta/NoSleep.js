# NoSleep.js

Prevent display sleep and enable wake lock in all Android and iOS web browsers. Forked from the original repository that no longer is maintained.

## Build from source

This repository uses webpack to build the distribution versions of the library. To build this library run `webpack`.

## Usage

Create a new NoSleep object and then enable or disable it when needed as follows:

``` javascript
var noSleep = new NoSleep();

function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('click', enableNoSleep, false);
}

// Enable wake lock.
// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
document.addEventListener('click', enableNoSleep, false);

// ...

// Disable wake lock at some point in the future.
// (does not need to be wrapped in any user input event handler)
noSleep.disable();
```

Optionally, you may pass a title to the `NoSleep` object. On iOS devices, when the user turns the screen off and then back on, this title is what will be displayed to them. This is useful for branding purposes, as you would want the name of your application to appear, as opposed to the default `No Sleep` title, or even worse, a random data string.

```js
var noSleep = new NoSleep('My Application Title');
```

## License

MIT. Copyright (c) Muhammad Abdul-Rahim

MIT. Copyright (c) Rich Tibbett
