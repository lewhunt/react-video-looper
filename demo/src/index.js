//import React, {Component} from 'react'
import React from 'react';
import {render} from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import VideoLooper from '../../src'
import sampleVideo from '../../src/sample.mp4'
import { Editor } from './editor.js'
import useFormData from 'react-use-form-data'

export default function Demo() {

  const [formData, updateFormData, initialFormData, isInitialDataForPlaceholder] = useFormData({ 
    start: 4.31,
    end: 9.48,
    isEditorActive: false,
    isDebugMode: true,
    isSplitView: false
  }, true);
 
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Editor {...formData} updateFormData={updateFormData} initialFormData={isInitialDataForPlaceholder && initialFormData}></Editor>
      <VideoLooper source={sampleVideo} start={Number(formData.start)} end={Number(formData.end)} isDebugMode={formData.isDebugMode} isSplitView={formData.isSplitView} />
    </div>
  )
  
}

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    margin: 0
  }
`
render(<Demo/>, document.querySelector('#demo'))