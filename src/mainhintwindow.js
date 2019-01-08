import React from 'react';
import ReactDOM from 'react-dom';

import Slider from 'material-ui/Slider';
import Button from 'material-ui/FlatButton';

import HintCanvas from './hintcanvas.js';
import HintToolbox from './hinttoolbox.js';

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

export default class MainHintWindow extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state.
    this.state = {
      flowMode: 'drag',
      image_opacity: '0.4'
    };
  }

  handleOpacitySlider = (event, value) => {
    this.setState({image_opacity: value});
  }

  canvasZoomIn = () => {
    this.refs.canvas.publicZoomIn();
  }

  canvasZoomOut = () => {
    this.refs.canvas.publicZoomOut();
  }

  canvasChangeOpacity = (value) => {
    this.refs.canvas.publicChangeOpacity(value);
  }

  render() {
    const img_0_url = '../0000001_0.png';
    const img_1_url = '../0000001_1.png';
    return (
      <ReflexContainer orientation="horizontal">
        <HintCanvas ref="canvas" />
        <ReflexSplitter />
        <HintToolbox
            cbZoomIn={this.canvasZoomIn}
            cbZoomOut={this.canvasZoomOut}
            cbChangeOpacity={this.canvasChangeOpacity}
        />
      </ReflexContainer>
    );
  }
}
