# hooray.js

lightweight confetti/burst effects with support for custom images and icons. no dependencies - based on the Web Animations API.

[demo](https://clarkfannin.github.io/hoorayjs/)

## install

```
npm install hoorayjs
```

or straight off a CDN if you're not using a bundler:

```html
<script type="module">
  import { hooray } from "https://unpkg.com/hoorayjs";
</script>
```

ESM only. no CJS build.

## usage

```js
import { hooray } from "hoorayjs";

const btn = document.querySelector("#submit");

btn.addEventListener("click", () => {
  hooray(btn);
});
```

confetti bursts from the center of whatever element you pass in.

### custom images

pass an `image` url and the pieces become that image instead of colored rectangles. works best with svg

```js
hooray(btn, {
  image: "/icons/star.svg",
  width: 24,
  height: 24,
});
```

### tinting

if you pass `color` along with `image`, the image gets a color overlay. color accepts any valid CSS color value:

```js
hooray(btn, {
  image: "/icons/heart.svg",
  color: "hotpink",
  width: 24,
  height: 24,
});
```

## options

| option         | default | what it does                                                                 |
| -------------- | ------- | ---------------------------------------------------------------------------- |
| `count`        | `80`    | number of pieces                                                              |
| `mobileCount`  | `40`    | piece count on small screens (< 800px)                                        |
| `duration`     | `3000`  | animation length in ms                                                        |
| `width`        | `16`    | piece width in px                                                             |
| `height`       | `8`     | piece height in px                                                            |
| `mobileWidth`  | `16`    | piece width on small screens                                                  |
| `mobileHeight` | `8`     | piece height on small screens                                                 |
| `randomSize`   | `true`  | randomly scale each piece down from the max size (images keep aspect ratio)   |
| `spread`       | `380`   | burst radius in px                                                            |
| `mobileSpread` | `120`   | burst radius on small screens                                                 |
| `once`         | `false` | ignore repeat calls on the same element while a burst is already in flight    |
| `image`        | —       | url of an image to use for pieces                                             |
| `color`        | —       | with `image`, tints the image via css mask. without `image`, does nothing     |

## notes

- respects `prefers-reduced-motion` — if the user has it set, nothing fires
- safe to import in SSR / node, it just no-ops without a DOM
- pieces are appended to `document.body` with the class `hooray-piece` if you want to style them
- on mobile, the burst waits for the visual viewport to settle, so firing right after the keyboard closes doesn't put the origin in the wrong spot
- everything cleans itself up after the animation finishes

## license

MIT
