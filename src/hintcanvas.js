import React from 'react';
import ReactDOM from 'react-dom';

export default class HintCanvas extends React.Component {
  constructor(props, ref) {
    super(props);

    // Set initial state.
    this.state = {
        worldLeft: 0,
        worldTop: 0,
        worldRight: 100,
        worldBottom: 100,
        opacity: 0.4 // Hardcoded for now
    };
  }

  // On initial load.
  componentDidMount() {
    this.props.onRef(this);
    this.redrawCanvas();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  publicChangeOpacity(value) {
    this.setState({opacity: value});
    this.redrawCanvas();
  }

  publicZoomIn() {
    this.setState({
        worldRight: this.state.worldRight * 1.1,
        worldBottom: this.state.worldBottom * 1.1
    });
    this.redrawCanvas();
  }

  publicZoomOut() {
    this.setState({
        worldRight: this.state.worldRight / 1.1,
        worldBottom: this.state.worldBottom / 1.1
    });
    this.redrawCanvas();
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

      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(40, 40);
      ctx.stroke();
      ctx.closePath();

      ctx.fillRect(25, 25, 100, 100);

      ctx.font = '20px Georgia';
      ctx.fillText('temp ' + this.state.worldRight, 10, 10);
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" />
      </div>
    );
  }
}
