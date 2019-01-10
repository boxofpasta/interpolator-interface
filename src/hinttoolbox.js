import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

const styles = {
  slider: {
    padding: '22px 10px',
    width: '100px'
  }
};

export default class HintToolbox extends React.Component {
  constructor(props) {
    super(props);
    
    // Set initial state.
    this.state = {
        opacity: 0.4
    };
  }

  handleOpacitySlider = (event, value) => {
    this.props.cbChangeOpacity(value / 100);
    this.setState({opacity: value / 100});
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
              <Typography id='opa_slider_label'>Opacity Slider</Typography>
              <Slider
                style={styles.slider}
                value={this.state.opacity * 100}
                aria-labelledby='opa_slider_label'
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
