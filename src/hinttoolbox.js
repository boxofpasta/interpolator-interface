import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
  },
  group: {
    float: 'left',
    flexDirection: 'row'
  },
};

export default class HintToolbox extends React.Component {
  constructor(props) {
    super(props);
    
    // Set initial state.
    this.state = {
        opacity: 0.4,
        mouse_mode: 'panning'
    };
  }

  handleOpacitySlider = (event, value) => {
    if (this.props.cbChangeOpacity) {
      this.props.cbChangeOpacity(value / 100);
    }
    this.setState({opacity: value / 100});
  }

  handleMouseModeChange = (event) => {
    if (this.props.cbChangeMouseMode) {
      this.props.cbChangeMouseMode(event.target.value);
    }
    this.setState({mouse_mode: event.target.value});
  }

  handleZoomIn = () => {
    if (this.props.cbZoomIn) {
      this.props.cbZoomIn();
    }
  }

  handleZoomOut = () => {
    if (this.props.cbZoomOut) {
      this.props.cbZoomOut();
    }
  }

  render() {
    return (
        <div id="hint-toolbox">
          <Grid container direction="row" spacing={8}>
            <Grid item>
              <Paper>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <Typography id='opacity_label'>Image Transition</Typography>
                    <Slider
                      style={styles.slider}
                      value={this.state.opacity * 100}
                      aria-labelledby='opa_slider_label'
                      onChange={this.handleOpacitySlider}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <Button onClick = {this.handleZoomIn}>
                      Zoom In
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick = {this.handleZoomOut}>
                      Zoom Out
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <RadioGroup
                  value={this.state.mouse_mode}
                  onChange={this.handleMouseModeChange}
                  style={styles.group}
                >
                  <FormControlLabel value="drag_hint" control={<Radio />} label="Drag" />
                  <FormControlLabel value="click_hint" control={<Radio />} label="Click" />
                  <FormControlLabel value="panning" control={<Radio />} label="Panning" />
                  <FormControlLabel value="eraser" control={<Radio />} label="Eraser" />
                </RadioGroup>
              </Paper>
            </Grid>
          </Grid>
        </div>
    );
  }
}
