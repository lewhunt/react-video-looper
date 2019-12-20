import React, {Component} from 'react'
import {render} from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import VideoLooper from '../../src'
import sampleVideo from '../../src/sample.mp4'
import { Editor } from './editor.js'

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      start: 4.31,
      end: 9.48,
      isEditorActive: false,
      isDebugMode: true,
      isSplitView: false
    }
  }

  componentDidMount() {
    this.setState({
      startPlaceholder: this.state.start,
      endPlaceholder: this.state.end
    })
  }

  updateState = (key, evt) => { 
    switch (evt.target.type) {
      case 'text':
        this.setState({[key]: evt.target.value || evt.target.placeholder})
        break
      default:
        this.setState({[key]: !this.state[key]})
    }
  }

  render() {
    return (
      <div>
        <GlobalStyle></GlobalStyle>
        <Editor {...this.state} updateState={this.updateState}></Editor>
        <VideoLooper source={sampleVideo} start={Number(this.state.start)} end={Number(this.state.end)} isDebugMode={this.state.isDebugMode} isSplitView={this.state.isSplitView} />
      </div>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    margin: 0
  }
`
render(<Demo/>, document.querySelector('#demo'))