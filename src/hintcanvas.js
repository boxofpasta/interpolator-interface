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
        opacity: 0.4, // Hardcoded for now
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

  page_to_canvas_coord = (x, y) => {
    const rect = this.refs.canvas.getBoundingClientRect();
    // For some reason, canvas constantly assumes it is 300x150.
    // Will need to fix this later to prevent the image from distorting.
    return [(x - rect.left) * 300 / rect.width,
            (y - rect.top) * 150 / rect.height];
  }

  handleMouseDown = (event) => {
    const [x, y] = this.page_to_canvas_coord(event.clientX, event.clientY);
    this.panning = {
        prevx: x,
        prevy: y
    };
  }

  handleMouseUp = (event) => {
    delete this.panning;
  }

  handleMouseMove = (event) => {
    if (this.panning) {
      const [x, y] = this.page_to_canvas_coord(event.clientX, event.clientY);
      const dx = x - this.panning.prevx;
      const dy = y - this.panning.prevy;
      this.panning = {
          prevx: x,
          prevy: y
      };
      this.easyGL.translate(dx, dy);
      this.redrawCanvas();
    }
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
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            style={styles.canvas}
        />
      </div>
    );
  }
}
