import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Editor = (props) => {
  
  return (
      <div>
        <EditorButton type='button' onClick={(evt) => props.updateState('isEditorActive', evt)}>{props.isEditorActive ? 'Close' : 'Editor'}</EditorButton>
        <EditorPanel isEditorActive={props.isEditorActive}>
          <label>Start of loop<input type="text" onChange={(evt) => props.updateState('start', evt)} placeholder={props.startPlaceholder}></input></label>
          <label>End of loop<input type="text" onChange={(evt) => props.updateState('end', evt)} placeholder={props.endPlaceholder}></input></label>
          <label>Debug<input type="checkbox" onClick={(evt) => props.updateState('isDebugMode', evt)} defaultChecked={props.isDebugMode}></input></label>
          <label>Split view<input type="checkbox" onClick={(evt) => props.updateState('isSplitView', evt)} defaultChecked={props.isSplitView} disabled={!props.isDebugMode}></input></label>
        </EditorPanel>
      </div>
  )
}

Editor.propTypes = {
  isEditorActive: PropTypes.bool,
  isDebugMode: PropTypes.bool,
  isSplitView: PropTypes.bool,
  startPlaceholder: PropTypes.number,
  endPlaceholder: PropTypes.number,
  updateState: PropTypes.func
}

const EditorButton = styled.button`
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

const EditorPanel = styled.div`
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