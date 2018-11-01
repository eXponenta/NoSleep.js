# NoSleep.js

Prevent display sleep and enable wake lock in all Android and iOS web browsers. Forked from the original repository that no longer is maintained.

## Build from source

This repository uses webpack to build the distribution versions of the library. To build this library run `webpack`.

## Usage

Create a new NoSleep object and then enable or disable it when needed as follows:

``` javascript
window.noSleep = new NoSleep();
window.isEnabling = false; // This is useful to avoid asynchronous competition from double-taps

window.enableNoSleep = function() {
  if (window.isEnabling || window.noSleep.isEnabled) return; // Once enabled, no need to do so again
  window.isEnabling = true;
  window.noSleep.enable();
  window.setTimeout(_ => {
    if (window.noSleep.isEnabled) {
      document.removeEventListener('click', window.enableNoSleep);
      document.removeEventListener('touchend', window.enableNoSleep);
      console.log('Enabling nosleep.js');
    } else {
      console.warn('Could not enable nosleep.js with this input. Try again.');
    }
    window.isEnabling = false;
  }, 100);

window.disableNoSleep = function() {
  window.noSleep.disable();
  document.removeEventListener('click', window.enableNoSleep);
  document.removeEventListener('touchend', window.enableNoSleep);
  console.log('Disabling nosleep.js');
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize game here
  document.addEventListener('click', window.enableNoSleep, false);
  document.addEventListener('touchend', window.enableNoSleep, false);
});
```

Optionally, you may pass a title to the `NoSleep` object. On iOS devices, when the user turns the screen off and then back on, this title is what will be displayed to them. This is useful for branding purposes, as you would want the name of your application to appear, as opposed to the default `No Sleep` title, or even worse, a random data string.

```js
window.noSleep = new NoSleep('My Application Title');
```

In your HTML, you want to ensure your body has the following attribute set for `ontouchstart`. This is for iOS compatibility.

```html
<body ontouchstart="">
```

## License

MIT. Copyright (c) Muhammad Abdul-Rahim, Rich Tibbett
