import React from 'react';
import ReactDOM from 'react-dom';

import Slider from 'material-ui/Slider';
import Button from 'material-ui/FlatButton';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

const styles = {
  slider: {
    padding: '0px 10px'
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
        <ReflexContainer orientation="vertical">
          <Slider
            style = {styles.slider}
            value = { 0.4 /* hard coded for now */ }
            onChange = {this.handleOpacitySlider}
          />
          <ReflexContainer orientation="horizontal">
            <Button onClick = {this.handleZoomIn}>
              Zoom In
            </Button>
            <Button onClick = {this.handleZoomOut}>
              Zoom Off
            </Button>
          </ReflexContainer>
        </ReflexContainer>
    );
  }
}
