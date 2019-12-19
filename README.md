# React Video Looper
A video component that provides non-destructive inner looping of a video source file.

## Intro
This component takes a video source file with two specified values (start and end points) and then generates a looping video element.

It offers an alternative to the default HTML5 video loop attribute allowing you to use the original video source file and benefit from performant non-destructive looping.

Under the hood this component utilises two overlapping video elements that playback in turn, which in many cases provides a more seamless loop experience compared to the default loop attribute or media fragments. Running the demo in debug mode illustrates this technique by highlighting the two video instances playing side by side.

## Install
TODO

## Usage
TODO

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

TODO - width, height, objectFit

## Demo
The provided demo has a simple editor that allows you to change some of the above options, which then get passed into the component as props.

## License
MIT © [Lewis Hunt](https://github.com/lewhunt)