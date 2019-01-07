import React from 'react';
import ReactDOM from 'react-dom';

import Slider from 'material-ui/Slider';

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

  render() {
    const img_0_url = '../0000001_0.png';
    const img_1_url = '../0000001_1.png';
    const img_0_style = {
        position: 'absolute',
        top: '0px',
        left: '0px'
    };
    var img_1_style = {
        position: 'absolute',
        top: '0px',
        left: '0px', 
        opacity: this.state.image_opacity
    };
    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <div>
                <img src={img_0_url} style={img_0_style} />
                <img src={img_1_url} style={img_1_style} />
              </div>
            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement>
              <ReflexContainer orientation="horizontal">
                <Slider
                    style={styles.slider}
                    value={this.state.opacity}
                    onChange={this.handleOpacitySlider}
                />
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement>
          <div><label>Not sure yet</label></div>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}
