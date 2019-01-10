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
      this.easyGL.translate_screen(dx, dy);
      this.redrawCanvas();
    }
  }

  handleScroll = (event) => {
    if (event.deltaY < 0) {
        // Scrolling up
        var [x, y] = this.page_to_canvas_coord(event.clientX, event.clientY);
        this.easyGL.zoom_in_to_screen(x, y);
        this.redrawCanvas();
    }
    else if (event.deltaY > 0) {
        // Scrolling down
        var [x, y] = this.page_to_canvas_coord(event.clientX, event.clientY);
        this.easyGL.zoom_out_at_screen(x, y);
        this.redrawCanvas();
    }
  }

  redrawCanvas = () => {
    const img_0 = this.refs.img_0;
    const img_1 = this.refs.img_1;

    this.easyGL.drawimage(img_0, 0, 0);
    this.easyGL.drawimage(img_1, 0, 0, 0.4);
  }

  render() {
    const img_0_src = '../0000001_0.png';
    const img_1_src = '../0000001_1.png';
    return (
      <div id="hint-canvas">
        <canvas
            ref="canvas"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            onWheel={this.handleScroll}
            style={styles.canvas}
        />
        <img ref="img_0" src={img_0_src} onLoad={this.redrawCanvas} style={{display: 'none'}}/>
        <img ref="img_1" src={img_1_src} onLoad={this.redrawCanvas} style={{display: 'none'}}/>
      </div>
    );
  }
}
