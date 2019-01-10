import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

const styles = {
  slider: {
    padding: '22px 10px',
    width: '100px',
    overflow: 'visible'
  }
};

export default class HintToolbox extends React.Component {
  constructor(props) {
    super(props);
    
    // Set initial state.
    this.state = {
    };
  }

  handleOpacitySlider = (event, value) => {
    this.props.cbChangeOpacity(value);
  }

  handleZoomIn = () => {
    this.props.cbZoomIn();
  }

  handleZoomOut = () => {
    this.props.cbZoomOut();
  }

  render() {
    return (
        <div id="hint-toolbox">
          <ReflexContainer orientation="vertical">
            <div vertical layout>
              <div><label>Opacity Slider</label></div>
              <Slider
                style={styles.slider}
                value={ 0.4 /* hard coded for now */ }
                onChange={this.handleOpacitySlider}
              />
            </div>
            <div vertical layout>
              <Button onClick = {this.handleZoomIn}>
                Zoom In
              </Button>
              <Button onClick = {this.handleZoomOut}>
                Zoom Out
              </Button>
            </div>
          </ReflexContainer>
        </div>
    );
  }
}
