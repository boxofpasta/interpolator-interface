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
  },
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
    this.canvas.publicZoomIn();
  }

  canvasZoomOut = () => {
    this.canvas.publicZoomOut();
  }

  canvasChangeOpacity = (value) => {
    this.canvas.publicChangeOpacity(value);
  }

  render() {
    const img_0_url = '../0000001_0.png';
    const img_1_url = '../0000001_1.png';
    return (
      <div id="hint-window">
        {/* This is the dumbest way of doing refs I have ever seen,
          * but it is the only one that allows me to call child methods
          * for some reason. All other methods give me a TypeError:
          * 'blah' is not a function.
          */}
        <HintCanvas
            onRef={(ref) => {this.canvas = ref}}
            id="hint-canvas"
        />
        <HintToolbox
            cbZoomIn={this.canvasZoomIn}
            cbZoomOut={this.canvasZoomOut}
            cbChangeOpacity={this.canvasChangeOpacity}
        />
      </div>
    );
  }
}
