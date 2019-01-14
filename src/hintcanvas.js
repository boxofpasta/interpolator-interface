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
        mode: 'panning',
        opacity: 0.4, // Hardcoded for now
        hints: [
            {x: 10, y: 10, dx: 10, dy: 10},
            {x: 10, y: 40, dx: 10, dy: -10},
            {x: 40, y: 10, dx: -10, dy: 10},
            {x: 40, y: 40, dx: -10, dy: -10},
        ],
        drawing: undefined,
    };
  }

  // On initial load.
  componentDidMount() {
    this.props.onRef(this);
    this.easyGL = new EasyGL(this.refs.canvas.getContext('2d'));
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    this.easyGL.reset(this.refs.canvas.getContext('2d'));
    this.redrawCanvas();
  }

  handleResize = () => {
    this.easyGL.resize_canvas(this.refs.canvas);
    this.redrawCanvas();
  }

  // On image load.
  onLoadImg0 = () => {
    this.img_0 = this.refs.img_0;
    this.redrawCanvas();
  }

  onLoadImg1 = () => {
    this.img_1 = this.refs.img_1;
    this.redrawCanvas();
  }

  // Handle creation of new hints.
  begin_or_end_new_hint(x, y) {
    if (this.state.drawing != null) {
      this.end_new_hint(x, y);
    } else {
      this.begin_new_hint(x, y);
    }
  }

  begin_new_hint(x, y) {
    [x, y] = this.easyGL.screen_to_world(x, y);
    this.setState({drawing: {x: x, y: y}});
  }

  end_new_hint(x, y) {
    [x, y] = this.easyGL.screen_to_world(x, y);
    this.setState({
      hints: this.state.hints.concat([{
        x: this.state.drawing.x,
        y: this.state.drawing.y,
        dx: x - this.state.drawing.x,
        dy: y - this.state.drawing.y
      }]),
      drawing: undefined
    });
  }

  // Public callbacks.
  publicChangeOpacity(value) {
    this.setState({opacity: value});
  }

  publicChangeMouseMode(value) {
    this.setState({mode: value});
  }

  publicZoomIn() {
    this.refs.canvas.getContext('2d').scale(1.1, 1.1);
    this.redrawCanvas();
  }

  publicZoomOut() {
    this.refs.canvas.getContext('2d').scale(1/1.1, 1/1.1);
    this.redrawCanvas();
  }

  // Event utilities.
  page_to_canvas_coord = (x, y) => {
    const rect = this.refs.canvas.getBoundingClientRect();
    // For some reason, canvas constantly assumes it is 300x150.
    // Will need to fix this later to prevent the image from distorting.
    return [(x - rect.left),// * 300 / rect.width,
            (y - rect.top)];// * 150 / rect.height];
  }

  // Event handlers.
  handleMouseDown = (event) => {
    var [x, y] = this.page_to_canvas_coord(event.clientX, event.clientY);
    switch(this.state.mode) {
      case 'panning':
        this.panning = {
          prevx: x,
          prevy: y
        }
        break;
      case 'drag_hint':
        this.begin_new_hint(x, y);
        break;
      case 'click_hint':
      default:
        break;
    }
  }

  handleMouseUp = (event) => {
    const [x, y] = this.page_to_canvas_coord(event.clientX, event.clientY);
    if (this.panning) {
      delete this.panning;
    }
    if (this.state.mode == 'drag_hint' && this.state.drawing != null) {
      this.end_new_hint(x, y);
    } else if (this.state.mode == 'click_hint') {
      this.begin_or_end_new_hint(x, y);
    }
  }

  handleMouseMove = (event) => {
    if (this.state.drawing) {
      const [x0, y0] = [this.state.drawing.x, this.state.drawing.y];
      var [x1, y1] = this.page_to_canvas_coord(event.clientX, event.clientY);
      [x1, y1] = this.easyGL.screen_to_world(x1, y1);
      this.redrawCanvas();
      this.easyGL.drawhint({x: x0, y: y0, dx: x1-x0, dy: y1-y0});
    }
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

  // Redraw canvas.
  redrawCanvas = () => {
    if (!this.easyGL) {
      return;
    }

    this.easyGL.clearscreen();

    if (!this.img_0 || !this.img_1) {
      this.easyGL.fillcircle(30, 30, 30);
      return;
    }

    // Draw image overlays.
    this.easyGL.drawimage(this.img_0, 0, 0);
    this.easyGL.drawimage(this.img_1, 0, 0, this.state.opacity);

    // Draw established hints.
    var hint_len = this.state.hints.length;
    for (var i = 0; i < hint_len; ++i) {
      this.easyGL.drawhint(this.state.hints[i]);
    }
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
            onResize={this.handleResize}
            style={styles.canvas}
        />
        <img ref='img_0' src={img_0_src} onLoad={this.onLoadImg0} style={{display: 'none'}}/>
        <img ref='img_1' src={img_1_src} onLoad={this.onLoadImg1} style={{display: 'none'}}/>
      </div>
    );
  }
}
