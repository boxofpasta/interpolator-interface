import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  canvas: {
    height: '100%',
    width: '100%'
  }
};

import EasyGL from './easygl.js';

export default class HintCanvas extends React.Component {
  constructor(props, ref) {
    super(props);

    // Set initial state.
    this.state = {
        opacity: 0.4 // Hardcoded for now
    };
  }

  // On initial load.
  componentDidMount() {
    this.props.onRef(this);
    this.easyGL = new EasyGL(this.refs.canvas.getContext('2d'));
    this.redrawCanvas();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidUpdate() {
    this.easyGL.reset(this.refs.canvas.getContext('2d'));
    this.redrawCanvas();
  }

  publicChangeOpacity(value) {
    this.setState({opacity: value});
  }

  publicZoomIn() {
    this.refs.canvas.getContext('2d').scale(1.1, 1.1);
    this.redrawCanvas();
  }

  publicZoomOut() {
    this.refs.canvas.getContext('2d').scale(1/1.1, 1/1.1);
    this.redrawCanvas();
  }

  handleClick = (event) => {
      const canvas = this.refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      this.easyGL.reset(ctx);
      // For some reason the screen needs to be scaled to assume the canvas is 300x150
      var x = (event.clientX - rect.left) * 300 / rect.width;
      var y = (event.clientY - rect.top) * 150 / rect.height;
      [x, y] = this.easyGL.screen_to_world(x, y);
      console.log("x: " + x, "y: " + y);
      this.easyGL.drawcircle(x, y, 10);
  }

  redrawCanvas() {
    const canvas = this.refs.canvas;
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#000000';

      this.easyGL.drawline(10, 10, 100, 20);
      this.easyGL.drawcircle(20, 20, 5);
      this.easyGL.fillcircle(100, 100, 50);
    }
  }

  render() {
    return (
      <div id="hint-canvas">
        <canvas
            ref="canvas"
            onClick={this.handleClick}
            style={styles.canvas}
        />
      </div>
    );
  }
}
