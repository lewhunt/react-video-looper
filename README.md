# React Video Looper

A React video player for looping inner sections of a video file. Packaged as an npm component library and CDN script.

![Example](https://github.com/lewhunt/assets/raw/master/readme/react-video-looper-example.gif)

```
<VideoLooper source='sample.mp4' start={4.31} end={9.48} loopCount={2} isDebugMode />
```

[See it in use here - React Fitness App](https://lewhunt.github.io/react-fitness-app/)

[Demo Editor (with debug mode)](https://lewhunt.github.io/react-video-looper/)

[CodePen Demo (bare-bones sample)](https://codepen.io/lewhunt/pen/vYEaKMj)

## Intro

### What is it?

This react component provides non-destructive inner looping on video files. By specifying start and end trim points it begins playback at zero and then repeats an infinite (or finite) loop on the trimmed portion of the video. Fullscreen by default.

### Why do it?

Initially built to assist in the development of an [interactive fitness app](https://lewhunt.github.io/react-fitness-app/), it offers an interesting alternative to the default HTML5 video loop attribute because it can play the original source file from the start but then repeat loop the trimmed portion of the video. In many cases it provides a more seamless loop compared to the default loop attribute or media fragment parameters.

### How is it done?

Under the hood this component utilises two overlapping video elements that playback in turn. Running the demo in debug mode (with split view enabled) further illustrates this technique with debug text and the cloned video is set to greyscale. See the end of this readme for more info on the [editor](#demo-editor).

## Install

### npm package (recommended)

```bash
npm i react-video-looper
```

### CDN script (for prototyping only)

```js
<script
  type="text/javascript"
  src="https://unpkg.com/react-video-looper/umd/react-video-looper.min.js"
></script>
```

## Usage

### Node.js development setup (recommended)

```js
import React from "react";
import VideoLooper from "react-video-looper";
import sampleVideo from "../assets/sample.mp4";

export default function Demo() {
  return (
    <div>
      <VideoLooper source="{sampleVideo}" start={4.31} end={9.48} />
    </div>
  );
}
```

### Browser script setup (for prototyping only)

```js
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script
    src="https://unpkg.com/react@16/umd/react.production.min.js"
    crossorigin
  ></script>
  <script
    src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
    crossorigin
  ></script>
  <script src="https://unpkg.com/react-video-looper/umd/react-video-looper.min.js"></script>
  <script type="text/babel">
    ReactDOM.render(
    <VideoLooper source="sample.mp4" start={4.31} end={9.48} />, document.getElementById('app'))
  </script>
</body>
```

## Options / Props

| Name             | Type   | Required | Default      | Description                                                             |
| ---------------- | ------ | -------- | ------------ | ----------------------------------------------------------------------- |
| `source`         | string | required | 'sample.mp4' | Name of the video source file                                           |
| `start`          | number | required | 4.31         | starting point of loop in seconds                                       |
| `end`            | number | required | 9.48         | ending point of loop in seconds                                         |
| `speed`          | number | optional | 1            | video playback rate                                                     |
| `loopCount`      | number | optional | null         | optional amount of loops to run before playing to end of video          |
| `autoPlay`       | bool   | optional | true         | automatically start video playback                                      |
| `muted`          | bool   | optional | true         | disable audio of video loop                                             |
| `playsInline`    | bool   | optional | true         | prevent automatic fullscreen mode in mobile browsers                    |
| `isDebugMode`    | bool   | optional | false        | debug mode titles the active video instance and current playback time   |
| `isSplitView`    | bool   | optional | false        | illustrative split-view of the two video instances playing side by side |
| `width`          | string | optional | '100%'       | css width of the component (default is full width)                      |
| `height`         | string | optional | '100vh'      | css height of the component (default is full height)                    |
| `objectFit`      | string | optional | 'cover'      | css object-fit size of the video (default is clipped to fit)            |
| `objectPosition` | string | optional | '40%'        | css object-position alignment of the video                              |

## Demo Editor

The demo includes a simple editor that allows you to change some of the options. The [react-use-form-data hook](https://github.com/lewhunt/react-use-form-data) is used to manage the demo editor's data state:

![Demo Editor Example](https://github.com/lewhunt/assets/raw/master/readme/react-use-form-data-example.gif)

## Example In Use

The component is currently used in the [React Fitness App](https://lewhunt.github.io/react-fitness-app/):

![React Fitness App Example](https://github.com/lewhunt/assets/raw/master/readme/react-fitness-app-example.gif)
