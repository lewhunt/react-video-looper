import React, {Component} from 'react'
import {render} from 'react-dom'
import VideoLooper from '../../src'
import sampleVideo from '../../src/sample.mp4';
import styled, { createGlobalStyle } from 'styled-components';

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      isEditorActive: true,
      loopStart: 4.31,
      loopEnd: 9.48,
      isDebugMode: true,
      isSplitView: false
    }
  }

  handleEditorClick = (evt) => {
    this.setState({isEditorActive: !this.state.isEditorActive});
  }

  handleInputChange = (key, evt) => {
    this.setState({
        [key]: evt.target.value || evt.target.placeholder
    })
  }

  handleInputSelect = (evt) => {
    evt.target.select();
  }

  handleCheckboxClick = (key, evt) => {
    this.setState({
      [key]: evt.target.checked
    });
  }

  render() {
    return (
      <div>
        <GlobalStyle></GlobalStyle>
        <EditorButton onClick={this.handleEditorClick}>{this.state.isEditorActive ? 'Close' : 'Editor'}</EditorButton>
        <EditorPanel isEditorActive={this.state.isEditorActive}>
          <label>Start of loop<input type="text" value={this.state.loopStart} onClick={this.handleInputSelect} onChange={(evt) => this.handleInputChange('loopStart', evt)} placeholder="4.31"></input></label>
          <label>End of loop<input type="text" value={this.state.loopEnd} onClick={this.handleInputSelect} onChange={(evt) => this.handleInputChange('loopEnd', evt)} placeholder="9.48"></input></label>
          <label>Debug<input type="checkbox" onClick={(evt) => this.handleCheckboxClick('isDebugMode', evt)} value={!this.state.isDebugMode} defaultChecked={this.state.isDebugMode}></input></label>
          <label>Split view<input type="checkbox" onClick={(evt) => this.handleCheckboxClick('isSplitView', evt)} value={!this.state.isSplitView} defaultChecked={this.state.isSplitView} disabled={!this.state.isDebugMode}></input></label>
        </EditorPanel>
        <VideoLooper source={sampleVideo} start={Number(this.state.loopStart)} end={Number(this.state.loopEnd)} isDebugMode={this.state.isDebugMode} isSplitView={this.state.isSplitView} />
      </div>
    )
  }
}

export const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    margin: 0
  }
`
export const EditorButton = styled.button`
  z-index:1;
  position: absolute;
  top:2em;
  right:2em;
  min-width: 52px;
  color: grey;
  background: rgba(255,255,255,0.1);
  border:1px solid grey;
  font-size:0.8em;
  cursor: pointer;
  user-select: none;
  &:focus {
    outline: 0 !important;
  }
`;
export const EditorPanel = styled.div`
  position: absolute;
  display: ${props => (props.isEditorActive ? 'block' : 'none')};
  top:4em;
  right:2em;
  padding: 1em;
  z-index:1;
  background: rgba(255,255,255,0.1);
  border:1px solid grey;
  color: grey;
  font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
  font-size:0.8em;
  label {
    user-select: none;
    display: block;
  }
  input {
    display: block;
    margin:0.5em 0 1em 0;
    &[type="text"] {
      width:70px;
    }
    &[type="checkbox"] {
      display: inline;
      margin-left: 0.7em;
    }
  }
`;

render(<Demo/>, document.querySelector('#demo'))