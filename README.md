# React Video Looper
A video component that provides non-destructive inner looping of a video source file.

## Intro
This component takes a video source file with two specified values (start and end points) and then generates a looping video element.

It offers an alternative to the default HTML5 video loop attribute allowing you to use the original video source file and benefit from performant non-destructive looping.

Under the hood this component utilises two overlapping video elements that playback in turn. In many cases this provides a more seamless loop compared to the default loop attribute or media fragment parameters. Running the demo editor in debug mode further illustrates this technique of non-destructive inner looping.

## Install
### npm package (recommended)
```bash
npm install react-video-looper
```

### CDN script (for prototyping only)
```js
<script type="text/javascript" src="react-video-looper.min.js"></script>
```

## Usage
Remember to update references to your sample video and the start/end value props (values in seconds)
### Node.js development setup (recommended)
```js
import React, { Component } from 'react'
import VideoLooper from 'react-video-looper'
import sampleVideo from '../assets/sample.mp4'

export default class App extends Component {
  render () {
    return (
      <div>
        <VideoLooper source='{sampleVideo}' start={4.31} end={9.48}/>
      </div>
    )
  }
}
```

### Browser script setup (for prototyping only)
```js
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
    <script src="react-video-looper.min.js"></script>
    <script type="text/babel">
      ReactDOM.render(<VideoLooper source='sample.mp4' start={4.31} end={9.48}/>, document.getElementById('app'))
    </script>
</body>
```

## Options / Props
Name | Type | Required | Default | Description 
--- | --- | --- | --- | ---
`source` | string | required | 'sample.mp4' | Name of the video source file
`start` | number | required | 4.31 | starting point of loop in seconds
`end` | number | required | 9.48 | ending point of loop in seconds
`speed` | number | optional | 1 | video playback rate
`loopCount` | number | optional | null | optional amount of loops to run before playing to end of video
`autoplay` | bool | optional | true | automatically start video playback
`muted` | bool | optional | true | disable audio of video loop
`isDebugMode` | bool | optional | false | debug mode titles the active video instance and current playback time
`isSplitView` | bool | optional | false | illustrative split-view of the two video instances playing side by side
`width` | string | optional | '100%' | css width of the component (default is full width)
`height` | string | optional | '100vh' | css height of the component (default is full height)
`objectFit` | string | optional | 'cover' | css object-fit size of the video (default is clipped to fit)
`objectPosition` | string | optional | '40%' | css object-position alignment of the video

## Demo Editor
The provided demo contains a simple editor component that allows you to change some of the options which then get passed into the component as props.

## License
MIT © [Lewis Hunt](https://github.com/lewhunt)